# Architecture & System Design: Brightloop Software

## 1. Finalized Technology Stack

| Layer | Technology | Details / Purpose |
|---|---|---|
| **Frontend Framework** | Next.js (App Router) + TypeScript | React Server Components (RSC), Server Actions, and Client Components |
| **Styling & Design** | Tailwind CSS | Strictly adheres to the Geist design tokens in `DESIGN.md` |
| **Backend Architecture** | Modular Monolith | Next.js Server Actions & Route Handlers with isolated domain modules |
| **Database** | Supabase PostgreSQL | Relational modeling, foreign keys, triggers, and transactional functions |
| **Authentication** | Supabase Auth | Email + password auth with custom profile synchronization |
| **Data Security** | PostgreSQL Row Level Security (RLS) | Enforces tenant and role boundaries at the database layer |
| **Database Access** | `@supabase/supabase-js` & `@supabase/ssr` | Typed client and server Supabase clients |
| **Scheduled Tasks** | Supabase Cron / PostgreSQL pg_cron | Automated billing day runs and subscription expiry checks |
| **Hosting Target** | Vercel | Seamless Next.js deployment and edge routing |

---

## 2. Architectural Style: Modular Monolith

Rather than dispersing logic across microservices or tangling it inside UI route files, the application is organized as a **Modular Monolith**:
- Domain-specific business logic is encapsulated inside `src/modules/<domain>/`.
- UI pages and route handlers serve solely as presentation and transport layers, delegating business rules and state transitions to domain services.
- Financial operations (invoicing, payments, tax calculations) utilize database transactions (`BEGIN...COMMIT`) or PostgreSQL RPC functions to ensure atomic consistency.

```
                    +------------------------------------------+
                    |             Next.js Client               |
                    | (Marketing, Customer Portal, Admin Dash) |
                    +--------------------+---------------------+
                                         |
                                         v
                    +------------------------------------------+
                    |        Next.js App Router Layer          |
                    |    (Server Components & Server Actions)  |
                    +--------------------+---------------------+
                                         |
                                         v
       +----------------------------------------------------------------+
       |                     Domain Modules Layer                       |
       |  +----------+ +-------+ +---------------+ +---------+ +-----+  |
       |  | Products | | Plans | | Subscriptions | | Invoices | | ... |  |
       |  +----------+ +-------+ +---------------+ +---------+ +-----+  |
       +---------------------------------+------------------------------+
                                         |
                                         v
       +----------------------------------------------------------------+
       |                  Data & Infrastructure Layer                   |
       |      Supabase Client (RLS) <---> PostgreSQL Database Engine    |
       +----------------------------------------------------------------+
```

---

## 3. Directory Structure Specification

```text
/Users/shiv/Odoo_hackathon_project
├── DESIGN.md                        # Single source of truth for design tokens (DO NOT EDIT)
├── Subscription_Management_System (1).pdf # Primary requirements specification
├── AGENTS.md                        # Guidelines and operating rules for AI agents
├── PROJECT_CONTEXT.md               # Product overview, users, and business requirements
├── ARCHITECTURE.md                  # This architecture specification
├── DEVELOPMENT_PLAN.md              # Phased implementation roadmap
├── supabase/
│   └── migrations/                  # Sequential SQL migration files and RLS policies
└── src/
    ├── app/
    │   ├── (marketing)/             # Public landing page, pricing, and features
    │   ├── (auth)/                  # Login, signup, reset-password
    │   ├── (admin)/                 # Internal operations (Admin & Staff interfaces)
    │   │   ├── dashboard/           # Financial metrics and activity feed
    │   │   ├── products/            # Product and variant management
    │   │   ├── plans/               # Plan management and billing rules
    │   │   ├── quotations/          # Quotation templates and active quotes
    │   │   ├── subscriptions/       # Subscription lifecycle management
    │   │   ├── invoices/            # Invoices, billing day trigger, invoice printing
    │   │   ├── payments/            # Payment recording and reconciliations
    │   │   ├── taxes/               # Tax rules configuration
    │   │   ├── discounts/           # Discount rules configuration
    │   │   └── staff/               # Staff member management (Admin only)
    │   ├── (portal)/                # Customer Portal (Subscriber self-service)
    │   │   ├── subscriptions/       # Active/past subscriptions
    │   │   └── invoices/            # View and download invoices
    │   ├── api/                     # Webhooks and system endpoints
    │   ├── globals.css              # Base CSS importing Geist tokens
    │   └── layout.tsx               # Root layout
    ├── components/
    │   ├── ui/                      # Atomic design system components (Button, Input, Card, Badge)
    │   └── layout/                  # Shared navigation bars, sidebars, and footers
    ├── modules/                     # Domain business logic (Modular Monolith)
    │   ├── auth/                    # Role resolution, session helpers, password validation
    │   ├── products/                # Product schemas, pricing services, variant logic
    │   ├── plans/                   # Plan frequencies, term end policies
    │   ├── quotations/              # Quotation templates & conversion to subscription
    │   ├── subscriptions/           # Subscription state machine & line items
    │   ├── taxes/                   # Tax rate calculation engine
    │   ├── discounts/               # Discount eligibility & application engine
    │   ├── invoices/                # Recurring billing generation & numbering
    │   ├── payments/                # Payment recording & invoice status updates
    │   └── reporting/               # MRR, ARR, churn, aging receivables queries
    ├── lib/
    │   ├── supabase/                # Supabase SSR client, server, admin, middleware
    │   ├── constants/               # Roles, routes, statuses, billing frequencies
    │   └── utils/                   # Currency formatters, date utilities, class merging
    └── types/
        ├── database.types.ts        # Auto-generated Supabase PostgreSQL database types
        └── index.ts                 # Shared domain interfaces and view models
```

---

## 4. Key Architectural Patterns & Decisions

### 4.1 Role-Based Access Control (RBAC) & Row Level Security (RLS)
- All authenticated users have an entry in `public.profiles` linked directly to `auth.users(id)`.
- Roles: `'admin'`, `'staff'`, `'customer'`.
- Database RLS policies guarantee:
  - Customers can read/update strictly their own records (`customer_id = auth.uid()`).
  - Staff can read and manage customer subscriptions and invoices, but cannot edit tax rules, discount rules, or invite new staff.
  - Admins retain unrestricted access to all operational data.

### 4.2 State Machine Enforcement
Subscriptions and invoices follow strict lifecycle state transitions:
- **Subscription**: `Draft` → `Quotation` → `Confirmed` → `Active` → `Closed` (with support for paused states).
- **Invoice**: `Draft` → `Confirmed` → `Paid` (or `Cancelled`).
State changes are gated through domain services that ensure prerequisites (e.g., valid dates, line items, verified totals) are satisfied before updating the database.

### 4.3 Billing Engine & Idempotency
- Billing runs generate invoices based on active subscriptions, plan frequencies, and current billing dates.
- To prevent duplicate invoicing on billing days, invoices maintain unique composite keys (e.g., `subscription_id` + `billing_period_start` + `billing_period_end`).
- Taxes and discounts are calculated using deterministic domain functions before committing the invoice line items.

### 4.4 UI System & Design Tokens
- Strict implementation of `DESIGN.md`.
- Marketing surfaces feature rounded pill buttons (`rounded-full`), Geist Sans display type with negative letter-spacing, and the hero mesh gradient.
- Internal app surfaces feature clean 6px rounded controls (`rounded-[6px]`), flat 1px hairline bordered cards (`#ebebeb`), and high-contrast typography.

