-- Add unique constraint to user_id if it doesn't exist
do $$ 
begin
  if not exists (
    select 1 from pg_constraint 
    where conname = 'doctors_user_id_key'
  ) then
    alter table public.doctors add constraint doctors_user_id_key unique (user_id);
  end if;
end $$;
