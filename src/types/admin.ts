export type UserRole = "admin" | "staff" | "customer";

export type BillingFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type SubscriptionStatus =
  | "draft"
  | "quotation"
  | "confirmed"
  | "active"
  | "paused"
  | "closed";

export type InvoiceStatus = "draft" | "confirmed" | "paid" | "cancelled";

export type QuotationStatus = "draft" | "sent" | "converted" | "expired";

export type PaymentMethod =
  | "bank_transfer"
  | "credit_card"
  | "check"
  | "cash"
  | "other";

export type DiscountType = "fixed" | "percentage";
export type DiscountApplicability = "all_subscriptions" | "specific_products";

export interface CustomerProfile {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  phone?: string;
  address?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku?: string;
  price_adjustment: number;
  cost_adjustment: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  type: string; // 'software' | 'service' | 'addon'
  sales_price: number;
  cost_price: number;
  notes?: string;
  is_active: boolean;
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  billing_frequency: BillingFrequency;
  min_quantity: number;
  start_date?: string;
  end_date?: string;
  auto_close: boolean;
  early_close_eligible: boolean;
  pause_eligible: boolean;
  renewal_eligible: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaxRule {
  id: string;
  name: string;
  rate: number; // e.g. 10.00 for 10%
  description?: string;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface DiscountRule {
  id: string;
  code: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  min_purchase_amount?: number;
  min_quantity?: number;
  start_date?: string;
  end_date?: string;
  usage_limit?: number;
  times_used: number;
  applies_to: DiscountApplicability;
  product_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuotationTemplateLine {
  id: string;
  template_id: string;
  product_id: string;
  variant_id?: string;
  quantity: number;
  created_at: string;
}

export interface QuotationTemplate {
  id: string;
  name: string;
  description?: string;
  plan_id: string;
  validity_days: number;
  lines: QuotationTemplateLine[];
  created_at: string;
  updated_at: string;
}

export interface QuotationLine {
  id: string;
  quotation_id: string;
  product_id: string;
  variant_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  variant_adjustment: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  line_total: number;
}

export interface Quotation {
  id: string;
  quote_number: string;
  customer_id: string;
  customer?: CustomerProfile;
  template_id?: string;
  plan_id: string;
  plan?: Plan;
  status: QuotationStatus;
  valid_until: string;
  notes?: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  lines: QuotationLine[];
  created_at: string;
  updated_at: string;
}

export interface SubscriptionLine {
  id: string;
  subscription_id: string;
  product_id: string;
  variant_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  variant_adjustment: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  line_total: number;
}

export interface Subscription {
  id: string;
  subscription_number: string;
  customer_id: string;
  customer?: CustomerProfile;
  plan_id: string;
  plan?: Plan;
  quotation_id?: string;
  status: SubscriptionStatus;
  start_date: string;
  expiry_date?: string;
  next_billing_date: string;
  billing_frequency: BillingFrequency;
  payment_terms: string;
  auto_close: boolean;
  early_close_eligible: boolean;
  pause_eligible: boolean;
  renewal_eligible: boolean;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  lines: SubscriptionLine[];
  created_at: string;
  updated_at: string;
}

export interface InvoiceLine {
  id: string;
  invoice_id: string;
  product_id?: string;
  variant_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  variant_adjustment: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  line_total: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer?: CustomerProfile;
  subscription_id?: string;
  subscription?: Subscription;
  billing_period_start?: string;
  billing_period_end?: string;
  issue_date: string;
  due_date: string;
  status: InvoiceStatus;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  amount_paid: number;
  amount_due: number;
  notes?: string;
  lines: InvoiceLine[];
  payments?: Payment[];
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  payment_reference: string;
  invoice_id: string;
  invoice?: Invoice;
  customer_id: string;
  customer?: CustomerProfile;
  amount: number;
  payment_method: PaymentMethod;
  payment_date: string;
  notes?: string;
  created_at: string;
}

export interface DashboardKPIs {
  activeSubscriptionsCount: number;
  revenueReceivedTotal: number;
  outstandingAmountTotal: number;
  overdueInvoicesCount: number;
  overdueAmountTotal: number;
  recentSubscriptions: Subscription[];
  recentPayments: Payment[];
  overdueInvoices: Invoice[];
  upcomingBillingSubscriptions: Subscription[];
}

