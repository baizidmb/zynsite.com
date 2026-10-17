-- ==============================================================================
-- ZynSite.com - Supabase Database Schema & Setup Script
-- Tables: orders, demo_bookings
-- Security: Row Level Security (RLS) enabled with public insert & admin access
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

-- Indexes for lightning fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders(client_phone);
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON public.orders(order_id);

-- Enable Row Level Security (RLS) on Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public users (landing page visitors) to submit new orders
DROP POLICY IF EXISTS "Allow public insert on orders" ON public.orders;
CREATE POLICY "Allow public insert on orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow full access to read, update, and manage orders
DROP POLICY IF EXISTS "Allow full access on orders" ON public.orders;
CREATE POLICY "Allow full access on orders" 
ON public.orders 
FOR ALL 
TO anon, authenticated
USING (true)
WITH CHECK (true);


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

-- Enable Row Level Security (RLS) on Demo Bookings
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;

-- Allow public users to submit demo bookings
DROP POLICY IF EXISTS "Allow public insert on demo_bookings" ON public.demo_bookings;
CREATE POLICY "Allow public insert on demo_bookings" 
ON public.demo_bookings 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow full access to read, update, and manage demo bookings
DROP POLICY IF EXISTS "Allow full access on demo_bookings" ON public.demo_bookings;
CREATE POLICY "Allow full access on demo_bookings" 
ON public.demo_bookings 
FOR ALL 
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- INSTRUCTIONS FOR SETUP:
-- 1. Log in to your Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Select your project (or create a new free project)
-- 3. In the left navigation, click "SQL Editor"
-- 4. Click "New Query", paste this entire script, and click "RUN"
-- 5. Go to "Project Settings" -> "API" to copy:
--    - Project URL (e.g. https://xyzcompany.supabase.co)
--    - Project API Key (anon/public key)
-- 6. Open your ZynSite Admin Panel (https://zynsite.com/admin.html)
-- 7. Go to "সুপাবেজ সেটআপ" tab and paste your Project URL and Anon Key!
-- ==============================================================================
