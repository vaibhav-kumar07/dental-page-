-- Create patients table
create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid references public.doctors(id) on delete cascade not null,
  patient_name text not null,
  age integer not null,
  gender text not null,
  disease_problem text not null,
  submitted_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.patients enable row level security;

-- Policies for patients table
-- Anyone can insert patient data (public form submission)
create policy "patients_insert_public"
  on public.patients for insert
  with check (true);

-- Doctors can view patients associated with them
create policy "patients_select_by_doctor"
  on public.patients for select
  using (
    doctor_id in (
      select id from public.doctors where user_id = auth.uid()
    )
  );

-- Doctors can delete patient records associated with them
create policy "patients_delete_by_doctor"
  on public.patients for delete
  using (
    doctor_id in (
      select id from public.doctors where user_id = auth.uid()
    )
  );
