# Brightloop Software — Subscription Management System

An operational backbone and automated subscription billing platform built for **Brightloop Software** (data analysis services & software). 

This platform manages the complete subscription lifecycle—from product quotation and catalog management to automated recurring billing runs, customer self-service, offline/online payment tracking, and real-time financial reporting.

---

## 🚀 Key Features & Subsystems

The system implements 12 core operational subsystems:

1. **Authentication & RBAC**: Secure email/password authentication with role-based access control (Admin, Internal Staff, and Customer) backed by Supabase Auth and PostgreSQL Row Level Security (RLS).
2. **Product & Variant Catalog**: Manage software products, service tiers, base prices, costs, internal notes, and attribute variants (e.g., brand, tier adjustments).
3. **Flexible Recurring Plans**: Support multiple billing cadences (Daily, Weekly, Monthly, Yearly), minimum commitments, renewal rules, and automatic pause/closure policies.
4. **Quotation & Templates**: Pre-configured quote templates with multi-line products and plans, validity tracking, and one-click quote-to-subscription conversion.
5. **Subscription Lifecycle Management**: Full state machine (`Draft` → `Quotation` → `Confirmed` → `Active` → `Closed`) tracking line items, quantities, renewal dates, and terms.
6. **Tax Management**: Automated calculation and application of configurable tax rules to subscription lines and invoices.
7. **Discount Rules Engine**: Fixed-amount and percentage discounts with qualification parameters (minimum spend, quantity thresholds, usage caps, and expiration dates).
8. **Automated Billing & Invoicing**: Automated billing runs generating itemized customer invoices with pre-calculated taxes and discounts. Enforces strict idempotency to eliminate double-billing risks.
9. **Payment Management**: Multi-method payment recording against invoices with transaction dates, reference notes, and outstanding balance reconciliation.
10. **Customer Self-Service Portal**: Clean customer workspace for viewing active subscriptions, reviewing renewal schedules, downloading invoices, and updating details.
11. **Financial Analytics & Dashboard**: Real-time metrics covering Active Subscriptions, MRR (Monthly Recurring Revenue), ARR, collected cash, outstanding accounts receivable, and overdue aging with sub-2s query speeds.
12. **Public Landing & Pricing Page**: High-conversion marketing showcase tailored for Brightloop Software's data analytics offerings, featuring interactive pricing plans and self-serve signup.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router) + TypeScript | React Server Components (RSC), Server Actions, and Client Components |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) | Strict adherence to the Geist design language (`DESIGN.md`) |
| **Backend Architecture**| Modular Monolith | Business logic encapsulated in `src/modules/<domain>/` |
| **Database** | [Supabase](https://supabase.com/) PostgreSQL | Relational modeling, RLS policies, foreign keys, and atomic transactions |
| **Authentication** | Supabase Auth + SSR | Secure session management with `@supabase/ssr` |
| **Scheduled Jobs** | Supabase Cron (`pg_cron`) | Automated recurring billing generation and subscription expiry checks |
| **Deployment** | Vercel | Seamless edge routing and SSR hosting |

---

## 👥 User Roles & Access Hierarchy

- **Admin (Superuser)**: Full system administration (Products, Variants, Plans, Tax Rules, Discount Codes, Staff Account Invitations, and Executive Financial Reports).
- **Internal Staff (Operations & Sales)**: Day-to-day operations (Quotation generation, subscription management, invoice confirmation, offline payment recording, overdue tracking).
- **Customer (Subscriber)**: Access to the Customer Portal to inspect active subscriptions, download invoices, and manage payment options.

---

## 📐 Design Language

This application strictly implements the **Geist Design Language** defined in [`DESIGN.md`](./DESIGN.md):
- **Surfaces**: Canvas (`#fafafa`), elevated surfaces (`#ffffff`), hairline borders (`#ebebeb`).
- **Typography**: Clean monospace accents, structured typography hierarchies, primary ink (`#171717`), secondary ink (`#4d4d4d`).
- **Interactive Elements**: Rounded pill CTAs (`rounded-full`) for marketing and 6px rounded corners (`rounded-[6px]`) for dashboard chrome and inputs.
- **Accents**: Restrained hero mesh gradients reserved strictly for hero and brand accents.

---

## 📁 Repository Structure

```text
├── AGENTS.md                  # Operating rules, UI verification, and design enforcement
├── ARCHITECTURE.md            # Technical architecture, DB schema, and domain design
├── DESIGN.md                  # Single source of truth for Geist design tokens
├── DEVELOPMENT_PLAN.md        # Phased roadmap and implementation milestones
├── PROJECT_CONTEXT.md         # Problem background, business scope, and subsystem specs
├── Subscription_Management_System (1).pdf # Source specification document
└── src/                       # Application source code (modular monolith)
    ├── app/                   # Next.js App Router (marketing, portal, admin)
    ├── components/            # Shared UI components
    ├── lib/                   # Database client, utilities, and helpers
    └── modules/               # Domain-specific logic
        ├── auth/
        ├── products/
        ├── plans/
        ├── quotations/
        ├── subscriptions/
        ├── taxes/
        ├── discounts/
        ├── invoices/
        ├── payments/
        └── reporting/
```

---

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17+ or v20+)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) project with PostgreSQL database

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Installation & Development

```bash
# Install dependencies
npm install

# Run the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📖 Documentation Reference

- [Project Context & Business Scope](PROJECT_CONTEXT.md)
- [System Architecture & Database Schema](ARCHITECTURE.md)
- [Design Tokens & UI Guidelines](DESIGN.md)
- [Development Plan & Roadmap](DEVELOPMENT_PLAN.md)
- [Agent Operational Guidelines](AGENTS.md)
