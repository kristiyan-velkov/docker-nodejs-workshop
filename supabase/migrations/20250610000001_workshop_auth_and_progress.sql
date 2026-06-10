-- Workshop: profiles, task progress, questions
-- Run in Supabase Dashboard → SQL Editor (or supabase db push)

-- ---------------------------------------------------------------------------
-- Profiles (role: participant | admin)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'participant'
    check (role in ('participant', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Workshop users; set role = admin in Table Editor for instructors';

-- ---------------------------------------------------------------------------
-- Per-task progress (synced from workshop UI timers)
-- ---------------------------------------------------------------------------
create table if not exists public.task_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  task_id integer not null check (task_id between 1 and 10),
  elapsed_time integer not null default 0,
  completed boolean not null default false,
  completion_time integer,
  updated_at timestamptz not null default now(),
  unique (user_id, task_id)
);

create index if not exists task_progress_user_id_idx on public.task_progress (user_id);
create index if not exists task_progress_task_id_idx on public.task_progress (task_id);

-- ---------------------------------------------------------------------------
-- Participant questions
-- ---------------------------------------------------------------------------
create table if not exists public.workshop_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  task_id integer check (task_id is null or task_id between 1 and 10),
  message text not null check (char_length(trim(message)) > 0),
  created_at timestamptz not null default now()
);

create index if not exists workshop_questions_user_id_idx on public.workshop_questions (user_id);
create index if not exists workshop_questions_created_at_idx on public.workshop_questions (created_at desc);

-- ---------------------------------------------------------------------------
-- Auto-create profile on sign-up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'participant'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists task_progress_updated_at on public.task_progress;
create trigger task_progress_updated_at
  before update on public.task_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS helpers
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.task_progress enable row level security;
alter table public.workshop_questions enable row level security;

-- profiles
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid()));

create policy "Admins update any profile role"
  on public.profiles for update
  using (public.is_admin());

-- task_progress
create policy "Users manage own progress"
  on public.task_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Admins read all progress"
  on public.task_progress for select
  using (public.is_admin());

-- workshop_questions
create policy "Users insert own questions"
  on public.workshop_questions for insert
  with check (auth.uid() = user_id);

create policy "Users read own questions"
  on public.workshop_questions for select
  using (auth.uid() = user_id);

create policy "Admins read all questions"
  on public.workshop_questions for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Make yourself admin (replace email after first sign-up):
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- ---------------------------------------------------------------------------
