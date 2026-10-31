-- Migration: 20261031_005_seed_customer_account.sql
-- Description: Provision a default dummy customer account for Brightloop Customer Portal testing.
-- Default credentials:
-- Email: customer@brightloopsoftware.com
-- Password: Customer123!

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_encrypted_pw TEXT;
  v_uid_customer UUID := 'c0000000-0000-0000-0000-000000000001';
BEGIN
  -- Hash standard compliant password: Customer123!
  v_encrypted_pw := crypt('Customer123!', gen_salt('bf'));

  -- 1. Insert into auth.users if not exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'customer@brightloopsoftware.com') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role
    ) VALUES (
      v_uid_customer,
      '00000000-0000-0000-0000-000000000000',
      'customer@brightloopsoftware.com',
      v_encrypted_pw,
      timezone('utc'::text, now()),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Demo Customer"}',
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      'authenticated'
    );
  END IF;

  -- 2. Upsert customer profile in public.profiles
  INSERT INTO public.profiles (id, email, full_name, role, updated_at)
  VALUES (
    (SELECT id FROM auth.users WHERE email = 'customer@brightloopsoftware.com'),
    'customer@brightloopsoftware.com',
    'Demo Customer',
    'customer',
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'customer', full_name = 'Demo Customer', updated_at = timezone('utc'::text, now());

END $$;
