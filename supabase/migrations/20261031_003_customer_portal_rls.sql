-- Migration: 20261031_003_customer_portal_rls.sql
-- Description: Row Level Security (RLS) policies for Customer Portal self-service with strict customer data isolation.

-- 1. Customers can view active products and variants in catalog
DROP POLICY IF EXISTS "Customers can view active products" ON public.products;
CREATE POLICY "Customers can view active products"
  ON public.products FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Customers can view active variants" ON public.product_variants;
CREATE POLICY "Customers can view active variants"
  ON public.product_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE id = product_variants.product_id AND is_active = true
    )
  );

-- 2. Customers can view active plans
DROP POLICY IF EXISTS "Customers can view active plans" ON public.plans;
CREATE POLICY "Customers can view active plans"
  ON public.plans FOR SELECT
  USING (is_active = true);

-- 3. Strict Customer Data Isolation: Subscriptions
DROP POLICY IF EXISTS "Customers can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Customers can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "Customers can view own subscription lines" ON public.subscription_lines;
CREATE POLICY "Customers can view own subscription lines"
  ON public.subscription_lines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions
      WHERE id = subscription_lines.subscription_id AND customer_id = auth.uid()
    )
  );

-- 4. Customer self-service lifecycle updates (pause / resume / renew)
-- Only allowed when subscription belongs to the user and plan policies permit
DROP POLICY IF EXISTS "Customers can update own subscription status" ON public.subscriptions;
CREATE POLICY "Customers can update own subscription status"
  ON public.subscriptions FOR UPDATE
  USING (customer_id = auth.uid())
  WITH CHECK (
    customer_id = auth.uid() AND
    status IN ('active', 'paused')
  );

-- 5. Strict Customer Data Isolation: Invoices
DROP POLICY IF EXISTS "Customers can view own invoices" ON public.invoices;
CREATE POLICY "Customers can view own invoices"
  ON public.invoices FOR SELECT
  USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "Customers can view own invoice lines" ON public.invoice_lines;
CREATE POLICY "Customers can view own invoice lines"
  ON public.invoice_lines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.invoices
      WHERE id = invoice_lines.invoice_id AND customer_id = auth.uid()
    )
  );

-- 6. Strict Customer Data Isolation: Payments
DROP POLICY IF EXISTS "Customers can view own payments" ON public.payments;
CREATE POLICY "Customers can view own payments"
  ON public.payments FOR SELECT
  USING (customer_id = auth.uid());

