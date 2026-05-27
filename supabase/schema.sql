create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  role text not null check (role in ('admin', 'staff', 'customer')),
  status text not null check (status in ('active', 'disabled', 'invited')),
  last_login timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id text primary key,
  customer_name text not null,
  customer_email text,
  customer_phone text,
  travel_start date not null,
  travel_end date not null,
  passengers integer not null,
  ship_id text,
  ship_name text,
  package_id text,
  package_label text,
  destination_id text,
  destination_name text,
  suite_slug text,
  suite_title text,
  room_count integer,
  guest_count integer,
  selected_date_range_label text,
  status text not null check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text not null check (payment_status in ('unpaid', 'paid', 'partial', 'refunded')),
  payment_method text,
  total_amount text,
  special_requests text,
  admin_notes text,
  created_at date not null default current_date
);

create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_payment_status_idx on public.bookings (payment_status);
create index if not exists bookings_ship_id_idx on public.bookings (ship_id);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  ship_id text not null,
  ship_name text not null,
  departure_date date not null,
  return_date date not null,
  destination text not null,
  price_per_person text,
  total_capacity integer not null,
  booked_seats integer not null default 0,
  status text not null check (status in ('scheduled', 'ongoing', 'completed', 'cancelled')),
  amenities text[] not null default array[]::text[],
  itinerary text[] not null default array[]::text[],
  created_at date not null default current_date,
  updated_at date not null default current_date
);

create index if not exists schedules_ship_id_idx on public.schedules (ship_id);
create index if not exists schedules_status_idx on public.schedules (status);

create table if not exists public.suite_availability (
  id uuid primary key default gen_random_uuid(),
  ship_id text not null,
  ship_name text not null,
  start_date date not null,
  end_date date not null,
  status text not null check (status in ('active', 'inactive')),
  created_at date not null default current_date,
  updated_at date not null default current_date
);

create index if not exists suite_availability_ship_id_idx on public.suite_availability (ship_id);
create index if not exists suite_availability_status_idx on public.suite_availability (status);

create table if not exists public.suite_pricing (
  id uuid primary key default gen_random_uuid(),
  ship_id text not null,
  ship_name text not null,
  suite_name text not null,
  suite_slug text,
  price_per_night numeric not null,
  b2b_price_per_night numeric,
  b2c_price_per_night numeric,
  capacity integer not null,
  description text,
  created_at date not null default current_date,
  updated_at date not null default current_date
);

alter table public.suite_pricing
  add column if not exists b2b_price_per_night numeric;

alter table public.suite_pricing
  add column if not exists b2c_price_per_night numeric;

create unique index if not exists suite_pricing_ship_suite_idx on public.suite_pricing (ship_id, suite_name);

create or replace function public.is_staff_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid()
      and status = 'active'
      and role in ('admin', 'staff')
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where id = auth.uid()
      and status = 'active'
      and role = 'admin'
  );
$$;

alter table public.admin_users enable row level security;
alter table public.bookings enable row level security;
alter table public.schedules enable row level security;
alter table public.suite_availability enable row level security;
alter table public.suite_pricing enable row level security;

create policy "Admins manage admin users"
  on public.admin_users
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Users can view own admin profile"
  on public.admin_users
  for select
  using (id = auth.uid());

create policy "Public can create pending bookings"
  on public.bookings
  for insert
  with check (status = 'pending' and payment_status = 'unpaid');

create policy "Staff can read bookings"
  on public.bookings
  for select
  using (public.is_staff_or_admin());

create policy "Staff can update bookings"
  on public.bookings
  for update
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

create policy "Staff can delete bookings"
  on public.bookings
  for delete
  using (public.is_staff_or_admin());

create policy "Public read scheduled schedules"
  on public.schedules
  for select
  using (status = 'scheduled');

create policy "Staff manage schedules"
  on public.schedules
  for all
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

create policy "Public read active suite availability"
  on public.suite_availability
  for select
  using (status = 'active');

create policy "Staff manage suite availability"
  on public.suite_availability
  for all
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());

create policy "Public read suite pricing"
  on public.suite_pricing
  for select
  using (true);

create policy "Staff manage suite pricing"
  on public.suite_pricing
  for all
  using (public.is_staff_or_admin())
  with check (public.is_staff_or_admin());
