# Project Context: Brightloop Software Subscription Management System

## 1. Executive Summary

**Brightloop Software** is a business software company offering products and services on a subscription basis (specifically focused on data analysis services and software). Customers range from small businesses on monthly subscriptions to large enterprise accounts on annual contracts with multiple seats and add-on services.

Currently, Brightloop's billing operations are fragmented and fragile:
- Subscriptions are tracked manually in spreadsheets.
- Renewals are remembered informally, resulting in missed revenue.
- Invoices are drafted manually each month.
- Payments are manually reconciled against raw bank statements.
- Financial reporting requires days of manual work at the end of each quarter.

The goal of this project is to build a unified, automated **Subscription Management System** that serves as Brightloop's operational backbone—covering everything from product setup and quotation to automated billing, payment tracking, customer self-service, and financial analytics.

---

## 2. Key Business Scope & Boundaries

- **Single-Company Platform**: This application is strictly an internal operational management platform for **Brightloop Software** itself. It is **not** a multi-tenant platform for external companies to manage their own businesses.
- **Customer Facing vs. Internal Operations**:
  - **Landing Page**: Public marketing surface tailored to Brightloop's target customers (offering data analysis software/services, transparent pricing, and self-signup).
  - **Admin & Staff Workspace**: Authenticated internal dashboard for business operations.
  - **Customer Portal**: Self-service portal where authenticated customers manage their active subscriptions, view invoices, and track payment history.

---

## 3. User Roles & Access Hierarchy

1. **Admin (Superuser)**
   - Manages complete business configuration: Products, Variants, Plans, Tax Rules, and Discount Codes.
   - Manages internal team members (only Admins can invite or create Staff accounts).
   - Oversees all billing runs, manual adjustments, invoice overrides, and full financial reporting.

2. **Internal Staff (Operations & Sales)**
   - Day-to-day handling: prepares quotes from templates, manages subscriptions, confirms or cancels invoices, records offline/bank payments, and tracks overdue accounts.
   - Restricted from altering core tax rules, discount rules, or creating new staff accounts.

3. **Customer (Subscriber)**
   - Registers with email and secure password (>8 characters, uppercase, lowercase, special character).
   - Accesses the self-service **Customer Portal**.
   - Views their active plans, subscriptions, line items, renewal dates, and payment history.
   - Downloads/prints invoices and updates payment details.

---

## 4. The 12 Interconnected Subsystems

1. **User Registration & Authentication**: Secure signup, password policies, email-based password reset, role-based access control (Admin, Staff, Customer).
2. **Product Management**: Products with base pricing, cost, notes, and variants (e.g., brand or tier adjustments).
3. **Plan Management**: Billing cadences (daily, weekly, monthly, yearly), minimum quantities, validity periods, and lifecycle rules (auto-close, pause, renew).
4. **Quotation Management**: Quotation templates with pre-configured plans and product lines, set validity periods, and one-click quote-to-subscription conversion.
5. **Subscription Management**: Full subscription lifecycle tracking (`Draft` → `Quotation` → `Confirmed` → `Active` → `Closed`), itemized line items, quantities, and dates.
6. **Tax Management**: Flexible tax rules applied automatically to subscription lines and invoices.
7. **Discount Management**: Fixed-amount or percentage discounts with qualification rules (min purchase/quantity, usage limits, expiration dates) automatically applied to next invoices.
8. **Invoice & Billing Management**: Automated billing day runs generating customer invoices with taxes, discounts, and totals pre-calculated. State transitions (`Draft` → `Confirmed` → `Paid`). Strict idempotency to prevent double-billing.
9. **Payment Management**: Recording payments against invoices across multiple payment methods with dates, notes, and outstanding balance tracking.
10. **Customer Portal**: Direct customer self-service for subscription visibility and invoice downloads.
11. **Financial Dashboard & Reporting**: Real-time metrics: Active subscriptions, MRR/ARR, collected revenue, outstanding accounts receivable, and overdue aging with sub-2-second response times.
12. **Performance & Scalability**: Optimized database indexes, idempotent cron jobs, efficient pagination, and resilient transaction handling.

