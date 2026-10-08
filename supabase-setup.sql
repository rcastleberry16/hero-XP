create table if not exists public.hero_state (user_id uuid primary key references auth.users(id) on delete cascade, payload jsonb not null, updated_at timestamptz not null default now());
alter table public.hero_state enable row level security;
create policy "Teacher select" on public.hero_state for select to authenticated using ((select auth.uid())=user_id);
create policy "Teacher insert" on public.hero_state for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Teacher update" on public.hero_state for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
