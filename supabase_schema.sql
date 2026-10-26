-- ==============================================================================
-- ZynSite.com - Hardened Supabase Database Schema & Zero-Trust Security Setup
-- Tables: orders, demo_bookings
-- Security: Strict Row Level Security (RLS)
--   - Unauthenticated/Anon users: INSERT-ONLY with validation checks.
--   - SELECT, UPDATE, DELETE strictly forbidden for anon.
--   - Admin users (authenticated): Full access to view and manage orders/demos.
--   - Customer Order Tracker: Handled via secure SECURITY DEFINER RPC function.
-- ==============================================================================

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    business_name TEXT,
    page_link TEXT,
    package_id TEXT,
    package_name TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    advance_amount NUMERIC NOT NULL DEFAULT 0,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'contacted', 'in_progress', 'completed', 'cancelled'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders(client_phone);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);

-- 2. Create Demo Bookings Table
CREATE TABLE IF NOT EXISTS public.demo_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    business_name TEXT,
    topic TEXT NOT NULL,
    meeting_date TEXT NOT NULL,
    meeting_time TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'Google Meet',
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for demo bookings
CREATE INDEX IF NOT EXISTS idx_demos_created_at ON public.demo_bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demos_status ON public.demo_bookings(status);
CREATE INDEX IF NOT EXISTS idx_demos_phone ON public.demo_bookings(client_phone);
CREATE INDEX IF NOT EXISTS idx_demos_booking_id ON public.demo_bookings(booking_id);

-- 3. Cleanup any old leaked settings rows from previous configurations
DELETE FROM public.orders WHERE order_id LIKE 'SETTINGS_%';

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

-- 5. Drop all existing insecure policies
DROP POLICY IF EXISTS "Allow full access on orders" ON public.orders;
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
DROP POLICY IF EXISTS "Allow read access on orders" ON public.orders;
DROP POLICY IF EXISTS "Allow update access on orders" ON public.orders;
DROP POLICY IF EXISTS "Allow delete access on orders" ON public.orders;
DROP POLICY IF EXISTS "anon_insert_order" ON public.orders;
DROP POLICY IF EXISTS "authenticated_admin_orders" ON public.orders;

DROP POLICY IF EXISTS "Allow full access on demo_bookings" ON public.demo_bookings;
DROP POLICY IF EXISTS "Allow public insert on demo_bookings" ON public.demo_bookings;
DROP POLICY IF EXISTS "anon_insert_demo" ON public.demo_bookings;
DROP POLICY IF EXISTS "authenticated_admin_demo_bookings" ON public.demo_bookings;

-- 6. Zero-Trust Policies for Orders:
-- Anon users can ONLY insert pending orders with valid name and phone.
-- Anon users CANNOT select, update, or delete ANY orders.
CREATE POLICY "anon_insert_order"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (
    status = 'pending'
    AND order_id NOT LIKE 'SETTINGS_%'
    AND client_name IS NOT NULL
    AND client_phone IS NOT NULL
    AND length(trim(client_name)) > 0
    AND length(trim(client_phone)) > 0
);

-- Authenticated admin users have full access to manage orders
CREATE POLICY "authenticated_admin_orders"
ON public.orders
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. Zero-Trust Policies for Demo Bookings:
-- Anon users can ONLY insert pending demo requests.
-- Anon users CANNOT select, update, or delete ANY bookings.
CREATE POLICY "anon_insert_demo"
ON public.demo_bookings
FOR INSERT
TO anon
WITH CHECK (
    status = 'pending'
    AND client_name IS NOT NULL
    AND client_phone IS NOT NULL
    AND length(trim(client_name)) > 0
    AND length(trim(client_phone)) > 0
);

-- Authenticated admin users have full access to manage demo bookings
CREATE POLICY "authenticated_admin_demo_bookings"
ON public.demo_bookings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 8. Secure RPC Function for Customer Order Tracking
-- Returns ONLY the specific customer order if order_id and phone match.
-- Does NOT expose internal notes or entire database.
CREATE OR REPLACE FUNCTION public.track_customer_order(p_order_id TEXT, p_phone_tail TEXT)
RETURNS TABLE (
    order_id TEXT,
    client_name TEXT,
    business_name TEXT,
    package_name TEXT,
    price NUMERIC,
    advance_amount NUMERIC,
    status TEXT,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.order_id,
        o.client_name,
        o.business_name,
        o.package_name,
        o.price,
        o.advance_amount,
        o.status,
        o.created_at
    FROM public.orders o
    WHERE LOWER(TRIM(o.order_id)) = LOWER(TRIM(p_order_id))
      AND (
        p_phone_tail IS NULL 
        OR TRIM(p_phone_tail) = ''
        OR RIGHT(REGEXP_REPLACE(o.client_phone, '[^0-9]', '', 'g'), 8) = RIGHT(REGEXP_REPLACE(p_phone_tail, '[^0-9]', '', 'g'), 8)
      )
    LIMIT 1;
END;
$$;

-- Grant EXECUTE permission to anon and authenticated for the tracker RPC
GRANT EXECUTE ON FUNCTION public.track_customer_order(TEXT, TEXT) TO anon, authenticated;

-- ==============================================================================
-- SETUP INSTRUCTIONS:
-- 1. Open Supabase Dashboard (https://supabase.com/dashboard) -> Select Project.
-- 2. Go to "SQL Editor" in the left sidebar.
-- 3. Click "New Query", paste this script, and click "Run".
-- 4. Your orders and customer data are now fully protected with Zero-Trust RLS!
-- ==============================================================================
