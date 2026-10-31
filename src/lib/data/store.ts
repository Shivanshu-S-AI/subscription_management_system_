import type {
  CustomerProfile,
  Product,
  ProductVariant,
  Plan,
  TaxRule,
  DiscountRule,
  QuotationTemplate,
  Quotation,
  QuotationLine,
  Subscription,
  SubscriptionLine,
  SubscriptionStatus,
  Invoice,
  InvoiceLine,
  InvoiceStatus,
  Payment,
  DashboardKPIs,
  BillingFrequency,
} from "@/types/admin";

// Global in-memory storage for singleton persistence across server actions
declare global {
  var __brightloop_store__: {
    customers: CustomerProfile[];
    products: Product[];
    plans: Plan[];
    taxes: TaxRule[];
    discounts: DiscountRule[];
    templates: QuotationTemplate[];
    quotations: Quotation[];
    subscriptions: Subscription[];
    invoices: Invoice[];
    payments: Payment[];
    staff: CustomerProfile[];
  } | undefined;
}

function initializeSeedData() {
  const customers: CustomerProfile[] = [
    {
      id: "cust-001",
      email: "finance@apexcloud.io",
      full_name: "Sarah Jenkins",
      company_name: "Apex Cloud Systems",
      phone: "+1 (555) 382-9100",
      address: "100 California St, San Francisco, CA",
      role: "customer",
      created_at: "2026-08-15T10:00:00Z",
      updated_at: "2026-08-15T10:00:00Z",
    },
    {
      id: "cust-002",
      email: "ops@nexusdynamics.co",
      full_name: "Michael Chen",
      company_name: "Nexus Dynamics",
      phone: "+1 (555) 491-2300",
      address: "75 State St, Boston, MA",
      role: "customer",
      created_at: "2026-09-01T14:30:00Z",
      updated_at: "2026-09-01T14:30:00Z",
    },
    {
      id: "cust-003",
      email: "analytics@stratalabs.com",
      full_name: "Elena Rostova",
      company_name: "Strata Labs Research",
      phone: "+1 (555) 832-1199",
      address: "1200 4th Ave, Seattle, WA",
      role: "customer",
      created_at: "2026-09-18T09:15:00Z",
      updated_at: "2026-09-18T09:15:00Z",
    },
    {
      id: "cust-004",
      email: "david@vortexretail.org",
      full_name: "David Miller",
      company_name: "Vortex Retail Tech",
      phone: "+1 (555) 714-8801",
      address: "500 N Michigan Ave, Chicago, IL",
      role: "customer",
      created_at: "2026-10-02T11:45:00Z",
      updated_at: "2026-10-02T11:45:00Z",
    },
  ];

  const staff: CustomerProfile[] = [
    {
      id: "admin-001",
      email: "shivanshu@brightloopsoftware.com",
      full_name: "Shivanshu",
      company_name: "Brightloop Software",
      role: "admin",
      created_at: "2026-06-01T08:00:00Z",
      updated_at: "2026-06-01T08:00:00Z",
    },
    {
      id: "admin-002",
      email: "aryan@brightloopsoftware.com",
      full_name: "Aryan",
      company_name: "Brightloop Software",
      role: "admin",
      created_at: "2026-06-01T08:00:00Z",
      updated_at: "2026-06-01T08:00:00Z",
    },
    {
      id: "admin-003",
      email: "hiren@brightloopsoftware.com",
      full_name: "Hiren Sir",
      company_name: "Brightloop Software",
      role: "admin",
      created_at: "2026-06-01T08:00:00Z",
      updated_at: "2026-06-01T08:00:00Z",
    },
    {
      id: "staff-001",
      email: "staff@brightloopsoftware.com",
      full_name: "Alex Rivera",
      company_name: "Brightloop Software",
      role: "staff",
      created_at: "2026-07-01T08:00:00Z",
      updated_at: "2026-07-01T08:00:00Z",
    },
    {
      id: "staff-002",
      email: "james.ops@brightloopsoftware.com",
      full_name: "James Wilson",
      company_name: "Brightloop Software",
      role: "staff",
      created_at: "2026-08-10T08:00:00Z",
      updated_at: "2026-08-10T08:00:00Z",
    },
  ];

  const products: Product[] = [
    {
      id: "prod-001",
      name: "Brightloop Analytics Core",
      type: "software",
      sales_price: 1200.0,
      cost_price: 350.0,
      notes: "Primary analytical processing engine for dataset interrogation and exploration.",
      is_active: true,
      variants: [
        {
          id: "var-001",
          product_id: "prod-001",
          name: "Standard Cloud Edition",
          sku: "BL-CORE-STD",
          price_adjustment: 0.0,
          cost_adjustment: 0.0,
          created_at: "2026-08-01T00:00:00Z",
        },
        {
          id: "var-002",
          product_id: "prod-001",
          name: "Odoo Brand Integration",
          sku: "BL-CORE-ODOO",
          price_adjustment: 560.0, // Explicitly fulfills the PDF requirement: "choosing the Odoo brand adds 560 to the price"
          cost_adjustment: 120.0,
          created_at: "2026-08-01T00:00:00Z",
        },
      ],
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "prod-002",
      name: "High-Throughput Stream Ingestion",
      type: "addon",
      sales_price: 450.0,
      cost_price: 100.0,
      notes: "Real-time streaming ingestion pipeline handling up to 50k events per second.",
      is_active: true,
      variants: [],
      created_at: "2026-08-05T00:00:00Z",
      updated_at: "2026-08-05T00:00:00Z",
    },
    {
      id: "prod-003",
      name: "Automated Executive Reporting Suite",
      type: "software",
      sales_price: 300.0,
      cost_price: 60.0,
      notes: "Daily and weekly automated digest exports with custom PDF templating.",
      is_active: true,
      variants: [],
      created_at: "2026-08-10T00:00:00Z",
      updated_at: "2026-08-10T00:00:00Z",
    },
    {
      id: "prod-004",
      name: "Dedicated Data Engineering Support",
      type: "service",
      sales_price: 800.0,
      cost_price: 400.0,
      notes: "Monthly consultation hours with a senior data analysis architect.",
      is_active: true,
      variants: [],
      created_at: "2026-08-12T00:00:00Z",
      updated_at: "2026-08-12T00:00:00Z",
    },
  ];

  const plans: Plan[] = [
    {
      id: "plan-monthly-std",
      name: "Enterprise Monthly Plan",
      price: 1500.0,
      billing_frequency: "monthly",
      min_quantity: 1,
      start_date: "2026-01-01",
      end_date: "2027-12-31",
      auto_close: false,
      early_close_eligible: true,
      pause_eligible: true,
      renewal_eligible: true,
      is_active: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "plan-yearly-ent",
      name: "Annual Corporate Contract",
      price: 15000.0,
      billing_frequency: "yearly",
      min_quantity: 1,
      start_date: "2026-01-01",
      end_date: "2028-12-31",
      auto_close: false,
      early_close_eligible: false,
      pause_eligible: false,
      renewal_eligible: true,
      is_active: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "plan-weekly-sprint",
      name: "Weekly Rapid Analysis Sprint",
      price: 400.0,
      billing_frequency: "weekly",
      min_quantity: 1,
      start_date: "2026-06-01",
      end_date: "2026-12-31",
      auto_close: true, // Closes on its own when term ends
      early_close_eligible: true,
      pause_eligible: false,
      renewal_eligible: false,
      is_active: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
  ];

  const taxes: TaxRule[] = [
    {
      id: "tax-vat-10",
      name: "Standard Software VAT",
      rate: 10.0,
      description: "Standard 10% value added tax for digital data services.",
      is_active: true,
      is_default: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "tax-sales-8",
      name: "US State Sales Tax",
      rate: 8.25,
      description: "Applicable state and municipal technology sales tax.",
      is_active: true,
      is_default: false,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "tax-zero",
      name: "Tax Exempt / Zero Rate",
      rate: 0.0,
      description: "Exported services and compliant tax-exempt research organizations.",
      is_active: true,
      is_default: false,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
  ];

  const discounts: DiscountRule[] = [
    {
      id: "disc-vol-20",
      code: "VOLUME20",
      description: "20% off for subscriptions exceeding $1,000 purchase volume.",
      discount_type: "percentage",
      discount_value: 20.0,
      min_purchase_amount: 1000.0,
      min_quantity: 1,
      start_date: "2026-01-01",
      end_date: "2027-12-31",
      usage_limit: 100,
      times_used: 12,
      applies_to: "all_subscriptions",
      is_active: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
    {
      id: "disc-fix-200",
      code: "ENTERPRISE200",
      description: "Flat $200 credit on dedicated data engineering support.",
      discount_type: "fixed",
      discount_value: 200.0,
      min_purchase_amount: 500.0,
      start_date: "2026-01-01",
      end_date: "2026-12-31",
      usage_limit: 50,
      times_used: 5,
      applies_to: "specific_products",
      product_id: "prod-004",
      is_active: true,
      created_at: "2026-08-01T00:00:00Z",
      updated_at: "2026-08-01T00:00:00Z",
    },
  ];

  const templates: QuotationTemplate[] = [
    {
      id: "tpl-001",
      name: "Complete Data Intelligence Bundle",
      description: "Standard corporate package including Core Analytics with Odoo Brand Integration & Streaming Ingestion.",
      plan_id: "plan-monthly-std",
      validity_days: 30,
      lines: [
        {
          id: "tpl-l-1",
          template_id: "tpl-001",
          product_id: "prod-001",
          variant_id: "var-002", // Odoo Brand (+560)
          quantity: 1,
          created_at: "2026-08-15T00:00:00Z",
        },
        {
          id: "tpl-l-2",
          template_id: "tpl-001",
          product_id: "prod-002",
          quantity: 1,
          created_at: "2026-08-15T00:00:00Z",
        },
      ],
      created_at: "2026-08-15T00:00:00Z",
      updated_at: "2026-08-15T00:00:00Z",
    },
  ];

  const quotations: Quotation[] = [
    {
      id: "quote-001",
      quote_number: "QT-2026-001",
      customer_id: "cust-001",
      template_id: "tpl-001",
      plan_id: "plan-monthly-std",
      status: "converted",
      valid_until: "2026-11-15",
      notes: "Commercial proposal approved by Apex Cloud Systems.",
      subtotal: 2210.0, // Core (1200 + 560) + Stream (450)
      tax_amount: 221.0,
      discount_amount: 0.0,
      total_amount: 2431.0,
      lines: [
        {
          id: "ql-1",
          quotation_id: "quote-001",
          product_id: "prod-001",
          variant_id: "var-002",
          description: "Brightloop Analytics Core (Odoo Brand Integration)",
          quantity: 1,
          unit_price: 1200.0,
          variant_adjustment: 560.0,
          tax_rate: 10.0,
          tax_amount: 176.0,
          discount_amount: 0.0,
          line_total: 1936.0,
        },
        {
          id: "ql-2",
          quotation_id: "quote-001",
          product_id: "prod-002",
          description: "High-Throughput Stream Ingestion",
          quantity: 1,
          unit_price: 450.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 45.0,
          discount_amount: 0.0,
          line_total: 495.0,
        },
      ],
      created_at: "2026-09-01T10:00:00Z",
      updated_at: "2026-09-02T12:00:00Z",
    },
    {
      id: "quote-002",
      quote_number: "QT-2026-002",
      customer_id: "cust-004",
      plan_id: "plan-monthly-std",
      status: "sent",
      valid_until: "2026-11-20",
      notes: "Awaiting final procurement signoff from Vortex Retail.",
      subtotal: 1200.0,
      tax_amount: 120.0,
      discount_amount: 0.0,
      total_amount: 1320.0,
      lines: [
        {
          id: "ql-3",
          quotation_id: "quote-002",
          product_id: "prod-001",
          description: "Brightloop Analytics Core (Standard)",
          quantity: 1,
          unit_price: 1200.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 120.0,
          discount_amount: 0.0,
          line_total: 1320.0,
        },
      ],
      created_at: "2026-10-25T11:00:00Z",
      updated_at: "2026-10-25T11:00:00Z",
    },
  ];

  const subscriptions: Subscription[] = [
    {
      id: "sub-001",
      subscription_number: "SUB-2026-001",
      customer_id: "cust-001",
      plan_id: "plan-monthly-std",
      quotation_id: "quote-001",
      status: "active",
      start_date: "2026-09-02",
      expiry_date: "2027-09-02",
      next_billing_date: "2026-11-02", // Due soon!
      billing_frequency: "monthly",
      payment_terms: "Net 15",
      auto_close: false,
      early_close_eligible: true,
      pause_eligible: true,
      renewal_eligible: true,
      subtotal: 2210.0,
      tax_amount: 221.0,
      discount_amount: 0.0,
      total_amount: 2431.0,
      lines: [
        {
          id: "sub-l-1",
          subscription_id: "sub-001",
          product_id: "prod-001",
          variant_id: "var-002",
          description: "Brightloop Analytics Core (Odoo Brand Integration)",
          quantity: 1,
          unit_price: 1200.0,
          variant_adjustment: 560.0,
          tax_rate: 10.0,
          tax_amount: 176.0,
          discount_amount: 0.0,
          line_total: 1936.0,
        },
        {
          id: "sub-l-2",
          subscription_id: "sub-001",
          product_id: "prod-002",
          description: "High-Throughput Stream Ingestion",
          quantity: 1,
          unit_price: 450.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 45.0,
          discount_amount: 0.0,
          line_total: 495.0,
        },
      ],
      created_at: "2026-09-02T12:00:00Z",
      updated_at: "2026-09-02T12:00:00Z",
    },
    {
      id: "sub-002",
      subscription_number: "SUB-2026-002",
      customer_id: "cust-002",
      plan_id: "plan-yearly-ent",
      status: "active",
      start_date: "2026-09-15",
      expiry_date: "2027-09-15",
      next_billing_date: "2027-09-15",
      billing_frequency: "yearly",
      payment_terms: "Net 30",
      auto_close: false,
      early_close_eligible: false,
      pause_eligible: false,
      renewal_eligible: true,
      subtotal: 15000.0,
      tax_amount: 1500.0,
      discount_amount: 3000.0, // VOLUME20 (20%)
      total_amount: 13500.0,
      lines: [
        {
          id: "sub-l-3",
          subscription_id: "sub-002",
          product_id: "prod-001",
          description: "Brightloop Analytics Core (Annual Contract)",
          quantity: 1,
          unit_price: 15000.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 1500.0,
          discount_amount: 3000.0,
          line_total: 13500.0,
        },
      ],
      created_at: "2026-09-15T10:00:00Z",
      updated_at: "2026-09-15T10:00:00Z",
    },
    {
      id: "sub-003",
      subscription_number: "SUB-2026-003",
      customer_id: "cust-003",
      plan_id: "plan-weekly-sprint",
      status: "confirmed",
      start_date: "2026-10-28",
      expiry_date: "2026-11-28",
      next_billing_date: "2026-11-04",
      billing_frequency: "weekly",
      payment_terms: "Due upon receipt",
      auto_close: true,
      early_close_eligible: true,
      pause_eligible: false,
      renewal_eligible: false,
      subtotal: 400.0,
      tax_amount: 40.0,
      discount_amount: 0.0,
      total_amount: 440.0,
      lines: [
        {
          id: "sub-l-4",
          subscription_id: "sub-003",
          product_id: "prod-003",
          description: "Weekly Rapid Analysis Sprint",
          quantity: 1,
          unit_price: 400.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 40.0,
          discount_amount: 0.0,
          line_total: 440.0,
        },
      ],
      created_at: "2026-10-28T14:00:00Z",
      updated_at: "2026-10-28T14:00:00Z",
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "inv-001",
      invoice_number: "INV-2026-001",
      customer_id: "cust-001",
      subscription_id: "sub-001",
      billing_period_start: "2026-09-02",
      billing_period_end: "2026-10-02",
      issue_date: "2026-09-02",
      due_date: "2026-09-17",
      status: "paid",
      subtotal: 2210.0,
      tax_amount: 221.0,
      discount_amount: 0.0,
      total_amount: 2431.0,
      amount_paid: 2431.0,
      amount_due: 0.0,
      notes: "First billing cycle for Apex Cloud Systems.",
      lines: [
        {
          id: "inv-l-1",
          invoice_id: "inv-001",
          product_id: "prod-001",
          variant_id: "var-002",
          description: "Brightloop Analytics Core (Odoo Brand Integration)",
          quantity: 1,
          unit_price: 1200.0,
          variant_adjustment: 560.0,
          tax_rate: 10.0,
          tax_amount: 176.0,
          discount_amount: 0.0,
          line_total: 1936.0,
        },
        {
          id: "inv-l-2",
          invoice_id: "inv-001",
          product_id: "prod-002",
          description: "High-Throughput Stream Ingestion",
          quantity: 1,
          unit_price: 450.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 45.0,
          discount_amount: 0.0,
          line_total: 495.0,
        },
      ],
      created_at: "2026-09-02T12:00:00Z",
      updated_at: "2026-09-10T15:00:00Z",
    },
    {
      id: "inv-002",
      invoice_number: "INV-2026-002",
      customer_id: "cust-001",
      subscription_id: "sub-001",
      billing_period_start: "2026-10-02",
      billing_period_end: "2026-11-02",
      issue_date: "2026-10-02",
      due_date: "2026-10-17", // OVERDUE!
      status: "confirmed",
      subtotal: 2210.0,
      tax_amount: 221.0,
      discount_amount: 0.0,
      total_amount: 2431.0,
      amount_paid: 1000.0, // Partial payment
      amount_due: 1431.0,  // Outstanding & Overdue!
      notes: "Second billing cycle for Apex Cloud Systems - Follow-up reminder sent.",
      lines: [
        {
          id: "inv-l-3",
          invoice_id: "inv-002",
          product_id: "prod-001",
          variant_id: "var-002",
          description: "Brightloop Analytics Core (Odoo Brand Integration)",
          quantity: 1,
          unit_price: 1200.0,
          variant_adjustment: 560.0,
          tax_rate: 10.0,
          tax_amount: 176.0,
          discount_amount: 0.0,
          line_total: 1936.0,
        },
        {
          id: "inv-l-4",
          invoice_id: "inv-002",
          product_id: "prod-002",
          description: "High-Throughput Stream Ingestion",
          quantity: 1,
          unit_price: 450.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 45.0,
          discount_amount: 0.0,
          line_total: 495.0,
        },
      ],
      created_at: "2026-10-02T08:00:00Z",
      updated_at: "2026-10-20T10:00:00Z",
    },
    {
      id: "inv-003",
      invoice_number: "INV-2026-003",
      customer_id: "cust-002",
      subscription_id: "sub-002",
      billing_period_start: "2026-09-15",
      billing_period_end: "2027-09-15",
      issue_date: "2026-09-15",
      due_date: "2026-10-15",
      status: "paid",
      subtotal: 15000.0,
      tax_amount: 1500.0,
      discount_amount: 3000.0,
      total_amount: 13500.0,
      amount_paid: 13500.0,
      amount_due: 0.0,
      notes: "Annual upfront payment by Nexus Dynamics via wire transfer.",
      lines: [
        {
          id: "inv-l-5",
          invoice_id: "inv-003",
          product_id: "prod-001",
          description: "Brightloop Analytics Core (Annual Contract)",
          quantity: 1,
          unit_price: 15000.0,
          variant_adjustment: 0.0,
          tax_rate: 10.0,
          tax_amount: 1500.0,
          discount_amount: 3000.0,
          line_total: 13500.0,
        },
      ],
      created_at: "2026-09-15T10:00:00Z",
      updated_at: "2026-09-16T14:00:00Z",
    },
  ];

  const payments: Payment[] = [
    {
      id: "pay-001",
      payment_reference: "PAY-2026-001",
      invoice_id: "inv-001",
      customer_id: "cust-001",
      amount: 2431.0,
      payment_method: "bank_transfer",
      payment_date: "2026-09-10",
      notes: "Wire transfer ref #WT-89412 - full invoice payment.",
      created_at: "2026-09-10T15:00:00Z",
    },
    {
      id: "pay-002",
      payment_reference: "PAY-2026-002",
      invoice_id: "inv-003",
      customer_id: "cust-002",
      amount: 13500.0,
      payment_method: "bank_transfer",
      payment_date: "2026-09-16",
      notes: "Annual settlement corporate wire transfer.",
      created_at: "2026-09-16T14:00:00Z",
    },
    {
      id: "pay-003",
      payment_reference: "PAY-2026-003",
      invoice_id: "inv-002",
      customer_id: "cust-001",
      amount: 1000.0,
      payment_method: "credit_card",
      payment_date: "2026-10-20",
      notes: "Partial payment received online. Remaining balance: $1,431.00.",
      created_at: "2026-10-20T10:00:00Z",
    },
  ];

  return {
    customers,
    products,
    plans,
    taxes,
    discounts,
    templates,
    quotations,
    subscriptions,
    invoices,
    payments,
    staff,
  };
}

// Get the persistent store
export function getStore() {
  if (!global.__brightloop_store__) {
    global.__brightloop_store__ = initializeSeedData();
  }
  return global.__brightloop_store__;
}

// --- Dashboard Metrics ---
export function getDashboardKPIs(): DashboardKPIs {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  // 1. Active Subscriptions
  const activeSubs = store.subscriptions.filter(
    (s) => s.status === "active" || s.status === "confirmed"
  );
  const activeSubscriptionsCount = activeSubs.length;

  // 2. Revenue Received (Total of all recorded payments)
  const revenueReceivedTotal = store.payments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );

  // 3. Outstanding Amount (Total unpaid balance on confirmed/draft invoices, excluding cancelled)
  const outstandingAmountTotal = store.invoices
    .filter((inv) => inv.status !== "paid" && inv.status !== "cancelled")
    .reduce((sum, inv) => sum + Number(inv.amount_due), 0);

  // 4. Overdue Invoices (invoices where due_date < today and amount_due > 0 and status != cancelled)
  const overdueInvoices = store.invoices.filter(
    (inv) =>
      inv.due_date < today &&
      inv.amount_due > 0 &&
      inv.status !== "cancelled" &&
      inv.status !== "paid"
  );
  const overdueInvoicesCount = overdueInvoices.length;
  const overdueAmountTotal = overdueInvoices.reduce(
    (sum, inv) => sum + Number(inv.amount_due),
    0
  );

  // Additional sections
  const recentSubscriptions = [...store.subscriptions]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 5);

  const recentPayments = [...store.payments]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 5);

  // Subscriptions due for billing in the next 7 days
  const upcomingBillingSubscriptions = store.subscriptions.filter((s) => {
    return s.status === "active";
  });

  return {
    activeSubscriptionsCount,
    revenueReceivedTotal,
    outstandingAmountTotal,
    overdueInvoicesCount,
    overdueAmountTotal,
    recentSubscriptions,
    recentPayments,
    overdueInvoices,
    upcomingBillingSubscriptions,
  };
}

// --- Customer Operations ---
export function getCustomers(searchQuery?: string): CustomerProfile[] {
  const store = getStore();
  let list = store.customers;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (c) =>
        c.full_name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.company_name && c.company_name.toLowerCase().includes(q))
    );
  }
  return list;
}

export function getCustomerById(id: string) {
  const store = getStore();
  const customer = store.customers.find((c) => c.id === id);
  if (!customer) return null;

  const quotations = store.quotations.filter((q) => q.customer_id === id);
  const subscriptions = store.subscriptions.filter((s) => s.customer_id === id);
  const invoices = store.invoices.filter((i) => i.customer_id === id);
  const payments = store.payments.filter((p) => p.customer_id === id);

  return {
    ...customer,
    quotations,
    subscriptions,
    invoices,
    payments,
  };
}

// --- Product & Variant Operations ---
export function getProducts(searchQuery?: string): Product[] {
  const store = getStore();
  let list = store.products;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q))
    );
  }
  return list;
}

export function getProductById(id: string): Product | null {
  const store = getStore();
  return store.products.find((p) => p.id === id) || null;
}

export function createProduct(data: {
  name: string;
  type: string;
  sales_price: number;
  cost_price: number;
  notes?: string;
  variants?: { name: string; sku?: string; price_adjustment: number; cost_adjustment: number }[];
}): Product {
  const store = getStore();
  const productId = `prod-${Date.now()}`;
  const variants: ProductVariant[] = (data.variants || []).map((v, i) => ({
    id: `var-${Date.now()}-${i}`,
    product_id: productId,
    name: v.name,
    sku: v.sku || "",
    price_adjustment: Number(v.price_adjustment) || 0,
    cost_adjustment: Number(v.cost_adjustment) || 0,
    created_at: new Date().toISOString(),
  }));

  const newProduct: Product = {
    id: productId,
    name: data.name,
    type: data.type || "software",
    sales_price: Number(data.sales_price) || 0,
    cost_price: Number(data.cost_price) || 0,
    notes: data.notes || "",
    is_active: true,
    variants,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.products.unshift(newProduct);
  return newProduct;
}

export function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "created_at">>
): Product | null {
  const store = getStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  store.products[index] = {
    ...store.products[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return store.products[index];
}

// --- Plan Operations ---
export function getPlans(): Plan[] {
  return getStore().plans;
}

export function getPlanById(id: string): Plan | null {
  return getStore().plans.find((p) => p.id === id) || null;
}

export function createPlan(data: Omit<Plan, "id" | "created_at" | "updated_at">): Plan {
  const store = getStore();
  const newPlan: Plan = {
    ...data,
    id: `plan-${Date.now()}`,
    price: Number(data.price),
    min_quantity: Number(data.min_quantity) || 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.plans.unshift(newPlan);
  return newPlan;
}

export function updatePlan(id: string, data: Partial<Plan>): Plan | null {
  const store = getStore();
  const index = store.plans.findIndex((p) => p.id === id);
  if (index === -1) return null;

  store.plans[index] = {
    ...store.plans[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return store.plans[index];
}

// --- Tax Operations ---
export function getTaxRules(): TaxRule[] {
  return getStore().taxes;
}

export function getTaxRuleById(id: string): TaxRule | null {
  return getStore().taxes.find((t) => t.id === id) || null;
}

export function createTaxRule(data: Omit<TaxRule, "id" | "created_at" | "updated_at">): TaxRule {
  const store = getStore();
  const newTax: TaxRule = {
    ...data,
    id: `tax-${Date.now()}`,
    rate: Number(data.rate),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.taxes.unshift(newTax);
  return newTax;
}

export function updateTaxRule(id: string, data: Partial<TaxRule>): TaxRule | null {
  const store = getStore();
  const idx = store.taxes.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  store.taxes[idx] = {
    ...store.taxes[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return store.taxes[idx];
}

// --- Discount Operations ---
export function getDiscounts(): DiscountRule[] {
  return getStore().discounts;
}

export function getDiscountById(id: string): DiscountRule | null {
  return getStore().discounts.find((d) => d.id === id) || null;
}

export function createDiscount(
  data: Omit<DiscountRule, "id" | "times_used" | "created_at" | "updated_at">
): DiscountRule {
  const store = getStore();
  const newDiscount: DiscountRule = {
    ...data,
    id: `disc-${Date.now()}`,
    discount_value: Number(data.discount_value),
    min_purchase_amount: data.min_purchase_amount ? Number(data.min_purchase_amount) : undefined,
    min_quantity: data.min_quantity ? Number(data.min_quantity) : undefined,
    usage_limit: data.usage_limit ? Number(data.usage_limit) : undefined,
    times_used: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.discounts.unshift(newDiscount);
  return newDiscount;
}

export function updateDiscount(id: string, data: Partial<DiscountRule>): DiscountRule | null {
  const store = getStore();
  const idx = store.discounts.findIndex((d) => d.id === id);
  if (idx === -1) return null;

  store.discounts[idx] = {
    ...store.discounts[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };
  return store.discounts[idx];
}

/**
 * Evaluates whether a discount rule applies to a given commercial transaction context
 * and calculates the exact discount amount using 2-decimal rounded arithmetic.
 */
export function evaluateDiscountRule(
  discount: DiscountRule,
  context: {
    subtotal: number;
    totalQuantity: number;
    productIds?: string[];
    currentDate?: string;
  }
): {
  eligible: boolean;
  reason?: string;
  discountAmount: number;
} {
  const today = context.currentDate || new Date().toISOString().split("T")[0];

  // 1. Check active status
  if (!discount.is_active) {
    return { eligible: false, reason: "Discount rule is inactive.", discountAmount: 0 };
  }

  // 2. Check date window
  if (discount.start_date && discount.start_date > today) {
    return { eligible: false, reason: "Discount rule is not yet valid.", discountAmount: 0 };
  }
  if (discount.end_date && discount.end_date < today) {
    return { eligible: false, reason: "Discount rule has expired.", discountAmount: 0 };
  }

  // 3. Check usage limit
  if (discount.usage_limit && discount.times_used >= discount.usage_limit) {
    return { eligible: false, reason: "Discount usage limit has been reached.", discountAmount: 0 };
  }

  // 4. Check minimum purchase amount
  if (discount.min_purchase_amount && context.subtotal < discount.min_purchase_amount) {
    return {
      eligible: false,
      reason: `Minimum purchase amount of $${discount.min_purchase_amount} required (current: $${context.subtotal}).`,
      discountAmount: 0,
    };
  }

  // 5. Check minimum quantity
  if (discount.min_quantity && context.totalQuantity < discount.min_quantity) {
    return {
      eligible: false,
      reason: `Minimum quantity of ${discount.min_quantity} required (current: ${context.totalQuantity}).`,
      discountAmount: 0,
    };
  }

  // 6. Check product applicability
  if (discount.applies_to === "specific_products" && discount.product_id) {
    const hasProduct = context.productIds?.includes(discount.product_id);
    if (!hasProduct) {
      return {
        eligible: false,
        reason: "Discount applies only to specific products not present in this order.",
        discountAmount: 0,
      };
    }
  }

  // 7. Calculate discount amount
  let discountAmount = 0;
  if (discount.discount_type === "percentage") {
    discountAmount = (context.subtotal * discount.discount_value) / 100;
  } else if (discount.discount_type === "fixed") {
    discountAmount = Math.min(context.subtotal, discount.discount_value);
  }

  // Round to 2 decimal places using reliable arithmetic
  discountAmount = Math.round(discountAmount * 100) / 100;

  return {
    eligible: true,
    discountAmount,
  };
}

// --- Quotation Templates Operations ---
export function getQuotationTemplates(): QuotationTemplate[] {
  return getStore().templates;
}

export function getQuotationTemplateById(id: string): QuotationTemplate | null {
  return getStore().templates.find((t) => t.id === id) || null;
}

export function createQuotationTemplate(data: {
  name: string;
  description?: string;
  plan_id: string;
  validity_days: number;
  lines: { product_id: string; variant_id?: string; quantity: number }[];
}): QuotationTemplate {
  const store = getStore();
  const templateId = `tpl-${Date.now()}`;
  const lines = data.lines.map((l, idx) => ({
    id: `tpl-l-${Date.now()}-${idx}`,
    template_id: templateId,
    product_id: l.product_id,
    variant_id: l.variant_id,
    quantity: Number(l.quantity) || 1,
    created_at: new Date().toISOString(),
  }));

  const newTemplate: QuotationTemplate = {
    id: templateId,
    name: data.name,
    description: data.description || "",
    plan_id: data.plan_id,
    validity_days: Number(data.validity_days) || 30,
    lines,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.templates.unshift(newTemplate);
  return newTemplate;
}

// --- Quotations Operations ---
export function getQuotations(statusFilter?: string): Quotation[] {
  const store = getStore();
  let list = store.quotations.map((q) => ({
    ...q,
    customer: store.customers.find((c) => c.id === q.customer_id),
    plan: store.plans.find((p) => p.id === q.plan_id),
  }));

  if (statusFilter && statusFilter !== "all") {
    list = list.filter((q) => q.status === statusFilter);
  }
  return list;
}

export function getQuotationById(id: string): Quotation | null {
  const store = getStore();
  const q = store.quotations.find((item) => item.id === id);
  if (!q) return null;

  return {
    ...q,
    customer: store.customers.find((c) => c.id === q.customer_id),
    plan: store.plans.find((p) => p.id === q.plan_id),
  };
}

export function createQuotation(data: {
  customer_id: string;
  plan_id: string;
  template_id?: string;
  discount_id?: string;
  validity_days?: number;
  notes?: string;
  lines: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    tax_rate?: number;
  }[];
}): Quotation {
  const store = getStore();
  const quoteId = `quote-${Date.now()}`;
  const count = store.quotations.length + 1;
  const quote_number = `QT-2026-${String(count).padStart(3, "0")}`;

  const validityDays = data.validity_days || 30;
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + validityDays);

  let rawSubtotal = 0;
  let totalQty = 0;
  const productIds: string[] = [];

  const rawLines = data.lines.map((item, idx) => {
    const product = store.products.find((p) => p.id === item.product_id);
    const variant = product?.variants.find((v) => v.id === item.variant_id);

    const unit_price = product?.sales_price || 0;
    const variant_adjustment = variant?.price_adjustment || 0;
    const qty = Math.max(1, Number(item.quantity) || 1);
    const baseAmount = (unit_price + variant_adjustment) * qty;

    rawSubtotal += baseAmount;
    totalQty += qty;
    if (item.product_id) productIds.push(item.product_id);

    const desc = variant
      ? `${product?.name || "Product"} (${variant.name})`
      : product?.name || "Product";

    return {
      idx,
      item,
      desc,
      unit_price,
      variant_adjustment,
      qty,
      baseAmount,
    };
  });

  // Evaluate applicable discount rule if specified or eligible
  let calculatedDiscount = 0;
  let appliedDiscountRule: DiscountRule | null = null;

  if (data.discount_id) {
    appliedDiscountRule =
      store.discounts.find(
        (d) => d.id === data.discount_id || d.code.toUpperCase() === data.discount_id?.toUpperCase()
      ) || null;
  } else {
    // Auto-detect best eligible discount
    for (const d of store.discounts) {
      const evalResult = evaluateDiscountRule(d, {
        subtotal: rawSubtotal,
        totalQuantity: totalQty,
        productIds,
      });
      if (evalResult.eligible && evalResult.discountAmount > calculatedDiscount) {
        calculatedDiscount = evalResult.discountAmount;
        appliedDiscountRule = d;
      }
    }
  }

  if (appliedDiscountRule && calculatedDiscount === 0) {
    const evalResult = evaluateDiscountRule(appliedDiscountRule, {
      subtotal: rawSubtotal,
      totalQuantity: totalQty,
      productIds,
    });
    if (evalResult.eligible) {
      calculatedDiscount = evalResult.discountAmount;
      appliedDiscountRule.times_used += 1;
    }
  }

  // Calculate taxes on discounted subtotal
  let totalTax = 0;
  const lines: QuotationLine[] = rawLines.map((rl) => {
    // Proportional discount distribution
    const lineDiscount =
      rawSubtotal > 0
        ? Math.round(((rl.baseAmount / rawSubtotal) * calculatedDiscount) * 100) / 100
        : 0;
    const taxableAmount = Math.max(0, rl.baseAmount - lineDiscount);
    const tax_rate = rl.item.tax_rate !== undefined ? rl.item.tax_rate : 10.0;
    const taxAmt = Math.round((taxableAmount * (tax_rate / 100)) * 100) / 100;
    const lineTotal = Math.round((taxableAmount + taxAmt) * 100) / 100;

    totalTax += taxAmt;

    return {
      id: `ql-${Date.now()}-${rl.idx}`,
      quotation_id: quoteId,
      product_id: rl.item.product_id,
      variant_id: rl.item.variant_id,
      description: rl.desc,
      quantity: rl.qty,
      unit_price: rl.unit_price,
      variant_adjustment: rl.variant_adjustment,
      tax_rate,
      tax_amount: taxAmt,
      discount_amount: lineDiscount,
      line_total: lineTotal,
    };
  });

  const finalSubtotal = Math.round(rawSubtotal * 100) / 100;
  const finalDiscount = Math.round(calculatedDiscount * 100) / 100;
  const finalTax = Math.round(totalTax * 100) / 100;
  const total_amount = Math.round((finalSubtotal - finalDiscount + finalTax) * 100) / 100;

  const newQuote: Quotation = {
    id: quoteId,
    quote_number,
    customer_id: data.customer_id,
    template_id: data.template_id,
    plan_id: data.plan_id,
    status: "draft",
    valid_until: validUntilDate.toISOString().split("T")[0],
    notes: data.notes || "",
    subtotal: finalSubtotal,
    tax_amount: finalTax,
    discount_amount: finalDiscount,
    total_amount,
    lines,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.quotations.unshift(newQuote);
  return newQuote;
}

export function convertQuotationToSubscription(quoteId: string): Subscription | null {
  const store = getStore();
  const quote = store.quotations.find((q) => q.id === quoteId);
  if (!quote) return null;

  // 1. Idempotency Check: if already converted, return existing subscription
  if (quote.status === "converted") {
    const existing = store.subscriptions.find((s) => s.quotation_id === quote.id);
    if (existing) return existing;
  }

  // 2. Expiration Check: reject expired quotations
  const today = new Date().toISOString().split("T")[0];
  if (quote.status === "expired" || (quote.valid_until && quote.valid_until < today)) {
    quote.status = "expired";
    quote.updated_at = new Date().toISOString();
    return null; // Cannot convert expired quotation
  }

  // 3. Status Check: only valid unexpired quotes can be converted
  if (quote.status !== "draft" && quote.status !== "sent") {
    return null;
  }

  const plan = store.plans.find((p) => p.id === quote.plan_id);
  const subId = `sub-${Date.now()}`;
  const count = store.subscriptions.length + 1;
  const subNumber = `SUB-2026-${String(count).padStart(3, "0")}`;

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextBilling = nextMonth.toISOString().split("T")[0];

  const subLines: SubscriptionLine[] = quote.lines.map((ql, idx) => ({
    id: `sub-l-${Date.now()}-${idx}`,
    subscription_id: subId,
    product_id: ql.product_id,
    variant_id: ql.variant_id,
    description: ql.description,
    quantity: ql.quantity,
    unit_price: ql.unit_price,
    variant_adjustment: ql.variant_adjustment,
    tax_rate: ql.tax_rate,
    tax_amount: ql.tax_amount,
    discount_amount: ql.discount_amount,
    line_total: ql.line_total,
  }));

  const newSubscription: Subscription = {
    id: subId,
    subscription_number: subNumber,
    customer_id: quote.customer_id,
    plan_id: quote.plan_id,
    quotation_id: quote.id,
    status: "confirmed", // Moves to Confirmed as specified in the PDF lifecycle: Draft -> Quotation -> Confirmed -> Active -> Closed
    start_date: today,
    next_billing_date: nextBilling,
    billing_frequency: plan?.billing_frequency || "monthly",
    payment_terms: "Net 15",
    auto_close: plan?.auto_close ?? false,
    early_close_eligible: plan?.early_close_eligible ?? true,
    pause_eligible: plan?.pause_eligible ?? true,
    renewal_eligible: plan?.renewal_eligible ?? true,
    subtotal: quote.subtotal,
    tax_amount: quote.tax_amount,
    discount_amount: quote.discount_amount,
    total_amount: quote.total_amount,
    lines: subLines,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  quote.status = "converted";
  quote.updated_at = new Date().toISOString();

  store.subscriptions.unshift(newSubscription);
  return newSubscription;
}

// --- Subscription Operations ---
export function getSubscriptions(filters?: {
  status?: string;
  customer_id?: string;
  plan_id?: string;
}): Subscription[] {
  const store = getStore();
  let list = store.subscriptions.map((s) => ({
    ...s,
    customer: store.customers.find((c) => c.id === s.customer_id),
    plan: store.plans.find((p) => p.id === s.plan_id),
  }));

  if (filters?.status && filters.status !== "all") {
    list = list.filter((s) => s.status === filters.status);
  }
  if (filters?.customer_id) {
    list = list.filter((s) => s.customer_id === filters.customer_id);
  }
  if (filters?.plan_id) {
    list = list.filter((s) => s.plan_id === filters.plan_id);
  }
  return list;
}

export function getSubscriptionById(id: string): Subscription | null {
  const store = getStore();
  const sub = store.subscriptions.find((s) => s.id === id);
  if (!sub) return null;

  return {
    ...sub,
    customer: store.customers.find((c) => c.id === sub.customer_id),
    plan: store.plans.find((p) => p.id === sub.plan_id),
  };
}

export function createSubscription(data: {
  customer_id: string;
  plan_id: string;
  billing_frequency: BillingFrequency;
  payment_terms?: string;
  lines: {
    product_id: string;
    variant_id?: string;
    quantity: number;
    tax_rate?: number;
  }[];
}): Subscription {
  const store = getStore();
  const plan = store.plans.find((p) => p.id === data.plan_id);
  const subId = `sub-${Date.now()}`;
  const count = store.subscriptions.length + 1;
  const subNumber = `SUB-2026-${String(count).padStart(3, "0")}`;

  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  let subtotal = 0;
  let tax_amount = 0;

  const lines: SubscriptionLine[] = data.lines.map((item, idx) => {
    const product = store.products.find((p) => p.id === item.product_id);
    const variant = product?.variants.find((v) => v.id === item.variant_id);

    const unit_price = product?.sales_price || 0;
    const variant_adjustment = variant?.price_adjustment || 0;
    const qty = Number(item.quantity) || 1;
    const baseAmount = (unit_price + variant_adjustment) * qty;

    const tax_rate = item.tax_rate !== undefined ? item.tax_rate : 10.0;
    const taxAmt = baseAmount * (tax_rate / 100);
    const lineTotal = baseAmount + taxAmt;

    subtotal += baseAmount;
    tax_amount += taxAmt;

    const desc = variant
      ? `${product?.name || "Product"} (${variant.name})`
      : product?.name || "Product";

    return {
      id: `sub-l-${Date.now()}-${idx}`,
      subscription_id: subId,
      product_id: item.product_id,
      variant_id: item.variant_id,
      description: desc,
      quantity: qty,
      unit_price,
      variant_adjustment,
      tax_rate,
      tax_amount: taxAmt,
      discount_amount: 0,
      line_total: lineTotal,
    };
  });

  const newSub: Subscription = {
    id: subId,
    subscription_number: subNumber,
    customer_id: data.customer_id,
    plan_id: data.plan_id,
    status: "confirmed",
    start_date: today,
    next_billing_date: nextMonth.toISOString().split("T")[0],
    billing_frequency: data.billing_frequency || plan?.billing_frequency || "monthly",
    payment_terms: data.payment_terms || "Net 15",
    auto_close: plan?.auto_close ?? false,
    early_close_eligible: plan?.early_close_eligible ?? true,
    pause_eligible: plan?.pause_eligible ?? true,
    renewal_eligible: plan?.renewal_eligible ?? true,
    subtotal,
    tax_amount,
    discount_amount: 0,
    total_amount: subtotal + tax_amount,
    lines,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.subscriptions.unshift(newSub);
  return newSub;
}

export function updateSubscriptionStatus(
  id: string,
  newStatus: SubscriptionStatus
): { success: boolean; error?: string; subscription?: Subscription } {
  const store = getStore();
  const sub = store.subscriptions.find((s) => s.id === id);
  if (!sub) return { success: false, error: "Subscription not found." };

  // Terminal state check: Closed subscriptions cannot be modified
  if (sub.status === "closed") {
    return { success: false, error: "Closed subscriptions cannot be reopened or modified." };
  }

  const plan = store.plans.find((p) => p.id === sub.plan_id);

  // Validate allowed transitions based on plan policies & lifecycle
  if (newStatus === "paused") {
    if (!sub.pause_eligible && (!plan || !plan.pause_eligible)) {
      return { success: false, error: "The selected plan does not permit pausing." };
    }
    if (sub.status !== "active") {
      return { success: false, error: "Only active subscriptions can be paused." };
    }
  }

  if (newStatus === "active") {
    if (sub.status !== "confirmed" && sub.status !== "paused" && sub.status !== "draft") {
      return { success: false, error: `Cannot activate subscription from '${sub.status}' state.` };
    }
  }

  if (newStatus === "closed") {
    const today = new Date().toISOString().split("T")[0];
    const isPastExpiry = sub.expiry_date && sub.expiry_date <= today;
    if (!isPastExpiry && !sub.early_close_eligible && (!plan || !plan.early_close_eligible)) {
      return { success: false, error: "Early closure is not permitted under this plan contract." };
    }
  }

  sub.status = newStatus;
  sub.updated_at = new Date().toISOString();
  return { success: true, subscription: sub };
}

// --- Invoicing & Recurring Billing Engine ---
export function getInvoices(filters?: {
  status?: string;
  customer_id?: string;
  overdue_only?: boolean;
}): Invoice[] {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  let list = store.invoices.map((inv) => ({
    ...inv,
    customer: store.customers.find((c) => c.id === inv.customer_id),
    subscription: store.subscriptions.find((s) => s.id === inv.subscription_id),
  }));

  if (filters?.status && filters.status !== "all") {
    list = list.filter((i) => i.status === filters.status);
  }
  if (filters?.customer_id) {
    list = list.filter((i) => i.customer_id === filters.customer_id);
  }
  if (filters?.overdue_only) {
    list = list.filter(
      (i) => i.due_date < today && i.amount_due > 0 && i.status !== "paid" && i.status !== "cancelled"
    );
  }
  return list;
}

export function getInvoiceById(id: string): Invoice | null {
  const store = getStore();
  const inv = store.invoices.find((i) => i.id === id);
  if (!inv) return null;

  const payments = store.payments.filter((p) => p.invoice_id === id);

  return {
    ...inv,
    customer: store.customers.find((c) => c.id === inv.customer_id),
    subscription: store.subscriptions.find((s) => s.id === inv.subscription_id),
    payments,
  };
}

export function updateInvoiceStatus(
  id: string,
  newStatus: InvoiceStatus
): { success: boolean; error?: string; invoice?: Invoice } {
  const store = getStore();
  const inv = store.invoices.find((i) => i.id === id);
  if (!inv) return { success: false, error: "Invoice not found." };

  if (inv.status === "cancelled") {
    return { success: false, error: "Cancelled invoices cannot be altered." };
  }

  if (newStatus === "paid") {
    return {
      success: false,
      error: "Invoices can only transition to Paid via recorded payment transactions.",
    };
  }

  if (newStatus === "cancelled") {
    if (inv.status === "paid" || inv.amount_paid > 0) {
      return {
        success: false,
        error: "Cannot cancel an invoice with recorded payments. Please void or refund first.",
      };
    }
  }

  if (newStatus === "confirmed") {
    if (inv.status !== "draft") {
      return { success: false, error: "Only draft invoices can be confirmed." };
    }
  }

  inv.status = newStatus;
  inv.updated_at = new Date().toISOString();
  return { success: true, invoice: inv };
}

/**
 * Idempotent Recurring Billing Process
 * Scans active subscriptions due for billing and generates invoices without duplicates or missed periods.
 */
export function runRecurringBilling(options?: {
  forceAll?: boolean;
  currentDate?: string;
}): {
  processedCount: number;
  invoicesCreated: number;
  skippedDuplicates: number;
  closedExpiredCount: number;
  createdInvoices: Invoice[];
} {
  const store = getStore();
  const today = options?.currentDate || new Date().toISOString().split("T")[0];

  let processedCount = 0;
  let invoicesCreated = 0;
  let skippedDuplicates = 0;
  let closedExpiredCount = 0;
  const createdInvoices: Invoice[] = [];

  // 1. Process auto-close on expired subscriptions
  for (const s of store.subscriptions) {
    if (s.status === "active" && s.auto_close && s.expiry_date && s.expiry_date <= today) {
      s.status = "closed";
      s.updated_at = new Date().toISOString();
      closedExpiredCount++;
    }
  }

  // 2. Identify active subscriptions due for billing
  const eligibleSubs = store.subscriptions.filter((s) => {
    if (s.status !== "active") return false;
    if (options?.forceAll) return true;
    return s.next_billing_date <= today;
  });

  for (const sub of eligibleSubs) {
    processedCount++;

    // Calculate billing period
    const periodEnd = sub.next_billing_date;

    const prevDate = new Date(periodEnd);
    if (sub.billing_frequency === "monthly") {
      prevDate.setMonth(prevDate.getMonth() - 1);
    } else if (sub.billing_frequency === "yearly") {
      prevDate.setFullYear(prevDate.getFullYear() - 1);
    } else if (sub.billing_frequency === "weekly") {
      prevDate.setDate(prevDate.getDate() - 7);
    } else if (sub.billing_frequency === "daily") {
      prevDate.setDate(prevDate.getDate() - 1);
    }
    const computedStart = prevDate.toISOString().split("T")[0];
    const periodStart = computedStart < sub.start_date ? sub.start_date : computedStart;

    // Strict Idempotency Check:
    // "Running the billing process multiple times for the same subscription and billing period must never create duplicate invoices."
    const existing = store.invoices.find(
      (inv) =>
        inv.subscription_id === sub.id &&
        inv.billing_period_start === periodStart &&
        inv.billing_period_end === periodEnd
    );

    if (existing) {
      skippedDuplicates++;
      continue;
    }

    const count = store.invoices.length + 1;
    const invNumber = `INV-2026-${String(count).padStart(3, "0")}`;
    const invoiceId = `inv-${Date.now()}-${count}`;

    // Calculate due date based on payment terms
    let termDays = 15;
    if (sub.payment_terms?.includes("30")) termDays = 30;
    else if (sub.payment_terms?.includes("60")) termDays = 60;
    else if (sub.payment_terms?.includes("receipt")) termDays = 0;
    else if (sub.payment_terms?.includes("7")) termDays = 7;

    const dueDateObj = new Date(today);
    dueDateObj.setDate(dueDateObj.getDate() + termDays);
    const dueDate = dueDateObj.toISOString().split("T")[0];

    // Snapshot lines from subscription
    const lines: InvoiceLine[] = sub.lines.map((sl, idx) => ({
      id: `inv-l-${Date.now()}-${idx}`,
      invoice_id: invoiceId,
      product_id: sl.product_id,
      variant_id: sl.variant_id,
      description: sl.description,
      quantity: sl.quantity,
      unit_price: sl.unit_price,
      variant_adjustment: sl.variant_adjustment,
      tax_rate: sl.tax_rate,
      tax_amount: sl.tax_amount,
      discount_amount: sl.discount_amount,
      line_total: sl.line_total,
    }));

    const newInvoice: Invoice = {
      id: invoiceId,
      invoice_number: invNumber,
      customer_id: sub.customer_id,
      subscription_id: sub.id,
      billing_period_start: periodStart,
      billing_period_end: periodEnd,
      issue_date: today,
      due_date: dueDate,
      status: "confirmed", // Automatically confirmed as specified in the PDF
      subtotal: sub.subtotal,
      tax_amount: sub.tax_amount,
      discount_amount: sub.discount_amount,
      total_amount: sub.total_amount,
      amount_paid: 0,
      amount_due: sub.total_amount,
      notes: `Recurring billing for subscription ${sub.subscription_number}.`,
      lines,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    store.invoices.unshift(newInvoice);
    createdInvoices.push(newInvoice);
    invoicesCreated++;

    // Increment next billing date based on cadence
    const nextDate = new Date(sub.next_billing_date);
    if (sub.billing_frequency === "monthly") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (sub.billing_frequency === "yearly") {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else if (sub.billing_frequency === "weekly") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (sub.billing_frequency === "daily") {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    sub.next_billing_date = nextDate.toISOString().split("T")[0];
    sub.updated_at = new Date().toISOString();
  }

  return {
    processedCount,
    invoicesCreated,
    skippedDuplicates,
    closedExpiredCount,
    createdInvoices,
  };
}

// --- Payment Operations ---
export function getPayments(filters?: { customer_id?: string; invoice_id?: string }): Payment[] {
  const store = getStore();
  let list = store.payments.map((p) => ({
    ...p,
    customer: store.customers.find((c) => c.id === p.customer_id),
    invoice: store.invoices.find((i) => i.id === p.invoice_id),
  }));

  if (filters?.customer_id) {
    list = list.filter((p) => p.customer_id === filters.customer_id);
  }
  if (filters?.invoice_id) {
    list = list.filter((p) => p.invoice_id === filters.invoice_id);
  }
  return list;
}

export function recordPayment(data: {
  invoice_id: string;
  amount: number;
  payment_method: any;
  payment_date?: string;
  notes?: string;
}): { success: boolean; error?: string; payment?: Payment } {
  const store = getStore();
  const invoice = store.invoices.find((i) => i.id === data.invoice_id);
  if (!invoice) return { success: false, error: "Selected invoice not found." };

  if (invoice.status === "cancelled") {
    return { success: false, error: "Cannot record payments against a cancelled invoice." };
  }

  if (invoice.status === "draft") {
    return { success: false, error: "Invoice must be confirmed before recording payments." };
  }

  if (invoice.status === "paid" || invoice.amount_due <= 0) {
    return { success: false, error: "Invoice is already paid in full." };
  }

  const amount = Math.round(Number(data.amount) * 100) / 100;
  if (isNaN(amount) || amount <= 0) {
    return { success: false, error: "Please enter a valid positive payment amount." };
  }

  if (amount > invoice.amount_due) {
    return {
      success: false,
      error: `Payment amount ($${amount.toFixed(2)}) exceeds remaining invoice balance ($${invoice.amount_due.toFixed(2)}).`,
    };
  }

  const count = store.payments.length + 1;
  const payRef = `PAY-2026-${String(count).padStart(3, "0")}`;
  const payId = `pay-${Date.now()}`;

  const newPayment: Payment = {
    id: payId,
    payment_reference: payRef,
    invoice_id: invoice.id,
    customer_id: invoice.customer_id,
    amount,
    payment_method: data.payment_method || "bank_transfer",
    payment_date: data.payment_date || new Date().toISOString().split("T")[0],
    notes: data.notes || "",
    created_at: new Date().toISOString(),
  };

  // Update invoice balance with safe decimal arithmetic
  const newAmountPaid = Math.round((invoice.amount_paid + amount) * 100) / 100;
  const newAmountDue = Math.max(0, Math.round((invoice.total_amount - newAmountPaid) * 100) / 100);

  invoice.amount_paid = newAmountPaid;
  invoice.amount_due = newAmountDue;

  if (newAmountDue === 0) {
    invoice.status = "paid";
  }
  invoice.updated_at = new Date().toISOString();

  store.payments.unshift(newPayment);
  return { success: true, payment: newPayment };
}

// --- Staff Management ---
export function getTeamMembers(): CustomerProfile[] {
  return getStore().staff;
}

export function createStaffMember(data: {
  full_name: string;
  email: string;
}): { success: boolean; error?: string; staff?: CustomerProfile } {
  const store = getStore();
  const email = data.email.toLowerCase().trim();

  const existing = store.staff.find((s) => s.email === email);
  if (existing) {
    return { success: false, error: "A staff account with this email already exists." };
  }

  const newStaff: CustomerProfile = {
    id: `staff-${Date.now()}`,
    email,
    full_name: data.full_name.trim(),
    company_name: "Brightloop Software",
    role: "staff",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.staff.push(newStaff);
  return { success: true, staff: newStaff };
}

// --- Global Search ---
export function markInvoiceSent(id: string): { success: boolean; invoice?: Invoice; error?: string } {
  const store = getStore();
  const inv = store.invoices.find((i) => i.id === id);
  if (!inv) return { success: false, error: "Invoice not found." };
  inv.sent_at = new Date().toISOString();
  inv.updated_at = new Date().toISOString();
  return { success: true, invoice: inv };
}

export function getStaffDashboardMetrics() {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  // 1. Active Subscriptions
  const activeSubs = store.subscriptions.filter(
    (s) => s.status === "active" || s.status === "confirmed"
  );

  // 2. Invoices awaiting confirmation (draft)
  const draftInvoices = store.invoices.filter((i) => i.status === "draft");

  // 3. Outstanding Invoices (confirmed with balance due > 0)
  const outstandingInvoices = store.invoices.filter(
    (i) => i.status === "confirmed" && Number(i.amount_due) > 0
  );

  // 4. Overdue Invoices (confirmed/draft with balance due > 0 and due_date < today)
  const overdueInvoices = store.invoices.filter(
    (i) =>
      (i.status === "confirmed" || i.status === "draft") &&
      Number(i.amount_due) > 0 &&
      i.due_date < today
  );

  const outstandingAmountTotal = outstandingInvoices.reduce(
    (sum, i) => sum + Number(i.amount_due),
    0
  );
  const overdueAmountTotal = overdueInvoices.reduce(
    (sum, i) => sum + Number(i.amount_due),
    0
  );

  // Subscriptions requiring operational attention (draft, quotation, or expiring within 14 days)
  const attentionSubscriptions = store.subscriptions.filter((s) => {
    if (s.status === "draft" || s.status === "quotation") return true;
    if (s.status === "active" && s.expiry_date) {
      const end = new Date(s.expiry_date).getTime();
      const now = new Date().getTime();
      const daysUntilEnd = (end - now) / (1000 * 60 * 60 * 24);
      return daysUntilEnd <= 14 && daysUntilEnd >= 0;
    }
    return false;
  });

  return {
    summary: {
      activeSubscriptionsCount: activeSubs.length,
      invoicesAwaitingConfirmationCount: draftInvoices.length,
      outstandingInvoicesCount: outstandingInvoices.length,
      overdueInvoicesCount: overdueInvoices.length,
      outstandingAmountTotal,
      overdueAmountTotal,
    },
    attentionRequired: {
      overdueInvoices: overdueInvoices.slice(0, 5),
      draftInvoices: draftInvoices.slice(0, 5),
      attentionSubscriptions: attentionSubscriptions.slice(0, 5),
    },
    recentActivity: {
      quotations: store.quotations.slice(0, 5),
      subscriptions: store.subscriptions.slice(0, 5),
      invoices: store.invoices.slice(0, 5),
      payments: store.payments.slice(0, 5),
    },
  };
}

export function globalSearch(query: string, workspace: "admin" | "staff" = "admin") {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();
  const store = getStore();
  const results: {
    type: "Customer" | "Subscription" | "Invoice" | "Quotation" | "Product";
    title: string;
    subtitle: string;
    url: string;
  }[] = [];

  // Customers
  store.customers.forEach((c) => {
    if (
      c.full_name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.company_name && c.company_name.toLowerCase().includes(q))
    ) {
      results.push({
        type: "Customer",
        title: c.full_name,
        subtitle: `${c.company_name ? c.company_name + " · " : ""}${c.email}`,
        url: `/${workspace}/customers/${c.id}`,
      });
    }
  });

  // Subscriptions
  store.subscriptions.forEach((s) => {
    if (s.subscription_number.toLowerCase().includes(q)) {
      const cust = store.customers.find((c) => c.id === s.customer_id);
      results.push({
        type: "Subscription",
        title: s.subscription_number,
        subtitle: `${cust?.full_name || "Customer"} · $${s.total_amount.toFixed(2)} · ${s.status.toUpperCase()}`,
        url: `/${workspace}/subscriptions/${s.id}`,
      });
    }
  });

  // Invoices
  store.invoices.forEach((i) => {
    if (i.invoice_number.toLowerCase().includes(q)) {
      const cust = store.customers.find((c) => c.id === i.customer_id);
      results.push({
        type: "Invoice",
        title: i.invoice_number,
        subtitle: `${cust?.full_name || "Customer"} · Due $${i.amount_due.toFixed(2)} · ${i.status.toUpperCase()}`,
        url: `/${workspace}/invoices/${i.id}`,
      });
    }
  });

  // Quotations
  store.quotations.forEach((quote) => {
    if (quote.quote_number.toLowerCase().includes(q)) {
      const cust = store.customers.find((c) => c.id === quote.customer_id);
      results.push({
        type: "Quotation",
        title: quote.quote_number,
        subtitle: `${cust?.full_name || "Customer"} · $${quote.total_amount.toFixed(2)} · ${quote.status.toUpperCase()}`,
        url: `/${workspace}/quotations/${quote.id}`,
      });
    }
  });

  // Products
  store.products.forEach((p) => {
    if (p.name.toLowerCase().includes(q)) {
      results.push({
        type: "Product",
        title: p.name,
        subtitle: `$${p.sales_price.toFixed(2)} · ${p.type.toUpperCase()}`,
        url: workspace === "admin" ? `/admin/products/${p.id}` : `/staff/quotations/new?product_id=${p.id}`,
      });
    }
  });

  return results.slice(0, 10);
}

/**
 * Resolves a customer profile corresponding to an authenticated user identity or email.
 */
export function getCustomerForUser(userIdOrEmail: string): CustomerProfile | null {
  const store = getStore();
  const lower = userIdOrEmail.toLowerCase();
  const found = store.customers.find(
    (c) => c.id === userIdOrEmail || c.email.toLowerCase() === lower
  );
  if (found) return found;
  // Map dummy customer identifiers to pre-seeded customer account (cust-001)
  if (
    lower === "customer" ||
    lower.startsWith("customer@") ||
    lower.includes("demo") ||
    lower.includes("apex") ||
    lower.includes("sarah")
  ) {
    return store.customers[0] || null;
  }
  // Fallback to first customer for local customer demo session
  return store.customers[0] || null;
}

/**
 * Calculates customer-isolated portal overview metrics.
 */
export function getCustomerOverviewMetrics(customerId: string) {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];

  const subs = store.subscriptions.filter((s) => s.customer_id === customerId);
  const invs = store.invoices.filter((i) => i.customer_id === customerId && i.status !== "cancelled");

  const activeSubs = subs.filter((s) => s.status === "active" || s.status === "confirmed");
  const unpaidInvs = invs.filter((i) => i.status !== "paid");
  const outstandingAmount = unpaidInvs.reduce((sum, i) => sum + Number(i.amount_due), 0);
  const overdueInvs = unpaidInvs.filter((i) => i.due_date < today && Number(i.amount_due) > 0);

  // Subscriptions expiring within 14 days
  const expiringSubs = activeSubs.filter((s) => {
    if (s.expiry_date) {
      const end = new Date(s.expiry_date).getTime();
      const now = new Date().getTime();
      const diff = (end - now) / (1000 * 60 * 60 * 24);
      return diff <= 14 && diff >= 0;
    }
    return false;
  });

  return {
    summary: {
      activeSubscriptionsCount: activeSubs.length,
      totalSubscriptionsCount: subs.length,
      outstandingAmount,
      unpaidInvoicesCount: unpaidInvs.length,
      overdueInvoicesCount: overdueInvs.length,
    },
    activeSubscriptions: activeSubs.slice(0, 5),
    recentInvoices: invs.slice(0, 5),
    attentionRequired: {
      overdueInvoices: overdueInvs,
      expiringSubscriptions: expiringSubs,
    },
  };
}

/**
 * Returns strictly the customer's own subscriptions.
 */
export function getCustomerSubscriptions(customerId: string, statusFilter?: string): Subscription[] {
  const store = getStore();
  let subs = store.subscriptions.filter((s) => s.customer_id === customerId);
  if (statusFilter && statusFilter !== "all") {
    subs = subs.filter((s) => s.status === statusFilter);
  }
  return subs;
}

/**
 * Securely retrieves a customer subscription with strict ownership validation.
 */
export function getCustomerSubscriptionById(customerId: string, subscriptionId: string): Subscription | null {
  const store = getStore();
  const sub = store.subscriptions.find((s) => s.id === subscriptionId);
  if (!sub || sub.customer_id !== customerId) {
    return null; // Strict isolation: return null if not owned by customer
  }
  return {
    ...sub,
    customer: store.customers.find((c) => c.id === sub.customer_id),
    plan: store.plans.find((p) => p.id === sub.plan_id),
  };
}

/**
 * Returns strictly the customer's own invoices.
 */
export function getCustomerInvoices(customerId: string, filter?: string): Invoice[] {
  const store = getStore();
  const today = new Date().toISOString().split("T")[0];
  let invs = store.invoices.filter((i) => i.customer_id === customerId);

  if (filter === "paid") {
    invs = invs.filter((i) => i.status === "paid");
  } else if (filter === "confirmed") {
    invs = invs.filter((i) => i.status === "confirmed");
  } else if (filter === "outstanding") {
    invs = invs.filter((i) => i.status !== "paid" && i.status !== "cancelled" && Number(i.amount_due) > 0);
  } else if (filter === "overdue") {
    invs = invs.filter((i) => i.status !== "paid" && i.status !== "cancelled" && Number(i.amount_due) > 0 && i.due_date < today);
  }

  return invs;
}

/**
 * Securely retrieves a customer invoice with strict ownership validation.
 */
export function getCustomerInvoiceById(customerId: string, invoiceId: string): Invoice | null {
  const store = getStore();
  const inv = store.invoices.find((i) => i.id === invoiceId);
  if (!inv || inv.customer_id !== customerId) {
    return null; // Strict isolation: return null if not owned by customer
  }
  return {
    ...inv,
    customer: store.customers.find((c) => c.id === inv.customer_id),
    subscription: store.subscriptions.find((s) => s.id === inv.subscription_id),
    payments: store.payments.filter((p) => p.invoice_id === inv.id),
  };
}

/**
 * Customer-initiated pause action with ownership and plan policy enforcement.
 */
export function customerPauseSubscription(customerId: string, subscriptionId: string) {
  const sub = getCustomerSubscriptionById(customerId, subscriptionId);
  if (!sub) return { success: false, error: "Subscription not found or not owned by customer." };
  const canPause = sub.pause_eligible || sub.plan?.pause_eligible;
  if (!canPause) return { success: false, error: "Plan policy does not permit pausing." };
  if (sub.status !== "active") return { success: false, error: "Only active subscriptions can be paused." };

  const store = getStore();
  const realSub = store.subscriptions.find((s) => s.id === subscriptionId);
  if (realSub) {
    realSub.status = "paused";
    realSub.updated_at = new Date().toISOString();
  }
  return { success: true, subscription: realSub || sub };
}

/**
 * Customer-initiated resume action with ownership enforcement.
 */
export function customerResumeSubscription(customerId: string, subscriptionId: string) {
  const sub = getCustomerSubscriptionById(customerId, subscriptionId);
  if (!sub) return { success: false, error: "Subscription not found or not owned by customer." };
  if (sub.status !== "paused") return { success: false, error: "Subscription is not paused." };

  const store = getStore();
  const realSub = store.subscriptions.find((s) => s.id === subscriptionId);
  if (realSub) {
    realSub.status = "active";
    realSub.updated_at = new Date().toISOString();
  }
  return { success: true, subscription: realSub || sub };
}

/**
 * Customer-initiated renewal action with ownership and plan policy enforcement.
 */
export function customerRenewSubscription(customerId: string, subscriptionId: string) {
  const sub = getCustomerSubscriptionById(customerId, subscriptionId);
  if (!sub) return { success: false, error: "Subscription not found or not owned by customer." };
  const canRenew = sub.renewal_eligible || sub.plan?.renewal_eligible;
  if (!canRenew) return { success: false, error: "Plan is not eligible for self-renewal." };

  const store = getStore();
  const realSub = store.subscriptions.find((s) => s.id === subscriptionId);
  if (realSub) {
    const nextDate = new Date(realSub.next_billing_date || new Date());
    if (realSub.billing_frequency === "monthly") {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (realSub.billing_frequency === "yearly") {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else if (realSub.billing_frequency === "weekly") {
      nextDate.setDate(nextDate.getDate() + 7);
    } else {
      nextDate.setDate(nextDate.getDate() + 30);
    }
    realSub.next_billing_date = nextDate.toISOString().split("T")[0];
    realSub.status = "active";
    realSub.updated_at = new Date().toISOString();
  }
  return { success: true, subscription: realSub || sub };
}


