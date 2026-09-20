-- Ce script est idempotent : tu peux le relancer en entier sans risque,
-- même si une partie du schéma existe déjà.

-- Table des sessions de draft
create table if not exists draft_sessions (
  id text primary key,
  players jsonb not null default '[]',
  status text not null default 'setup',
  game_mode text not null default 'remote',
  banned_nationality text,
  coaches jsonb not null default '{}',
  competition text not null default 'cdm',
  created_at timestamptz default now()
);

alter table draft_sessions add column if not exists game_mode text not null default 'remote';
alter table draft_sessions add column if not exists banned_nationality text;
alter table draft_sessions add column if not exists coaches jsonb not null default '{}';
-- Existing sessions predate multi-competition support and were all CDM games.
alter table draft_sessions add column if not exists competition text not null default 'cdm';

-- Table des picks
create table if not exists draft_picks (
  id uuid primary key default gen_random_uuid(),
  session_id text references draft_sessions(id) on delete cascade,
  player_name text not null,
  picked_by text not null,
  nationality text not null,
  position text not null,
  turn_index integer not null,
  pos_x numeric,
  pos_y numeric,
  created_at timestamptz default now()
);

alter table draft_picks add column if not exists pos_x numeric;
alter table draft_picks add column if not exists pos_y numeric;

-- Table des notes (une note par pick et par votant)
create table if not exists draft_ratings (
  id uuid primary key default gen_random_uuid(),
  session_id text references draft_sessions(id) on delete cascade,
  pick_id uuid references draft_picks(id) on delete cascade,
  rated_by text not null,
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz default now(),
  unique (pick_id, rated_by)
);

-- Table des votes finaux (une équipe notée sur 4 critères, par chaque autre joueur)
create table if not exists draft_team_votes (
  id uuid primary key default gen_random_uuid(),
  session_id text references draft_sessions(id) on delete cascade,
  team_player text not null,
  voted_by text not null,
  technique integer not null check (technique between 1 and 5),
  ambiance integer not null check (ambiance between 1 and 5),
  audace integer not null check (audace between 1 and 5),
  beau_jeu integer not null check (beau_jeu between 1 and 5),
  created_at timestamptz default now(),
  unique (session_id, team_player, voted_by)
);

-- Realtime sur les quatre tables (ignore si déjà activé)
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'draft_sessions') then
    alter publication supabase_realtime add table draft_sessions;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'draft_picks') then
    alter publication supabase_realtime add table draft_picks;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'draft_ratings') then
    alter publication supabase_realtime add table draft_ratings;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'draft_team_votes') then
    alter publication supabase_realtime add table draft_team_votes;
  end if;
end $$;

-- RLS (Row Level Security) : accès public pour simplifier
alter table draft_sessions enable row level security;
alter table draft_picks enable row level security;
alter table draft_ratings enable row level security;
alter table draft_team_votes enable row level security;

drop policy if exists "public read sessions" on draft_sessions;
create policy "public read sessions" on draft_sessions for select using (true);
drop policy if exists "public insert sessions" on draft_sessions;
create policy "public insert sessions" on draft_sessions for insert with check (true);
drop policy if exists "public update sessions" on draft_sessions;
create policy "public update sessions" on draft_sessions for update using (true);

drop policy if exists "public read picks" on draft_picks;
create policy "public read picks" on draft_picks for select using (true);
drop policy if exists "public insert picks" on draft_picks;
create policy "public insert picks" on draft_picks for insert with check (true);
drop policy if exists "public update picks" on draft_picks;
create policy "public update picks" on draft_picks for update using (true);

drop policy if exists "public read ratings" on draft_ratings;
create policy "public read ratings" on draft_ratings for select using (true);
drop policy if exists "public insert ratings" on draft_ratings;
create policy "public insert ratings" on draft_ratings for insert with check (true);
drop policy if exists "public update ratings" on draft_ratings;
create policy "public update ratings" on draft_ratings for update using (true);

drop policy if exists "public read team votes" on draft_team_votes;
create policy "public read team votes" on draft_team_votes for select using (true);
drop policy if exists "public insert team votes" on draft_team_votes;
create policy "public insert team votes" on draft_team_votes for insert with check (true);
drop policy if exists "public update team votes" on draft_team_votes;
create policy "public update team votes" on draft_team_votes for update using (true);
