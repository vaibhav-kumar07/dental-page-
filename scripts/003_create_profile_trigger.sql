-- Auto-create a doctor profile when a user signs up
create or replace function public.handle_new_doctor()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.doctors (user_id, doctor_name, designation, clinic_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'doctor_name', 'New Doctor'),
    coalesce(new.raw_user_meta_data ->> 'designation', 'Doctor'),
    coalesce(new.raw_user_meta_data ->> 'clinic_name', 'Clinic')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_doctor_created on auth.users;

create trigger on_auth_doctor_created
  after insert on auth.users
  for each row
  execute function public.handle_new_doctor();
