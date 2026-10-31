import test from "node:test";
import assert from "node:assert/strict";

import {
  getStore,
  getCustomers,
  getCustomerById,
  createProduct,
  getProducts,
  getProductById,
  createPlan,
  getPlans,
  getPlanById,
  createTaxRule,
  getTaxRules,
  createDiscount,
  getDiscounts,
  evaluateDiscountRule,
  createQuotation,
  getQuotations,
  getQuotationById,
  convertQuotationToSubscription,
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscriptionStatus,
  runRecurringBilling,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  recordPayment,
  getPayments,
  getDashboardKPIs,
  getStaffDashboardMetrics,
  getCustomerForUser,
  getCustomerOverviewMetrics,
  getCustomerSubscriptions,
  getCustomerSubscriptionById,
  getCustomerInvoices,
  getCustomerInvoiceById,
  customerPauseSubscription,
  customerResumeSubscription,
  customerRenewSubscription,
} from "../src/lib/data/store.ts";

test("--- SCENARIO 1: Customer Registration & Credential Validation ---", async (t) => {
  await t.test("Password strength rule verification", () => {
    const pwRules = [
      { pw: "short1!", valid: false, reason: "<= 8 chars" },
      { pw: "alllowercase!123", valid: false, reason: "missing uppercase" },
      { pw: "ALLUPPERCASE!123", valid: false, reason: "missing lowercase" },
      { pw: "NoSpecialCharacter123", valid: false, reason: "missing special char" },
      { pw: "ValidPass2026!#", valid: true, reason: "meets all requirements" },
    ];

    for (const rule of pwRules) {
      const isLongEnough = rule.pw.length > 8;
      const hasUpper = /[A-Z]/.test(rule.pw);
      const hasLower = /[a-z]/.test(rule.pw);
      const hasSpecial = /[^A-Za-z0-9]/.test(rule.pw);
      const isValid = isLongEnough && hasUpper && hasLower && hasSpecial;

      assert.equal(
        isValid,
        rule.valid,
        `Password '${rule.pw}' validity should be ${rule.valid} (${rule.reason})`
      );
    }
  });

  await t.test("Customer profile resolution and role destinations", () => {
    const customer = getCustomerForUser("finance@apexcloud.io");
    assert.ok(customer, "Customer profile should resolve from store");
    assert.equal(customer.role, "customer");
    assert.equal(customer.email, "finance@apexcloud.io");
  });
});

test("--- SCENARIO 2: Admin Configures Business Catalog & Rules ---", async (t) => {
  await t.test("Admin creates product with brand variants and price adjustments", () => {
    const newProduct = createProduct({
      name: "Brightloop Data Pipeline Engine",
      type: "software",
      sales_price: 1500.0,
      cost_price: 350.0,
      notes: "Internal note: high margin proprietary analytical engine.",
      variants: [
        {
          name: "Odoo Enterprise Connector",
          sku: "BL-ENG-ODOO",
          price_adjustment: 560.0,
          cost_adjustment: 100.0,
        },
        {
          name: "Standard Cloud Connector",
          sku: "BL-ENG-STD",
          price_adjustment: 0.0,
          cost_adjustment: 0.0,
        },
      ],
    });

    assert.ok(newProduct.id, "Product should have generated ID");
    assert.equal(newProduct.name, "Brightloop Data Pipeline Engine");
    assert.equal(newProduct.sales_price, 1500.0);
    assert.equal(newProduct.cost_price, 350.0);
    assert.equal(newProduct.variants.length, 2);

    const variantOdoo = newProduct.variants.find((v) => v.name.includes("Odoo"));
    assert.ok(variantOdoo);
    assert.equal(variantOdoo.price_adjustment, 560.0);
  });

  await t.test("Admin creates subscription plan with lifecycle policies", () => {
    const newPlan = createPlan({
      name: "Enterprise Data Mastery Annual",
      price: 2400.0,
      billing_frequency: "yearly",
      min_quantity: 1,
      auto_close: false,
      early_close_eligible: true,
      pause_eligible: true,
      renewal_eligible: true,
      is_active: true,
    });

    assert.ok(newPlan.id, "Plan should have generated ID");
    assert.equal(newPlan.billing_frequency, "yearly");
    assert.equal(newPlan.pause_eligible, true);
    assert.equal(newPlan.auto_close, false);
  });

  await t.test("Admin configures tax rules and discounts", () => {
    const tax = createTaxRule({
      name: "EU Digital Services VAT",
      rate: 20.0,
      description: "Standard 20% VAT",
      is_active: true,
      is_default: false,
    });

    assert.ok(tax.id);
    assert.equal(tax.rate, 20.0);

    const discount = createDiscount({
      code: "INTEGRATION20",
      description: "20% discount for orders exceeding $1,000 subtotal",
      discount_type: "percentage",
      discount_value: 20.0,
      min_purchase_amount: 1000.0,
      min_quantity: 1,
      applies_to: "all_subscriptions",
      is_active: true,
    });

    assert.ok(discount.id);
    assert.equal(discount.discount_value, 20.0);
  });
});

test("--- SCENARIO 3 & 4: Staff Prepares Quotation & Converts to Subscription ---", async (t) => {
  let createdQuoteId = "";
  let customerId = "";

  await t.test("Staff creates quotation with variant adjustment, tax, and discount", () => {
    const customers = getCustomers();
    assert.ok(customers.length > 0, "Customers must exist");
    customerId = customers[0].id;

    const products = getProducts();
    const product = products.find((p) => p.variants && p.variants.length > 0) || products[0];
    const variant = product.variants?.[0];

    const plans = getPlans();
    const plan = plans[0];

    const quote = createQuotation({
      customer_id: customerId,
      plan_id: plan.id,
      validity_days: 30,
      notes: "Commercial quote prepared for client.",
      lines: [
        {
          product_id: product.id,
          variant_id: variant?.id,
          quantity: 2,
          tax_rate: 10.0,
        },
      ],
    });

    assert.ok(quote.id);
    assert.ok(quote.quote_number.startsWith("QT-2026-"));
    assert.equal(quote.status, "draft");
    assert.ok(quote.subtotal > 0);
    assert.ok(quote.total_amount > 0);
    assert.equal(quote.lines.length, 1);

    // Verify line unit price + variant adjustment
    const expectedBaseLine = (quote.lines[0].unit_price + quote.lines[0].variant_adjustment) * quote.lines[0].quantity;
    assert.equal(quote.subtotal, expectedBaseLine);

    createdQuoteId = quote.id;
  });

  await t.test("Quotation converts to confirmed subscription", () => {
    const subscription = convertQuotationToSubscription(createdQuoteId);
    assert.ok(subscription, "Subscription should be successfully created");
    assert.ok(subscription.subscription_number.startsWith("SUB-2026-"));
    assert.equal(subscription.status, "confirmed");
    assert.equal(subscription.quotation_id, createdQuoteId);
    assert.equal(subscription.customer_id, customerId);

    // Verify quotation status transitioned to converted
    const quote = getQuotationById(createdQuoteId);
    assert.equal(quote.status, "converted");
  });

  await t.test("Quotation conversion idempotency: repeated conversion returns existing subscription without duplication", () => {
    const initialSubCount = getSubscriptions().length;
    const repeatSubscription = convertQuotationToSubscription(createdQuoteId);

    assert.ok(repeatSubscription, "Should return existing subscription");
    assert.equal(getSubscriptions().length, initialSubCount, "Subscription count must not increase");
  });

  await t.test("Quotation expiration: cannot convert expired quotation", () => {
    const expiredQuote = createQuotation({
      customer_id: customerId,
      plan_id: getPlans()[0].id,
      validity_days: -5, // already expired
      lines: [
        {
          product_id: getProducts()[0].id,
          quantity: 1,
          tax_rate: 10.0,
        },
      ],
    });

    const result = convertQuotationToSubscription(expiredQuote.id);
    assert.equal(result, null, "Expired quotation conversion must return null");
    const reloaded = getQuotationById(expiredQuote.id);
    assert.equal(reloaded.status, "expired");
  });

  await t.test("Subscription lifecycle transitions: confirmed -> active -> paused -> active", () => {
    const subs = getSubscriptions();
    const sub = subs[0];

    // Confirm/Activate
    const actResult = updateSubscriptionStatus(sub.id, "active");
    assert.equal(actResult.success, true);
    assert.equal(actResult.subscription.status, "active");

    // Pause (if eligible)
    if (sub.pause_eligible) {
      const pauseResult = updateSubscriptionStatus(sub.id, "paused");
      assert.equal(pauseResult.success, true);
      assert.equal(pauseResult.subscription.status, "paused");

      // Resume
      const resumeResult = updateSubscriptionStatus(sub.id, "active");
      assert.equal(resumeResult.success, true);
      assert.equal(resumeResult.subscription.status, "active");
    }
  });
});

test("--- SCENARIO 5: Recurring Billing Engine & Critical Duplicate Tests ---", async (t) => {
  await t.test("Scheduled billing generates invoices for active subscriptions", () => {
    // Run billing with forceAll to ensure our active subscriptions generate invoices
    const initialInvoicesCount = getInvoices().length;
    const runResult = runRecurringBilling({ forceAll: true });

    assert.ok(runResult.processedCount > 0, "Should process eligible active subscriptions");
    assert.ok(runResult.invoicesCreated > 0, "Should create invoices for new billing periods");

    const newInvoicesCount = getInvoices().length;
    assert.equal(newInvoicesCount, initialInvoicesCount + runResult.invoicesCreated);

    const latestInvoice = runResult.createdInvoices[0];
    assert.ok(latestInvoice.invoice_number.startsWith("INV-2026-"));
    assert.equal(latestInvoice.status, "confirmed");
    assert.ok(latestInvoice.total_amount > 0);
    assert.equal(latestInvoice.amount_paid, 0);
    assert.equal(latestInvoice.amount_due, latestInvoice.total_amount);
  });

  await t.test("Critical Idempotency Test: Running billing immediately again creates 0 duplicate invoices", () => {
    const invoicesBeforeRepeat = getInvoices().length;
    const repeatRun = runRecurringBilling({ forceAll: false });

    // Since billing dates were pushed into future or period already billed, no new invoices should be created
    assert.equal(repeatRun.invoicesCreated, 0, "No duplicate invoices should be created");
    assert.equal(getInvoices().length, invoicesBeforeRepeat, "Total invoice count must remain unchanged");
  });

  await t.test("Auto-close expired subscriptions on billing run", () => {
    const store = getStore();
    const expiredSub = createSubscription({
      customer_id: store.customers[0].id,
      plan_id: store.plans[0].id,
      billing_frequency: "monthly",
      lines: [{ product_id: store.products[0].id, quantity: 1 }],
    });

    expiredSub.status = "active";
    expiredSub.auto_close = true;
    expiredSub.expiry_date = "2025-01-01"; // past date
    expiredSub.next_billing_date = "2025-01-01";

    const billingRun = runRecurringBilling({ currentDate: "2026-10-31" });
    assert.ok(billingRun.closedExpiredCount >= 1, "Should auto-close expired subscription");

    const reloaded = getSubscriptionById(expiredSub.id);
    assert.equal(reloaded.status, "closed");
  });
});

test("--- SCENARIO 6: Invoice Operations & Lifecycle State Machine ---", async (t) => {
  await t.test("Invoice status transitions: draft -> confirmed -> cancelled", () => {
    const store = getStore();
    const testInv = {
      id: `test-inv-${Date.now()}`,
      invoice_number: `INV-TEST-${Date.now()}`,
      customer_id: store.customers[0].id,
      issue_date: "2026-10-31",
      due_date: "2026-11-15",
      status: "draft",
      subtotal: 1000.0,
      tax_amount: 100.0,
      discount_amount: 0,
      total_amount: 1100.0,
      amount_paid: 0,
      amount_due: 1100.0,
      lines: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.invoices.push(testInv);

    // Confirm draft invoice
    const confRes = updateInvoiceStatus(testInv.id, "confirmed");
    assert.equal(confRes.success, true);
    assert.equal(testInv.status, "confirmed");

    // Cancel unpaid confirmed invoice
    const cancelRes = updateInvoiceStatus(testInv.id, "cancelled");
    assert.equal(cancelRes.success, true);
    assert.equal(testInv.status, "cancelled");

    // Cancelled invoice cannot be altered
    const reConfirm = updateInvoiceStatus(testInv.id, "confirmed");
    assert.equal(reConfirm.success, false);
  });

  await t.test("Direct transition to 'paid' via updateInvoiceStatus is rejected (requires recorded payment)", () => {
    const store = getStore();
    const inv = store.invoices.find((i) => i.status === "confirmed" && i.amount_due > 0);
    assert.ok(inv, "A confirmed invoice must exist");

    const directPaidAttempt = updateInvoiceStatus(inv.id, "paid");
    assert.equal(directPaidAttempt.success, false);
    assert.ok(directPaidAttempt.error.includes("recorded payment"));
  });
});

test("--- SCENARIO 7: Payment Recording & Balance Reconciliation ---", async (t) => {
  let targetInvoice;

  await t.test("Record partial payment against confirmed invoice", () => {
    const store = getStore();
    targetInvoice = store.invoices.find((i) => i.status === "confirmed" && i.amount_due >= 200);
    assert.ok(targetInvoice, "Target invoice with amount due >= 200 required");

    const originalDue = targetInvoice.amount_due;
    const partialAmount = 100.0;

    const payResult = recordPayment({
      invoice_id: targetInvoice.id,
      amount: partialAmount,
      payment_method: "bank_transfer",
      notes: "First installment via wire transfer.",
    });

    assert.equal(payResult.success, true);
    assert.ok(payResult.payment.payment_reference.startsWith("PAY-2026-"));
    assert.equal(payResult.payment.amount, partialAmount);

    assert.equal(targetInvoice.amount_paid >= partialAmount, true);
    assert.equal(Math.round((originalDue - targetInvoice.amount_due) * 100) / 100, partialAmount);
  });

  await t.test("Reject payment exceeding remaining invoice balance", () => {
    const excessiveAmount = targetInvoice.amount_due + 5000.0;
    const excessResult = recordPayment({
      invoice_id: targetInvoice.id,
      amount: excessiveAmount,
      payment_method: "credit_card",
    });

    assert.equal(excessResult.success, false);
    assert.ok(excessResult.error.includes("exceeds remaining"));
  });

  await t.test("Settle remaining balance and verify status transitions to 'paid'", () => {
    const remainingBalance = targetInvoice.amount_due;

    const settleResult = recordPayment({
      invoice_id: targetInvoice.id,
      amount: remainingBalance,
      payment_method: "bank_transfer",
      notes: "Full settlement.",
    });

    assert.equal(settleResult.success, true);
    assert.equal(targetInvoice.amount_due, 0);
    assert.equal(targetInvoice.status, "paid");
  });

  await t.test("Reject payment against cancelled invoice", () => {
    const store = getStore();
    const cancelledInv = store.invoices.find((i) => i.status === "cancelled");
    assert.ok(cancelledInv);

    const result = recordPayment({
      invoice_id: cancelledInv.id,
      amount: 50.0,
      payment_method: "credit_card",
    });

    assert.equal(result.success, false);
    assert.ok(result.error.includes("cancelled"));
  });
});

test("--- SCENARIO 8: Financial Reporting & Audit Reconciliation ---", async (t) => {
  await t.test("Financial reporting KPIs match underlying transactional records", () => {
    const store = getStore();
    const kpis = getDashboardKPIs();

    // 1. Revenue received must strictly match total recorded payments
    const calculatedRevenue = store.payments.reduce((sum, p) => sum + Number(p.amount), 0);
    assert.equal(
      Math.round(kpis.revenueReceivedTotal * 100) / 100,
      Math.round(calculatedRevenue * 100) / 100,
      "Revenue received KPI must strictly equal sum of payment records"
    );

    // 2. Outstanding balance must match unpaid non-cancelled invoices
    const calculatedOutstanding = store.invoices
      .filter((i) => i.status !== "paid" && i.status !== "cancelled")
      .reduce((sum, i) => sum + Number(i.amount_due), 0);
    assert.equal(
      Math.round(kpis.outstandingAmountTotal * 100) / 100,
      Math.round(calculatedOutstanding * 100) / 100,
      "Outstanding amount KPI must match sum of invoice balances"
    );

    // 3. Active subscriptions count must match confirmed + active
    const activeSubCount = store.subscriptions.filter(
      (s) => s.status === "active" || s.status === "confirmed"
    ).length;
    assert.equal(kpis.activeSubscriptionsCount, activeSubCount);
  });
});

test("--- CUSTOMER PORTAL: Security & Strict Data Isolation ---", async (t) => {
  await t.test("Customer A cannot access Customer B's subscription (returns null -> 404)", () => {
    const store = getStore();
    assert.ok(store.customers.length >= 2, "At least 2 customers required for isolation test");

    const customerA = store.customers[0];
    const customerB = store.customers[1];

    // Create a subscription owned by Customer B
    const subB = createSubscription({
      customer_id: customerB.id,
      plan_id: store.plans[0].id,
      billing_frequency: "monthly",
      lines: [{ product_id: store.products[0].id, quantity: 1 }],
    });

    // Customer A attempts to query Customer B's subscription
    const queryResult = getCustomerSubscriptionById(customerA.id, subB.id);
    assert.equal(queryResult, null, "Cross-customer subscription query must return null");

    // Customer B queries their own subscription
    const legitimateResult = getCustomerSubscriptionById(customerB.id, subB.id);
    assert.ok(legitimateResult, "Owner must be able to retrieve own subscription");
    assert.equal(legitimateResult.id, subB.id);
  });

  await t.test("Customer A cannot access Customer B's invoice (returns null -> 404)", () => {
    const store = getStore();
    const customerA = store.customers[0];
    const customerB = store.customers[1];

    const invB = store.invoices.find((i) => i.customer_id === customerB.id) || {
      id: `inv-b-${Date.now()}`,
      invoice_number: `INV-B-${Date.now()}`,
      customer_id: customerB.id,
      issue_date: "2026-10-31",
      due_date: "2026-11-15",
      status: "confirmed",
      subtotal: 500,
      tax_amount: 50,
      discount_amount: 0,
      total_amount: 550,
      amount_paid: 0,
      amount_due: 550,
      lines: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    if (!store.invoices.some((i) => i.id === invB.id)) {
      store.invoices.push(invB);
    }

    const queryResult = getCustomerInvoiceById(customerA.id, invB.id);
    assert.equal(queryResult, null, "Cross-customer invoice query must return null");

    const legitimateResult = getCustomerInvoiceById(customerB.id, invB.id);
    assert.ok(legitimateResult, "Customer B can access their own invoice");
  });

  await t.test("Customer self-service lifecycle operations enforce plan policy", () => {
    const store = getStore();
    const customer = store.customers[0];
    const sub = store.subscriptions.find((s) => s.customer_id === customer.id && s.status === "active");

    if (sub) {
      if (sub.pause_eligible) {
        const pauseRes = customerPauseSubscription(customer.id, sub.id);
        assert.equal(pauseRes.success, true);
        assert.equal(sub.status, "paused");

        const resumeRes = customerResumeSubscription(customer.id, sub.id);
        assert.equal(resumeRes.success, true);
        assert.equal(sub.status, "active");
      }

      if (sub.renewal_eligible) {
        const initialDate = sub.next_billing_date;
        const renewRes = customerRenewSubscription(customer.id, sub.id);
        assert.equal(renewRes.success, true);
        assert.notEqual(sub.next_billing_date, initialDate, "Next billing date should advance upon renewal");
      }
    }
  });
});
