-- Create doctors table
create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  doctor_name text not null,
  designation text not null,
  clinic_name text not null,
  contact_phone text,
  contact_email text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.doctors enable row level security;

-- Policies for doctors table
-- Doctors can view their own profile
create policy "doctors_select_own"
  on public.doctors for select
  using (auth.uid() = user_id);

-- Doctors can insert their own profile
create policy "doctors_insert_own"
  on public.doctors for insert
  with check (auth.uid() = user_id);

-- Doctors can update their own profile
create policy "doctors_update_own"
  on public.doctors for update
  using (auth.uid() = user_id);

-- Doctors can delete their own profile
create policy "doctors_delete_own"
  on public.doctors for delete
  using (auth.uid() = user_id);

-- Allow anyone to view doctor info by ID (for patient form display)
create policy "doctors_select_public"
  on public.doctors for select
  using (true);
