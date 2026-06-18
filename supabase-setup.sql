-- Table des sessions de draft
create table if not exists draft_sessions (
  id text primary key,
  players jsonb not null default '[]',
  status text not null default 'setup',
  created_at timestamptz default now()
);

-- Table des picks
create table if not exists draft_picks (
  id uuid primary key default gen_random_uuid(),
  session_id text references draft_sessions(id) on delete cascade,
  player_name text not null,
  picked_by text not null,
  nationality text not null,
  position text not null,
  turn_index integer not null,
  created_at timestamptz default now()
);

-- Activer Realtime sur les deux tables
alter publication supabase_realtime add table draft_sessions;
alter publication supabase_realtime add table draft_picks;

-- RLS (Row Level Security) — accès public pour simplifier
alter table draft_sessions enable row level security;
alter table draft_picks enable row level security;

create policy "public read sessions" on draft_sessions for select using (true);
create policy "public insert sessions" on draft_sessions for insert with check (true);
create policy "public update sessions" on draft_sessions for update using (true);

create policy "public read picks" on draft_picks for select using (true);
create policy "public insert picks" on draft_picks for insert with check (true);
