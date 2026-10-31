# Development Plan: Brightloop Software

This plan outlines the sensible, dependency-aware implementation phases for Brightloop Software's Subscription Management System.

---

## Phased Implementation Roadmap

```
+-------------------------------------------------------------+
| Phase 1: Public Marketing & Landing Page                    |
| - Geist design system landing page (Data analysis services) |
| - High-conversion pricing tiers, hero mesh gradient, CTA    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 2: Core Foundation & Authentication System            |
| - Next.js project initialization & Supabase SSR setup       |
| - User registration (password rules), Login, Password Reset |
| - RBAC: Admin, Internal Staff, Customer with RLS            |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 3: Catalog, Plans, Taxes & Discounts                  |
| - Products with pricing, cost, notes, and variants (Odoo)   |
| - Plans (daily/weekly/monthly/yearly, policies)             |
| - Tax management & Admin discount rules engine              |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 4: Quotations & Subscription Management               |
| - Quotation templates and validity tracking                 |
| - Subscription lifecycle: Draft -> Quote -> Confirmed ->    |
|   Active -> Closed                                          |
| - Line items: products, quantities, tax, pricing            |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 5: Billing & Invoicing Engine                         |
| - Automated billing day generation (idempotent runs)        |
| - Invoice lifecycle: Draft -> Confirmed -> Paid             |
| - Tax & discount calculation, printable/downloadable views  |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 6: Payment Recording & Receivables Management         |
| - Payment logging (method, amount, date, notes)             |
| - Overdue chasing and status reconciliation                 |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 7: Customer Self-Service Portal                       |
| - Subscriber portal for active subscriptions                |
| - Direct invoice review, payment history & downloads        |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 8: Financial Dashboard, Analytics & Reporting         |
| - Real-time metrics: Active subs, MRR, ARR, overdue revenue |
| - Summary views, filters, <2 second response optimizations  |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| Phase 9: Verification, Hardening & Final Polish             |
| - Automation tool & screenshot verification                 |
| - Database indexing & load performance verification         |
+-------------------------------------------------------------+
```

---

## Detailed Phase Breakdown

### Phase 1: Public Marketing & Landing Page
- Implement the customer-facing landing page showcasing Brightloop Software's data analysis software and subscription services.
- Adhere strictly to `DESIGN.md`:
  - Hero mesh gradient bloom, display typography with negative tracking.
  - Black pill marketing CTAs (`button-primary`), hairline-bordered feature cards.
  - Transparent pricing section reflecting subscription tiers.

### Phase 2: Core Foundation & Authentication System
- Set up foundational Next.js App Router structure and Supabase integration.
- Database schema: `public.profiles` linked to Supabase Auth with roles (`admin`, `staff`, `customer`).
- Customer registration with validation (>8 characters, uppercase, lowercase, special character).
- Password reset email workflow.
- Route protection middleware routing users to Admin Dashboard, Staff view, or Customer Portal based on role.

### Phase 3: Catalog, Plans, Taxes & Discounts
- Product catalog: base pricing, cost, notes, and attribute variants (e.g., Odoo brand adding 560 to price).
- Plan definitions: billing frequencies (daily, weekly, monthly, yearly), minimum quantities, availability windows, and termination policies (auto-close, pause, renew).
- Tax rules: rates and applicability logic.
- Discount engine: Admin-only rule creation (fixed amount/percentage, minimum threshold, validity dates, usage limits).

### Phase 4: Quotations & Subscription Management
- Quotation templates with preset plans and product line items.
- Quote expiration management and one-click conversion to active subscription.
- Subscription number generation and state machine (`Draft` → `Quotation` → `Confirmed` → `Active` → `Closed`).
- Itemized lines tracking unit prices, quantities, taxes, and amounts.

### Phase 5: Billing & Invoicing Engine
- Automated billing day trigger creating draft invoices from active subscriptions.
- Idempotent execution preventing duplicate billing or skipped cycles.
- Invoice state flow (`Draft` → `Confirmed` → `Paid`).
- Clean, printable invoice template formatted according to `DESIGN.md`.

### Phase 6: Payment Recording & Receivables Management
- Multi-method payment capture (bank transfer, credit card, manual entry) with transaction references and dates.
- Balance reconciliation against invoices.
- Outstanding and overdue invoice tracking.

### Phase 7: Customer Self-Service Portal
- Dedicated `(portal)` route for authenticated subscribers.
- View active and past subscriptions, line item details, and renewal dates.
- Access and download invoices without needing manual staff assistance.

### Phase 8: Financial Dashboard & Reporting
- Executive dashboard for Admin and Staff.
- Key financial indicators: Active Subscriptions, MRR, ARR, Total Revenue, Unpaid/Overdue Receivables.
- Date and status filtering, response time kept under two seconds via indexed PostgreSQL queries and materialized views if needed.

### Phase 9: Verification, Hardening & Final Polish
- Visual regression check and responsiveness verification using browser automation and screenshots.
- End-to-end testing of the full subscription lifecycle: signup → quote → active subscription → recurring invoice → payment reconciliation.

