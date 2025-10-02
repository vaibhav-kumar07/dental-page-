-- Update the trigger function to include all profile fields
create or replace function public.handle_new_doctor()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.doctors (
    user_id, 
    doctor_name, 
    designation, 
    clinic_name,
    contact_phone,
    contact_email
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'doctor_name', 'New Doctor'),
    coalesce(new.raw_user_meta_data ->> 'designation', 'Doctor'),
    coalesce(new.raw_user_meta_data ->> 'clinic_name', 'Clinic'),
    new.raw_user_meta_data ->> 'contact_phone',
    new.raw_user_meta_data ->> 'contact_email'
  )
  on conflict (user_id) do update set
    doctor_name = excluded.doctor_name,
    designation = excluded.designation,
    clinic_name = excluded.clinic_name,
    contact_phone = excluded.contact_phone,
    contact_email = excluded.contact_email;

  return new;
end;
$$;

-- Recreate the trigger
drop trigger if exists on_auth_doctor_created on auth.users;

create trigger on_auth_doctor_created
  after insert on auth.users
  for each row
  execute function public.handle_new_doctor();
