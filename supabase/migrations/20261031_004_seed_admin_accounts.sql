-- Migration: 20261031_004_seed_admin_accounts.sql
-- Description: Provision 3 primary system administrators for Brightloop Software (Shivanshu, Aryan, Hiren Sir).
-- Password default: 'AdminBrightloop2026!' (Compliant with >8 chars, uppercase, lowercase, special character).

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_encrypted_pw TEXT;
  v_uid_shivanshu UUID := 'a0000000-0000-0000-0000-000000000001';
  v_uid_aryan UUID     := 'a0000000-0000-0000-0000-000000000002';
  v_uid_hiren UUID     := 'a0000000-0000-0000-0000-000000000003';
BEGIN
  -- Hash standard compliant password: AdminBrightloop2026!
  v_encrypted_pw := crypt('AdminBrightloop2026!', gen_salt('bf'));

  -- 1. Admin Account: Shivanshu
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'shivanshu@brightloopsoftware.com') THEN
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
      v_uid_shivanshu,
      '00000000-0000-0000-0000-000000000000',
      'shivanshu@brightloopsoftware.com',
      v_encrypted_pw,
      timezone('utc'::text, now()),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Shivanshu"}',
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      'authenticated'
    );
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, updated_at)
  VALUES (
    (SELECT id FROM auth.users WHERE email = 'shivanshu@brightloopsoftware.com'),
    'shivanshu@brightloopsoftware.com',
    'Shivanshu',
    'admin',
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin', full_name = 'Shivanshu', updated_at = timezone('utc'::text, now());

  -- 2. Admin Account: Aryan
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'aryan@brightloopsoftware.com') THEN
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
      v_uid_aryan,
      '00000000-0000-0000-0000-000000000000',
      'aryan@brightloopsoftware.com',
      v_encrypted_pw,
      timezone('utc'::text, now()),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Aryan"}',
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      'authenticated'
    );
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, updated_at)
  VALUES (
    (SELECT id FROM auth.users WHERE email = 'aryan@brightloopsoftware.com'),
    'aryan@brightloopsoftware.com',
    'Aryan',
    'admin',
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin', full_name = 'Aryan', updated_at = timezone('utc'::text, now());

  -- 3. Admin Account: Hiren Sir
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'hiren@brightloopsoftware.com') THEN
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
      v_uid_hiren,
      '00000000-0000-0000-0000-000000000000',
      'hiren@brightloopsoftware.com',
      v_encrypted_pw,
      timezone('utc'::text, now()),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Hiren Sir"}',
      timezone('utc'::text, now()),
      timezone('utc'::text, now()),
      'authenticated'
    );
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, updated_at)
  VALUES (
    (SELECT id FROM auth.users WHERE email = 'hiren@brightloopsoftware.com'),
    'hiren@brightloopsoftware.com',
    'Hiren Sir',
    'admin',
    timezone('utc'::text, now())
  )
  ON CONFLICT (id) DO UPDATE
  SET role = 'admin', full_name = 'Hiren Sir', updated_at = timezone('utc'::text, now());

END $$;

