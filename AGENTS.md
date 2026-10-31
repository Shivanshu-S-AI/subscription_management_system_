# Agent Operating Guidelines & Rules

This document outlines the operational rules and standards for all AI agents working on the **Brightloop Software** project.

---


please git pull before working and git push after working.... 
keep updating old and new system changes to whatisdone.md file.. so we can understand where we left off and other people working with agents and their agents know what is done and have some context.. visit that file to for context.. 

## 1. Core Operating Principles

1. **Verify with Automation Tools & Screenshots (Pragmatic & Balanced):**
   - Whenever UI components, landing pages, or critical user flows are implemented or altered, verify them using browser automation tools (e.g., Chrome DevTools / headless browser) and capture screenshots to validate styling, alignment, and responsiveness.
   - **Do not overdo it**: Take targeted screenshots of completed milestones or key visual states, rather than capturing after every minor CSS tweak.
   - Verify server logic, API endpoints, and database scripts with targeted test commands or scripts before declaring work complete.

2. **Strict Adherence to `DESIGN.md`:**
   - `DESIGN.md` is the single source of truth for design tokens, colors, typography, borders, and component aesthetics.
   - **Never edit or rewrite `DESIGN.md`**.
   - Use the Geist design language:
     - Background canvas: `#fafafa`, elevated surfaces: `#ffffff`.
     - Primary ink: `#171717`, body: `#4d4d4d`, hairline borders: `#ebebeb` (1px).
     - Marketing CTAs: rounded pill buttons (`rounded-full` / `100px`).
     - App chrome & nav buttons: compact 6px rounded (`rounded-[6px]`).
     - Hero mesh gradient: confined strictly to hero accents (develop/preview/ship gradients).

3. **Modular Monolithic Architecture:**
   - Keep business logic decoupled from presentation and API route handlers.
   - Place domain-specific logic in `src/modules/<domain>/` (e.g., `products`, `plans`, `subscriptions`, `invoices`, `payments`, `reporting`).
   - Shared components live in `src/components/`, common utilities in `src/lib/`.
   - Never duplicate financial calculations (tax, discount, prorations, invoice totals) across multiple files.

4. **Role & Permission Enforcement:**
   - The three user roles are strictly defined:
     - **Admin**: Full system management (products, plans, staff, taxes, discounts, reports).
     - **Internal Staff**: Daily operational handling with limited permissions (orders, invoices, payments).
     - **Customer**: Access only to their own subscriptions, invoices, and profile via the customer portal.
   - Always secure data using Supabase PostgreSQL Row Level Security (RLS) in addition to server-side Next.js route checks.

5. **Pragmatic Scope Control:**
   - Build only what is specified in the problem statement (`Subscription_Management_System.pdf`).
   - Do not invent multi-tenant systems or multi-company architectures; Brightloop Software is a single company managing its own subscription operations.
   - The public landing page must present Brightloop Software as a business (offering data analysis services & software), keeping admin and internal dashboard complexities behind authenticated routes.

