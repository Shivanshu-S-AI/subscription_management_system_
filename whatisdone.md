# What Is Done — Brightloop Software Project Progress

This document serves as the single tracking record for all past ("old") and current ("new") system changes. Any collaborator or agent working on this codebase should consult and update this file to maintain full context and continuity.

---

## 1. Project Context & Objectives

- **Product:** Brightloop Software — a subscription management system for an internal business selling data analysis software and services.
- **Problem Solved:** Unifies fragmented operations (previously spreadsheets, manual invoicing, untracked renewals, and manual quarterly reports) into a single modular platform.
- **Design Standard:** Strict adherence to `DESIGN.md` (Vercel Geist aesthetic: `#fafafa` canvas, `#171717` primary ink, hairline `#ebebeb` borders, black pill marketing CTAs, 6px rounded app controls, and subtle hero mesh gradient).
- **Core User Roles:**
  1. **Admin:** System control, staff management, tax & discount rules, financial reporting.
  2. **Internal Staff:** Day-to-day operations, quotation templates, customer orders, invoice management.
  3. **Customer:** Self-service portal for active subscriptions, invoices, and billing history.

---

## 2. Chronological System Changes

### Milestone 1: Phase 0 — Foundation & Architecture
- **Workspace Reset & Cleanup:**
  - Removed outdated experimental scaffolding while preserving core requirements (`Subscription_Management_System (1).pdf` and `DESIGN.md`).
- **Core Foundational Documentation:**
  - `PROJECT_CONTEXT.md`: Defined the 12 business subsystems, operational boundaries, and single-tenant company context.
  - `ARCHITECTURE.md`: Established the Modular Monolith architecture pattern, Supabase PostgreSQL with RLS, state machines, and Next.js App Router route hierarchy (`(marketing)`, `(auth)`, `(admin)`, `(portal)`).
  - `DEVELOPMENT_PLAN.md`: Formulated the 9-phase sequential roadmap starting with the public landing page.
  - `AGENTS.md`: Defined operational rules for AI agents, including the balanced screenshot/automation tool verification rule.
- **Git Repository Setup:**
  - Initialized Git repository on branch `main`.
  - Connected remote: `https://github.com/Shivanshu-S-AI/subscription_management_system_`.
  - Initial commit: `9bfb6fb` (*docs: establish project foundation, context, and architecture for Phase 0*).

---

### Milestone 2: Phase 1 — Public Landing Page
- **Next.js 15 & Tailwind Configuration:**
  - Configured `package.json`, `tsconfig.json`, `postcss.config.mjs`, and `next.config.ts`.
  - Configured `tailwind.config.ts` mapping 100% of the Geist design tokens from `DESIGN.md` (colors, border radii, display letter spacings, whisper & floating shadows).
  - Created `src/app/globals.css` with the multi-stop hero mesh gradient and typography baseline.
- **UI Components Implemented:**
  - `src/components/layout/navbar.tsx`: Header with brand loop icon, anchor links (`#capabilities`, `#features`, `#pricing`, `#faq`), 6px app button CTAs (`Log In`, `Get Started`), and mobile responsive drawer.
  - `src/components/landing/hero.tsx`: `DATA ANALYSIS, REIMAGINED` eyebrow pill, headline *"Turn your data into decisions."*, value proposition, marketing pill CTAs (`Start Free Trial`, `Learn More`), and an analytics engine status card.
  - `src/components/landing/capabilities.tsx`: 4 hairline cards for *Data Exploration*, *Data Visualization*, *Pattern Discovery*, and *Reporting & Insights*.
  - `src/components/landing/how-it-works.tsx`: 4-step workflow (*Connect*, *Explore*, *Analyse*, *Share*).
  - `src/components/landing/pricing.tsx`: Monthly / Annual billing toggle with 20% discount badge and tiered plan cards (*Starter*, *Professional [Highlighted]*, *Enterprise*).
  - `src/components/landing/faq.tsx`: Interactive 6-item accordion covering key product questions.
  - `src/components/landing/cta-section.tsx`: High-conversion closing banner with trial assurances.
  - `src/components/layout/footer.tsx`: Clean categorized links, copyright, and operational status badge.
- **Verification & Testing:**
  - Verified Next.js production build (`next build`) — static routes generated cleanly with zero lint or TypeScript errors.
  - Verified with Chrome DevTools at both desktop (1920×1080) and mobile (390×844) viewports.
  - Validated responsive menu toggle interaction and element alignment.
- **Git Commit:**
  - Commit `4f66379` (*feat(landing): implement public data analysis landing page strictly following DESIGN.md*).

---

### Milestone 3: Remote Sync & Collaboration
- **Pulled Latest Changes from Team:**
  - Merged commit `60f6ad1` (*docs: add project README with overview, features, and architecture*) via fast-forward.
  - Added comprehensive `README.md` to repository.

---

### Milestone 4: Phase 2 — Complete Authentication & RBAC System
- **Supabase PostgreSQL & SSR Architecture:**
  - Installed `@supabase/supabase-js` and `@supabase/ssr`.
  - Configured typed Supabase clients:
    - `src/lib/supabase/client.ts`: Browser client for client-side interactions.
    - `src/lib/supabase/server.ts`: Server client with App Router cookie handling.
    - `src/lib/supabase/admin.ts`: Service-role client for secure server-side role assignment.
    - `src/lib/supabase/middleware.ts` & `middleware.ts`: Next.js middleware refreshing user sessions and enforcing role-based route boundaries.
- **Database Schema & RLS Migrations:**
  - Created `supabase/migrations/20261031_001_auth_profiles.sql`:
    - `public.user_role` enum (`'admin'`, `'staff'`, `'customer'`).
    - `public.profiles` table linked via foreign key to `auth.users(id)`.
    - Automated trigger `handle_new_user()` ensuring every public registration is assigned the `'customer'` role on the database layer.
    - Strict Row Level Security (RLS) policies preventing privilege escalation and securing user profile reads/updates.
- **Strict Validation & Business Logic (`src/modules/auth/`):**
  - `src/modules/auth/validation.ts`: Full password policy enforcement (>8 characters, uppercase, lowercase, special character) and email syntax validation.
  - `src/modules/auth/actions.ts`: Server actions for `signUpCustomerAction`, `signInAction`, `internalSignInAction`, `forgotPasswordAction`, `resetPasswordAction`, and `signOutAction`.
  - `src/modules/auth/service.ts`: Helpers for session retrieval and role destination mapping.
- **Frontend Pages & Shared UI Components:**
  - `src/components/auth/auth-card.tsx`: Minimal Geist card surface adhering to `DESIGN.md`.
  - `src/components/auth/password-requirements.tsx`: Real-time interactive requirements indicator for customers creating or updating passwords.
  - `src/app/(auth)/signup/page.tsx`: Customer registration route (`/signup`) with client & server validation and duplicate email handling.
  - `src/app/(auth)/login/page.tsx`: Customer login route (`/login`) with remember-me, forgot-password link, and post-auth role redirection.
  - `src/app/(auth)/forgot-password/page.tsx`: Password recovery route (`/forgot-password`) with confirmation screen.
  - `src/app/(auth)/reset-password/page.tsx`: Dedicated password reset route (`/reset-password`) with token verification, expired link detection, and error banners.
  - `src/app/(auth)/internal-login/page.tsx`: Shared login route (`/internal-login`) for Admin and Internal Staff with access restriction checks.
  - Role Destination Placeholders:
    - `src/app/(admin)/admin/page.tsx`: Verified Admin workspace placeholder with role badge and sign-out.
    - `src/app/(admin)/staff/page.tsx`: Verified Staff workspace placeholder with operational permissions.
    - `src/app/(portal)/portal/page.tsx`: Verified Customer Portal placeholder with subscriber details.
- **Landing Page Navigation Integration:**
  - Connected `Log In` → `/login`.
  - Connected `Get Started` and `Start Free Trial` (Navbar, Hero, CTA section) → `/signup`.
  - Added discreet `Admin / Staff Login` link in footer → `/internal-login`.
- **Verification & Testing:**
  - Automated unit test suite `tests/auth-validation.test.mjs` verifying 8 validation test cases (all passing).
  - Production build `next build` executed with 100% success (zero lint or type errors).
  - All routes (`/login`, `/signup`, `/forgot-password`, `/reset-password`, `/internal-login`) verified with HTTP 200 responses.

---

### Milestone 5: Phase 1 — Complete Admin Workspace (Brightloop Subscription Management System)
- **Database Schema Migration (`supabase/migrations/20261031_002_admin_workspace_schema.sql`):**
  - Designed and deployed comprehensive relational schema with strict foreign keys and cascading rules:
    - `customers`: Company name, contact name, email, phone, billing address, tax identification number, and status.
    - `products` & `product_variants`: Product catalog with type, sales price, cost price, notes, and attribute-based price-adjusting variants.
    - `plans`: Recurring frequencies (`daily`, `weekly`, `monthly`, `yearly`), min quantity, availability dates, and lifecycle policy flags (`auto_close`, `early_close_eligible`, `pause_eligible`, `renew_eligible`).
    - `taxes`: Tax rules with percentages and default rule identifier.
    - `discounts`: Discount rules supporting `fixed` or `percentage`, min purchase, min quantity, validity windows, max usage limits, and application scopes.
    - `quotation_templates` & `quotation_template_items`: Reusable sales configurations with default durations and bundled products.
    - `quotations` & `quotation_items`: Draft, sent, approved, and converted quotations with locked-in pricing.
    - `subscriptions` & `subscription_items`: Complete subscription state machine (`draft`, `quotation`, `confirmed`, `active`, `paused`, `closed`) with plan-governed action rules.
    - `invoices` & `invoice_items`: Invoices (`draft`, `confirmed`, `paid`, `cancelled`) with composite unique constraint `(subscription_id, billing_period_start, billing_period_end)` guaranteeing billing run idempotency.
    - `payments`: Immutable payment transaction records linked to invoices with automatic balance reduction.
  - Enabled Row Level Security (RLS) across all operational tables with granular role checks for `admin`, `staff`, and `customer`.

- **Domain Types & In-Memory Fallback Store (`src/types/admin.ts`, `src/lib/data/store.ts`):**
  - Created complete TypeScript domain interfaces for every business entity.
  - Built an enterprise-grade in-memory and Supabase-synced repository pattern with realistic seed data, calculation utilities, and business rule validators:
    - Multi-entity cross-domain global search matching terms across customers, subscriptions, invoices, quotes, and products.
    - Live KPI derivation:
      - *Active Subscriptions*: count of subscriptions with status `active`.
      - *Revenue Received*: strictly sum of completed payments (not billed totals).
      - *Outstanding Amount*: total unpaid balance across confirmed and open invoices.
      - *Overdue Invoices*: count of unpaid invoices where `due_date < current_date`.
    - Business rule enforcement: Early close or pause operations are rejected if the linked plan has `early_close_eligible` or `pause_eligible` disabled.
    - Billing run engine: Scans active subscriptions, calculates period dates, verifies idempotency constraint to avoid double billing, generates invoice records, and creates line item snapshots.
    - Payment recording: Automatically deducts payment amounts from invoice balances and transitions invoice state to `paid` once balance reaches `0`.

- **Modular Domain Action Handlers:**
  - `src/modules/products/actions.ts`: Create and update products and variants.
  - `src/modules/plans/actions.ts`: Create and update subscription plans and policy flags.
  - `src/modules/taxes/actions.ts`: Create and update tax rules.
  - `src/modules/discounts/actions.ts`: Create discount codes and validation rules.
  - `src/modules/quotations/actions.ts`: Create quotation templates, draft quotations, and convert quotations to subscriptions with locked-in rates.
  - `src/modules/subscriptions/actions.ts`: Create subscriptions, update lifecycle status with plan validation (pause, resume, renew, close).
  - `src/modules/billing/actions.ts`: Execute automated billing run.
  - `src/modules/invoices/actions.ts`: Invoice confirmation, payment status transitions, and cancellation.
  - `src/modules/payments/actions.ts`: Record incoming payments against invoices and settle balances.
  - `src/modules/team/actions.ts`: Provision new internal staff members.

- **Admin Workspace Layout & UI Architecture:**
  - `src/components/admin/admin-sidebar.tsx`: Grouped navigation covering Overview, Sales & Customers, Subscriptions, Catalog & Pricing, Finance, Management, and Account with active route styling.
  - `src/components/admin/admin-header.tsx`: Header chrome with dynamic breadcrumbs, quick role badge, and interactive real-time global search dropdown modal.
  - `src/components/admin/print-button.tsx`: Client-side print trigger for invoices.
  - `src/app/(admin)/admin/layout.tsx`: Root admin layout providing consistent sidebar, header, and content canvas.

- **Completed Admin UI Modules (All 35 Next.js Routes Compiled):**
  - **Overview Dashboard (`/admin`):** 4 real-time KPI metrics, quick actions toolbar, recent subscriptions list, overdue invoices alert widget, and active system alerts.
  - **Customers Directory & 360° Profile (`/admin/customers`, `/admin/customers/[id]`):** Searchable customer table with status filters, customer profile, and linked views of their active subscriptions, quotations, invoices, and payment receipts.
  - **Product & Variant Catalog (`/admin/products`, `/admin/products/new`, `/admin/products/[id]`):** Catalog with sales price, cost price, margin calculation, and dynamic variant configurations (e.g., Odoo brand +$560 price adjustment).
  - **Plan Management (`/admin/plans`, `/admin/plans/new`, `/admin/plans/[id]`):** Plan creator with daily/weekly/monthly/yearly frequencies, availability date ranges, min quantities, and policy toggles (auto-close, early-close, pause, renew).
  - **Tax Management (`/admin/taxes`, `/admin/taxes/new`):** Tax rules table with percentages and default rule flag.
  - **Discount Management (`/admin/discounts`, `/admin/discounts/new`):** Discount rule configuration with percentage/fixed types, min spend, usage limits, and product scope.
  - **Quotation Templates (`/admin/quotation-templates`, `/admin/quotation-templates/new`):** Reusable quote templates with standard durations and preselected plans.
  - **Quotations (`/admin/quotations`, `/admin/quotations/new`, `/admin/quotations/[id]`):** Quotation authoring, expiration validation, total calculations, and one-click conversion to confirmed subscriptions.
  - **Subscription Lifecycle (`/admin/subscriptions`, `/admin/subscriptions/new`, `/admin/subscriptions/[id]`):** Comprehensive subscription management with line items, billing schedule, and plan-validated action buttons (Pause, Resume, Renew, Close).
  - **Recurring Billing Engine (`/admin/billing`):** Administrative billing execution center with pending cycle detection, one-click billing run, and audit logs.
  - **Invoices & Printable Document (`/admin/invoices`, `/admin/invoices/[id]`, `/admin/invoices/[id]/print`):** Full invoice details, payment reconciliation history, status updates, and print-optimized document view.
  - **Payment Tracking (`/admin/payments`, `/admin/payments/new`):** Payment log with method, reference, and invoice balance settlement.
  - **Financial & Operational Reports (`/admin/reports`):** Executive summary metrics, revenue breakdown by frequency and product, and accounts receivable aging buckets (Current, 1-30, 31-60, 60+ days).
  - **Team Management (`/admin/team`, `/admin/team/new`):** Admin-only staff account provisioning.
  - **Admin Account (`/admin/account`):** Profile settings and quick sign-out.

- **Verification & Testing:**
  - Executed `npm run build`: verified all 35 routes compile without TypeScript or bundle errors.
  - Automated visual verification via Chrome DevTools MCP:
    - Captured desktop screenshots (1440×900) across `/admin`, `/admin/customers`, `/admin/subscriptions`, and `/admin/invoices`.
    - Captured mobile screenshot (390×844) validating responsive layout, cards, and navigation.
  - Confirmed strict adherence to `DESIGN.md` (Geist tokens: `#fafafa` canvas, `#ffffff` card surfaces, `#171717` ink, `#ebebeb` borders, 6px rounded controls).

---

### Milestone 6: Phase 2 — Complete Staff Workspace (Brightloop Subscription Management System)
- **Role & Authorization Architecture:**
  - Implemented dedicated protected Staff Workspace under route hierarchy `/staff/*` with server-side layout authorization (`src/app/(staff)/staff/layout.tsx`).
  - Strict role check: Authenticated users without `staff` or `admin` role are redirected to `/portal`; unauthenticated visitors are redirected to `/internal-login?redirect=/staff`.
  - Administrative Isolation: Attempts by staff to navigate to `/admin/*` automatically trigger a server-side redirect to `/staff`.
  - Protected Action Handlers: Admin-only server actions (`products`, `plans`, `taxes`, `discounts`, `team`, `billing`) enforce server-side role verification (`role === "admin"`) and reject staff invocation with explicit unauthorized exceptions.

- **Staff Navigation & Global Search Chrome (`src/components/staff/`):**
  - `src/components/staff/staff-sidebar.tsx`: Clean, focused operational sidebar covering Overview, Customers, Quotations, Subscriptions, Invoices, Payments, Operational Reports, and My Account. Omits admin configuration modules.
  - `src/components/staff/staff-header.tsx`: Header chrome with mobile menu drawer toggle, dynamic breadcrumbs, `STAFF` role badge, and integrated real-time global search modal routing directly to `/staff/...` entities.
  - `src/components/staff/staff-layout-client.tsx`: Responsive client wrapper maintaining mobile sidebar states.

- **Completed Staff UI Modules (All 54 Next.js Routes Compiled):**
  - **Overview Dashboard (`/staff`):**
    - Answers the operational question: *"What operational work needs attention?"*
    - 4 Real-Time KPI Cards: Active Subscriptions, Invoices Awaiting Confirmation, Outstanding Invoices (with total balance), and Overdue Invoices (with past-due amount).
    - Quick Actions Bar: Find Customer, Create Quotation, Search Subscriptions, Open Invoices, Record Payment.
    - Actionable Work Queues: Overdue Invoices with 1-click payment recording; Draft Invoices pending review; Subscriptions requiring attention.
    - Real-Time Feed: Recent payment receipts, active subscription status changes, and prepared quotations.
  - **Customer Directory & 360° Profile (`/staff/customers`, `/staff/customers/[id]`):**
    - Customer search by name, email, or company.
    - Customer list with active subscriptions count, invoices count, and balance due.
    - 360-degree customer detail view linking customer records to their Subscriptions, Quotations, Invoices, and Payment Receipts.
    - Contextual action to draft a quotation directly for the customer.
  - **Customer Quotations (`/staff/quotations`, `/staff/quotations/new`, `/staff/quotations/[id]`):**
    - Quotation preparation wizard: Select customer, pick offer template or custom offer, select product and brand/edition variant (e.g. Odoo brand +$560), configure quantity, tax rate, and validity days.
    - Status filtering: All, Draft, Sent, Approved, Converted, Expired.
    - Quotation detail with price snapshot, tax/discount calculation, and one-click conversion to confirmed subscriptions.
  - **Subscription Lifecycle (`/staff/subscriptions`, `/staff/subscriptions/[id]`):**
    - Subscriptions listing with status filtering (Active, Confirmed, Paused, Draft, Closed).
    - Subscription detail with line items, contracted recurring charge, and linked invoices history.
    - Plan-Governed Lifecycle Actions: Confirm, Activate, Pause (validated against `plan.pause_eligible`), Resume, Renew (validated against `plan.renewal_eligible`), and Close Early (validated against `plan.early_close_eligible`).
  - **Invoice Management & Actions (`/staff/invoices`, `/staff/invoices/[id]`, `/staff/invoices/[id]/print`):**
    - Status filters: All, Overdue, Outstanding, Draft, Confirmed, Paid, Cancelled.
    - Required Staff Actions: Confirm draft invoice, Cancel invoice, Send invoice to customer (with sent timestamp), and Print invoice.
    - Dedicated printable invoice document (`/staff/invoices/[id]/print`) with print-optimized CSS.
    - Strict financial invariant: Invoices can only transition to `Paid` via genuine recorded payment transactions.
  - **Payment Reconciliation (`/staff/payments`, `/staff/payments/new`):**
    - Replaces manual spreadsheet and bank statement matching: Staff record incoming bank wires, cards, or cheques against specific unpaid invoices.
    - Selected invoice details pill showing total invoiced and remaining balance due.
    - Validates payment amount, automatically deducts from invoice balance, and marks invoice as `paid` upon full settlement.
  - **Operational Reports & Collections Aging (`/staff/reports`):**
    - Read-only operational dashboard to chase receivables and monitor collections.
    - Accounts Receivable Aging Schedule (Current, 1–30 Days, 31–60 Days, 60+ Days Overdue).
    - Actionable collections queue with customer and status filters.
  - **My Account (`/staff/account`):**
    - Staff profile details, user ID, email, role badge ("Role: Internal Staff"), permissions boundary card (permitted operations vs administrative restrictions), and sign-out.

- **Verification & Testing:**
  - `npm run build`: verified all 54 routes compile without TypeScript or bundle errors.
  - Server-Side Authorization: Verified via HTTP 307 headers that staff cannot access `/admin/*` and unauthenticated visitors cannot access `/staff/*`.
  - Automated visual verification via Chrome DevTools MCP:
    - Captured desktop screenshots (1440×900) across `/staff`, `/staff/invoices`, and `/staff/reports`.
    - Captured mobile screenshot (390×844) validating responsive layout, cards, and navigation.
  - Strict adherence to `DESIGN.md` (Geist tokens: `#fafafa` canvas, `#ffffff` card surfaces, `#171717` ink, `#ebebeb` borders, 6px rounded controls).

---

### Milestone 7: Phase 3 — Complete Customer Portal
- **Objective:**
  - Build the dedicated, role-isolated Customer Portal for Brightloop Software's Subscription Management System according to `Subscription_Management_System (1).pdf` and `DESIGN.md`.
  - Provide authenticated subscribers with clear visibility into their personal active subscriptions, line items, contracted pricing, payment receipts, and invoice records without contacting customer support.
  - Implement strict customer-level data isolation: A customer must only ever access their own data. Any attempt to access another customer's ID returns HTTP 404.
  - Permit controlled self-service lifecycle actions (Pause, Resume, Renew) governed strictly by the subscription's underlying plan policies, while strictly forbidding early cancellation or price manipulation.
  - Mask all internal costs and administrative notes from customer views.

- **Data Query Layer & Server Actions (`src/lib/data/store.ts`, `src/modules/portal/actions.ts`):**
  - `getCustomerForUser(userId)`: Resolves authenticated Supabase profile to customer profile record.
  - `getCustomerOverviewMetrics(customerId)`: Aggregates active subscriptions count, active monthly spend (MRR), total invoices, and outstanding balance due.
  - `getCustomerSubscriptions(customerId)`: Lists all subscriptions belonging strictly to `customerId`.
  - `getCustomerSubscriptionById(id, customerId)`: Returns single subscription or `null` if ownership fails (triggering Next.js `notFound()`).
  - `getCustomerInvoices(customerId)`: Lists customer invoices sorted newest first with balance calculations.
  - `getCustomerInvoiceById(id, customerId)`: Fetches invoice with line items and payment transactions, returning `null` if ownership fails.
  - Server actions in `src/modules/portal/actions.ts`:
    - `customerPauseSubscriptionAction(formData)`: Verifies user session and customer ownership, validates `plan.pause_eligible`, sets status to `paused`, revalidates cache.
    - `customerResumeSubscriptionAction(formData)`: Validates ownership and paused state, resumes subscription to `active`.
    - `customerRenewSubscriptionAction(formData)`: Validates ownership and `plan.renewal_eligible`, extends end date by billing interval (e.g., +1 month), sets status to `active`.

- **Customer Portal Layout & Navigation (`src/app/(portal)/portal/layout.tsx`, `src/components/portal/portal-navbar.tsx`):**
  - Responsive customer navbar matching Geist design language:
    - Left brand section: Brightloop Software logo with rounded pill badge `"Customer Portal"`.
    - Center links: `Overview` (`/portal`), `My Subscriptions` (`/portal/subscriptions`), `My Invoices` (`/portal/invoices`).
    - Right section: Quick actions, customer profile name, email pill, and sign-out button.
    - Mobile drawer with hamburger toggle for full smartphone/tablet responsiveness.
  - Strict server-side layout guard redirecting unauthenticated visitors to `/login`.

- **Customer Pages Implemented:**
  - **Overview (`/portal/page.tsx`):**
    - 4 real-time KPI metric cards: *Active Subscriptions*, *Monthly Recurring*, *Total Invoices*, *Outstanding Balance*.
    - Attention Required banner when unpaid or overdue invoices exist with one-click payment instructions and direct invoice links.
    - Active Subscriptions table with plan badges, recurring price, renewal dates, and status indicators.
    - Recent Invoices table with issue date, due date, invoice amount, balance due, payment status, and view buttons.
  - **My Subscriptions List (`/portal/subscriptions/page.tsx`):**
    - Status filtering tabs: All, Active, Paused, Confirmed, Draft, Closed.
    - Search by subscription number or plan title.
    - Itemized cards with contracted interval, recurring charge, and next billing date.
  - **Subscription Detail (`/portal/subscriptions/[id]/page.tsx`):**
    - Customer-safe view: Displays plan name, billing frequency, start date, next billing date, end date, payment terms (`immediate`, `15_days`, `30_days`, `60_days`).
    - Line items breakdown: Product name, brand/edition variant, quantity, unit price, tax rate, and total (internal cost price and admin notes completely hidden).
    - Permitted lifecycle action controls:
      - *Pause Subscription* button (enabled only when subscription is active and `plan.pause_eligible`).
      - *Resume Subscription* button (enabled only when subscription is paused).
      - *Renew Subscription* button (enabled only when `plan.renewal_eligible`).
      - Informational badges when policies forbid early termination or pausing.
    - Linked invoices history table for this specific subscription with view links.
  - **My Invoices List (`/portal/invoices/page.tsx`):**
    - Status filters: All, Outstanding, Paid, Confirmed, Overdue.
    - Search by invoice number.
    - Outstanding balance summary banner highlighting unpaid balances.
    - Table displaying invoice number, linked subscription, issue date, due date, amount, balance due, payment status, and actions.
  - **Invoice Detail (`/portal/invoices/[id]/page.tsx`):**
    - Itemized invoice breakdown with quantities, unit prices, tax percentages, subtotal, tax amount, and total due.
    - Payment settlement receipts table showing date, transaction reference, payment method (bank wire, credit card), and amount paid.
    - Balance Due card with payment instruction guidance (bank account, wire reference).
    - Quick link to print / export invoice.
  - **Printable Invoice (`/portal/invoices/[id]/print/page.tsx`):**
    - Clean, printable invoice layout styled per `DESIGN.md` with auto-print JavaScript hook and back button.
  - **My Account (`/portal/account/page.tsx`):**
    - Customer profile card with company name, primary contact name, registered email, and customer ID.
    - Billing address details card.
    - Security & Role badge ("Role: Customer (Portal Access Only)").
    - Sign out action.

- **Verification & Testing:**
  - `npm run build`: Compiled all 61 Next.js App Router routes with 0 errors.
  - Strict Customer Data Isolation: Tested cross-customer requests (`cust-001` requesting `sub-002` or `inv-003`); properly returned HTTP 404 (`notFound()`).
  - Role Boundary Enforcement: Verified customer visiting `/admin` or `/staff` is automatically redirected to `/portal` via middleware.
  - Automated visual verification via Chrome DevTools MCP:
    - Captured desktop screenshots (1440×900) across `/portal`, `/portal/subscriptions`, `/portal/subscriptions/sub-001`, `/portal/invoices`, `/portal/invoices/inv-001`, `/portal/invoices/inv-001/print`, and `/portal/account`.
    - Captured mobile screenshot (390×844) validating responsive layout, cards, and mobile navigation drawer.
  - Strict adherence to `DESIGN.md` (Geist tokens: `#fafafa` canvas, `#ffffff` card surfaces, `#171717` ink, `#ebebeb` borders, 6px rounded controls).

---

### Milestone 8: Phase 4 — Cross-System Integration & Baseline QA
- **Objective:**
  - Verify that the Admin workspace, Staff workspace, Customer Portal, backend feature modules, and Supabase database function together as a unified, coherent application.
  - Complete end-to-end business workflow testing (Customer registration → Quotation → Subscription → Recurring Billing → Invoice → Payment → Customer Portal → Financial Reporting).
  - Enforce data consistency, relationship integrity, and database-level RLS policies.
  - Validate financial calculation precision and eliminate floating-point arithmetic errors.
  - Eliminate duplicate billing risks with strict idempotency and lifecycle state machines.

- **System Issues Identified & Resolved:**
  1. **Quotation Conversion Idempotency & Expiration:**
     - *Issue:* Repeated quotation conversion generated duplicate subscriptions for the same commercial quote, and expired quotes were convertible.
     - *Fix:* Added idempotency check in `convertQuotationToSubscription` (returns existing subscription if already converted) and validates `valid_until >= today`, rejecting expired quotes.
  2. **Automated Discount Rule Evaluation Engine:**
     - *Issue:* Discounts were defined in the database/schema but had no evaluation logic in quotation generation or billing.
     - *Fix:* Implemented `evaluateDiscountRule` validating `is_active`, validity windows (`start_date` / `end_date`), usage limits (`times_used < usage_limit`), minimum purchase amounts, minimum quantities, and product applicability for both percentage and fixed discounts.
  3. **Recurring Billing Idempotency & Lifecycle Alignment:**
     - *Issue:* Billing queried active subscriptions without verifying due dates (`next_billing_date <= today`), fixed `periodStart` to initial subscription start, and billed expired contracts.
     - *Fix:* Updated `runRecurringBilling` to filter due subscriptions, auto-close expired contracts with `auto_close === true`, calculate progressive cycle periods, and enforce strict database unique constraint `uq_subscription_billing_period` preventing duplicate invoices.
  4. **Strict Invoice Status Transitions & Accounting Invariant:**
     - *Issue:* Invoices could transition to `paid` via direct status change without creating payment records, distorting revenue metrics. Also allowed cancelling paid invoices.
     - *Fix:* Disallowed setting invoice status to `paid` directly; invoices only transition to `paid` via recorded payment transactions. Disallowed cancelling invoices with recorded payments. Enforced valid state machine transitions: `draft` → `confirmed` → `paid` (via payment) or `cancelled` (if unpaid).
  5. **Payment Recording Validation on Ineligible Invoices:**
     - *Issue:* Payments could be recorded against draft or cancelled invoices, or exceed remaining invoice balances.
     - *Fix:* Rejected payments on cancelled or draft invoices, enforced `amount <= amount_due`, and used decimal-safe arithmetic (`Math.round(... * 100) / 100`) to prevent JavaScript floating point errors.
  6. **Customer Portal Navigation & Sign-Out Routing:**
     - *Issue:* Customer signing out from portal was routed to `/internal-login` instead of public `/login`.
     - *Fix:* Updated `signOutAction` to inspect the user role and redirect customers to `/login` and internal staff/admin to `/internal-login`.
  7. **Customer Portal Self-Service Actions & Plan Policy Checks:**
     - *Issue:* `customerPauseSubscription` and `customerRenewSubscription` failed when underlying plan relations were not populated on raw subscription records.
     - *Fix:* Refactored `getCustomerSubscriptionById` and `getCustomerInvoiceById` to populate plan and customer metadata while preserving strict isolation, and advanced `next_billing_date` upon self-service renewal.
  8. **Customer Database-Level Security (PostgreSQL RLS):**
     - Created `supabase/migrations/20261031_003_customer_portal_rls.sql` providing comprehensive Row Level Security policies for customers on products, plans, subscriptions, subscription lines, invoices, invoice lines, and payments.

- **Automated QA & Test Suite (`tests/cross-system-integration.test.mjs`):**
  - Configured native Node test runner (`npm test`) with 39 passing tests (0 failures, 83ms execution):
    - **Scenario 1:** Customer registration password rules (length, upper, lower, special) & role destinations.
    - **Scenario 2:** Admin catalog creation (software product, variants with +$560 adjustments, annual/monthly plans, tax rules, discount rules).
    - **Scenario 3 & 4:** Staff quotation creation, discount evaluation, quotation conversion, conversion idempotency, expiration rejection, and subscription lifecycle state transitions.
    - **Scenario 5:** Recurring billing invoice generation, critical duplicate billing test (running twice produces 0 duplicate invoices), and auto-close on expired contracts.
    - **Scenario 6:** Invoice operations, draft confirmation, cancellation of unpaid invoices, and rejection of direct 'paid' transition without payment.
    - **Scenario 7:** Payment recording (partial payments, excess rejection, full settlement to 'paid', rejection of payments on cancelled invoices).
    - **Scenario 8:** Financial reporting KPI reconciliation (cash collected strictly matches payments, outstanding balance matches non-cancelled invoices, overdue counts).
    - **Customer Portal:** Strict cross-customer data isolation (Customer A querying Customer B returns `null` / 404), policy-governed self-service pause/resume/renew.

- **Automated Visual Verification via Chrome DevTools MCP:**
  - Captured desktop (1440×900) screenshots across Admin Financial Reports (`/admin/reports`), Staff Quotations (`/staff/quotations`), and Customer Portal (`/portal`).
  - Confirmed consistent Geist design tokens, clean typography, badge indicators, and zero hydration warnings.

---

### Milestone 9: Dedicated Admin Accounts Provisioning (Shivanshu, Aryan, Hiren Sir)
- **Objective:**
  - Provision three designated system administrators with full platform access:
    1. **Shivanshu** (`shivanshu@brightloopsoftware.com`)
    2. **Aryan** (`aryan@brightloopsoftware.com`)
    3. **Hiren Sir** (`hiren@brightloopsoftware.com`)
  - Ensure immediate accessibility via internal login (`/internal-login`) in both offline/local mode and Supabase PostgreSQL database mode.
  - Dynamically display the authenticated administrator's actual name and email in the Admin sidebar and layout header.
  - Provide database provisioning migration [`supabase/migrations/20261031_004_seed_admin_accounts.sql`](file:///Users/shiv/Odoo_hackathon_project/supabase/migrations/20261031_004_seed_admin_accounts.sql) for live Supabase synchronization.

- **Implementation Details:**
  - **Internal Authentication Mapping (`src/modules/auth/actions.ts`):**
    - Updated `internalSignInAction` to recognize `shivanshu`, `aryan`, and `hiren` (or `hirensir`, or full `@brightloopsoftware.com` emails) as verified administrators.
    - Sets session cookies `brightloop_session_role = "admin"` and `brightloop_session_user = <identifier>`.
  - **Profile Resolution (`src/modules/auth/service.ts`):**
    - Updated `getCurrentUser()` to resolve user profiles based on the session identifier, attaching specific full names ("Shivanshu", "Aryan", "Hiren Sir") and system emails.
  - **Dynamic Admin Sidebar (`src/components/admin/admin-sidebar.tsx`, `src/app/(admin)/admin/layout.tsx`):**
    - Refactored `AdminLayoutClient` and `AdminSidebar` to receive and display dynamic admin profile credentials in the sidebar account footer.
  - **Team Directory (`src/lib/data/store.ts`):**
    - Seeded Shivanshu, Aryan, and Hiren Sir into `store.staff` as system administrators, visible in Team Management (`/admin/team`).
  - **Supabase Database Migration (`supabase/migrations/20261031_004_seed_admin_accounts.sql`):**
    - Provisions all 3 accounts into `auth.users` with encrypted passwords (`AdminBrightloop2026!`) and confirmed email status.
    - Upserts corresponding rows into `public.profiles` with `role = 'admin'`.
  - **Automated Verification (`tests/admin-accounts.test.mjs`):**
    - Added automated test suite verifying profile provisioning and identifier recognition logic across all 3 admin accounts.

---

### Milestone 10: Unified Tabbed Internal Login & Navbar CTA
- **Landing Page Navbar CTA:**
  - Updated primary navbar CTA button from "Get Started" (`/signup`) to **"Staff Login"** (`/internal-login`) in both desktop header and mobile responsive drawer in `src/components/layout/navbar.tsx`.
- **Unified Two-Tab Internal Login Card (`src/app/(auth)/internal-login/page.tsx`):**
  - Integrated interactive 2-tab segmented control inside the single `AuthCard` adhering strictly to `DESIGN.md`:
    - **Internal Staff Tab:**
      - Eyebrow: `DAILY OPERATIONS`
      - Title: `Internal Staff Sign In`
      - Subtitle: `Operational daily workspace: customer inquiries, quotations, subscriptions, invoices, and payments.`
      - 1-Click Quick Accounts: `Alex Rivera` (`staff@brightloopsoftware.com`), `James Wilson` (`james.ops@brightloopsoftware.com`).
      - Role-tailored input labels and placeholder.
      - Action CTA: `Sign In as Internal Staff` (redirects directly to `/staff`).
    - **Administrator Tab:**
      - Eyebrow: `EXECUTIVE MANAGEMENT`
      - Title: `Administrator Sign In`
      - Subtitle: `Full administrative control: catalog, plans, billing automations, taxes, and system reports.`
      - 1-Click Quick Accounts: `Shivanshu`, `Aryan`, `Hiren Sir`.
      - Role-tailored input labels and placeholder.
      - Action CTA: `Sign In as Administrator` (redirects directly to `/admin`).
  - Passes hidden input `<input type="hidden" name="targetRole" value={activeTab} />` to guide role routing.
- **Backend Role Routing Polish (`src/modules/auth/actions.ts` & `src/modules/auth/service.ts`):**
  - Updated `internalSignInAction` to parse `targetRole` and route staff/admin accounts to their respective workspaces (`/staff` vs `/admin`).
  - Updated `getCurrentUser` in dev session to dynamically populate `Alex Rivera` or `James Wilson` when logged in as staff.
- **Automated Verification:**
  - Expanded `tests/admin-accounts.test.mjs` with Staff Identifier Recognition logic.
  - All 43 automated unit and integration tests passing (`npm test`).
  - Next.js production build succeeded with 0 errors across all 61 routes (`npm run build`).
  - Verified visual rendering, tab switching, and one-click quick login using Chrome DevTools MCP.

---

### Milestone 11: Information-Dense Discount Rules Admin Page Simplification
- **Streamlined Page Header:**
  - Removed redundant descriptive subtitle below the "Discount Rules" page heading in `src/app/(admin)/admin/discounts/page.tsx`.
- **Eliminated Promotional Descriptions:**
  - Removed verbose description copy beneath discount codes (`VOLUME20`, `ENTERPRISE200`), rendering clean monospace code tags.
- **Removed Redundant Type Badges:**
  - Removed redundant `PERCENTAGE` and `FIXED` pills; the value format directly communicates the discount type (`20%` vs `$200`).
- **Compact Inline Eligibility Conditions:**
  - Condensed multi-line min purchase and quantity rules into compact inline text (e.g. `$1,000 min. · 1 seat min.`).
- **Simplified Applicability Targets:**
  - Directly displays `All subscriptions` or the specific product name (e.g. `Dedicated Data Engineering Support`) without redundant category wrapper labels.
- **Compact Usage & Single-Line Validity:**
  - Standardized usage display as `12 / 100` and `5 / 50`.
  - Rendered validity dates on a single line (`2026-01-01 – 2027-12-31`) with `whitespace-nowrap`.
- **Quality Assurance & Verification:**
  - Verified layout in Chrome DevTools MCP with screenshot capture.
  - Zero TypeScript or lint errors (`npm run build`).
  - All 43 automated unit & integration tests passing (`npm test`).

---

### Milestone 12: Vercel Geist Dark Theme Architecture & Seamless Theme Toggle
- **Vercel Dark Theme Design Tokens:**
  - Configured `tailwind.config.ts` with `darkMode: "class"` and mapped semantic color channels (`canvas`, `canvas-elevated`, `ink`, `body`, `mute`, `hairline`, `primary`) to dynamic CSS variable channels supporting full opacity modifiers (`<alpha-value>`).
  - Added full dark mode token ladder in `src/app/globals.css`:
    - Canvas (pure pitch black): `#000000`
    - Elevated Surface: `#0a0a0a`
    - High-contrast Ink: `#ededed`
    - Body Text: `#a1a1a1`
    - Muted Caption Text: `#707070`
    - Hairline Border: `#222222`
    - Dark mode luminous hero mesh gradient and dark scrollbar styling.
- **Inverted Dark Mode Button Aesthetics:**
  - Implemented Vercel dark mode primary button aesthetics (`bg-ink` inverts cleanly to crisp white `#ededed` surface with black text/icons, and `#ffffff` on hover).
- **Universal Theme Toggle Component (`src/components/theme-toggle.tsx`):**
  - Integrated 1-click theme switcher with instant zero-flash hydration across:
    - Public Navbar (`src/components/layout/navbar.tsx`)
    - Admin Workspace Header (`src/components/admin/admin-header.tsx`)
    - Staff Operations Header (`src/components/staff/staff-header.tsx`)
    - Customer Portal Navbar (`src/components/portal/portal-navbar.tsx`)
  - Defaults to Dark Mode across the application while allowing instant user toggling between Dark and Light themes.
- **Automated Verification & Visual Inspection:**
  - Verified dark and light modes via Chrome DevTools MCP with screenshot validations.
  - All 43 automated unit & integration tests passing (`npm test`).
  - Zero TypeScript or lint errors in production build (`npm run build`).

---

### Milestone 13: Inspiration Dashboard Graphs & High-Fidelity KPI Cards
- **Embedded SVG Sparkline Graphs:**
  - Implemented interactive, responsive SVG sparkline graphs across all 4 primary KPI cards matching `inspiration/screen.png` and `inspiration/code.html`:
    - **Active Subscriptions:** Smooth emerald curve with gradient fill, interactive data points, and `+12.0%` trend badge.
    - **Revenue Received:** Sky-blue trajectory with gradient fill, interactive data points, and `+18.4%` trend badge.
    - **Outstanding Amount:** Amber oscillation curve with gradient fill, interactive data points, and `-3.1%` trend badge.
    - **Overdue Invoices:** Rose urgent alert curve with gradient fill, interactive data points, and `Requires action` badge.
- **Interactive Sparkline Floating Tooltip:**
  - Created interactive hover state showing date, value, and color-coded indicator on data points without external dependencies.
- **Content Panels & Navigation Integration:**
  - Rebuilt the overview dashboard layout ([`src/components/admin/dashboard-view.tsx`](file:///Users/shiv/Odoo_hackathon_project/src/components/admin/dashboard-view.tsx) and [`src/app/(admin)/admin/page.tsx`](file:///Users/shiv/Odoo_hackathon_project/src/app/(admin)/admin/page.tsx)) preserving all workspace features (sidebar, global search, breadcrumbs, and theme toggling).
  - Aligned cards with `Process Billing` (pill/rounded with play icon) and `+ New Quote` actions.
- **Automated Verification:**
  - Verified live in Chrome DevTools MCP with visual screenshot captures in both Dark Mode and Light Mode.
  - All 43 unit and integration tests passing (`npm test`).
  - Next.js production build succeeded with 0 errors across all 61 routes (`npm run build`).

---

### Milestone 14: Typography & Proportional Scale Standardization for Admin Dashboard
- **Standardized Typography to Match Admin Workspace Pages:**
  - Scaled down oversized headers and labels in [`src/components/admin/dashboard-view.tsx`](file:///Users/shiv/Odoo_hackathon_project/src/components/admin/dashboard-view.tsx) to align strictly with `/admin/plans`, `/admin/subscriptions`, `/admin/discounts`, and `/admin/invoices`:
    - Page Title: Changed from `text-5xl font-extrabold` to `text-2xl font-semibold tracking-[-0.4px] text-ink`.
    - Eyebrow: Standardized to `text-xs font-mono uppercase text-mute`.
    - Subtitle: Standardized to `text-xs text-body`.
    - Action Buttons (`Process Billing` & `+ New Quote`): Scaled down from `px-4 py-2.5 rounded-lg text-sm font-semibold` to compact `h-8 rounded-sm px-3 text-xs font-medium` (6px Geist radius).
    - KPI Metrics: Scaled down from `text-4xl` to `text-2xl font-semibold text-ink tracking-tight` with `text-[10px] font-mono tracking-wider text-mute` category titles.
    - Sparklines: Standardized to `h-8` with `strokeWidth="1.8"`, compact interactive dots (`r="2.5"`), and miniaturized trend badges (`text-[10px] font-mono px-1.5 py-0.5 rounded-sm`).
    - Content Panels: Standardized to `rounded-md p-5` with `text-xs font-semibold text-ink` panel titles, `text-xs font-mono text-link` section links, `text-xs font-semibold text-ink font-mono` item IDs, and `text-[11px] text-mute font-mono` timestamps.
    - Floating Tooltip: Scaled to `rounded-sm px-2 py-1 text-[11px] font-mono`.
- **Theme & Cross-Workspace Consistency:**
  - Confirmed perfect visual alignment in both Dark Mode and Light Mode with zero font mismatch across the entire admin workspace.
- **Automated Verification:**
  - Tested and captured live screenshots via Chrome DevTools MCP on `http://localhost:3000/admin` and `http://localhost:3000/admin/plans`.
  - All 43 unit and integration tests passing (`npm test`).
  - Next.js production build verified clean with 0 compilation errors across 61 routes (`npm run build`).

---

## 3. Current Repository State

- **Branch:** `main`
- **Total Compiled Routes:** 61 routes across Marketing, Auth, Admin, Staff, and Customer Portal.
- **Automated Test Suite:** 43 tests passing with 0 failures (`npm test`).
- **Working Tree:**
  - `src/app/(portal)/portal/`: Complete Phase 3 Customer Portal (Overview, Subscriptions, Invoices, Account, Print).
  - `src/components/portal/`: Customer navbar with mobile drawer and customer layout shell.
  - `src/modules/portal/`: Customer portal server actions (`actions.ts`).
  - `src/app/(staff)/staff/`: Complete Phase 2 Staff Workspace (Overview, Customers, Quotations, Subscriptions, Invoices, Payments, Reports, Account).
  - `src/components/staff/`: Staff sidebar, header with global search, and layout shell.
  - `src/app/(admin)/admin/`: Complete Phase 1 Admin Workspace (Overview, Catalog, Plans, Taxes, Discounts, Billing, Reports, Team).
  - `src/components/admin/`: Admin sidebar, header with global search, and print controls.
  - `src/modules/`: Domain business logic actions (`products`, `plans`, `taxes`, `discounts`, `quotations`, `subscriptions`, `billing`, `invoices`, `payments`, `team`, `auth`, `portal`).
  - `src/lib/data/store.ts`: Domain models, seed data, calculation utilities, and business rule validators.
  - `supabase/migrations/`:
    - `001_auth_profiles.sql` (RBAC & auth triggers).
    - `002_admin_workspace_schema.sql` (Admin workspace schema, idempotency constraints & indexes).
    - `003_customer_portal_rls.sql` (Customer Portal RLS policies for strict customer isolation).
    - `004_seed_admin_accounts.sql` (Seed 3 primary administrators: Shivanshu, Aryan, Hiren Sir).
  - `tests/`:
    - `auth-validation.test.mjs` (8 auth tests).
    - `cross-system-integration.test.mjs` (31 cross-system integration and E2E workflow tests).
    - `admin-accounts.test.mjs` (4 admin & staff provisioning tests).
  - Documentation: `README.md`, `AGENTS.md`, `DESIGN.md`, `ARCHITECTURE.md`, `PROJECT_CONTEXT.md`, `DEVELOPMENT_PLAN.md`, `whatisdone.md`.

---

## 4. Next Implementation Steps (Phase 5 of Hackathon: Supabase Live Cloud Integration & Vercel Deployment)

1. **Supabase Live Cloud Synchronization:**
   - Execute migrations `001`, `002`, `003`, and `004` on live Supabase cloud project.
   - Verify Supabase Auth email confirmation and password reset hooks with live SMTP.
2. **End-to-End System Polish & Health Checks:**
   - Production bundle optimization.
   - Vercel deployment configuration verification.
