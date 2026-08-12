create extension if not exists pgcrypto;

create table if not exists public.suggestions (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 5 and 120),
  description text not null check (char_length(description) between 10 and 2000),
  author_name text not null check (char_length(author_name) between 2 and 80),
  apartment text not null check (char_length(apartment) between 1 and 20),
  tower text not null check (tower in ('Torre 1', 'Torre 2')),
  category text not null check (category in ('Manutenção', 'Segurança', 'Convivência', 'Lazer', 'Melhorias', 'Outros')),
  status text not null default 'Nova' check (status in ('Nova', 'Em análise', 'Em andamento', 'Concluída')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.suggestion_votes (
  suggestion_id uuid not null references public.suggestions(id) on delete cascade,
  voter_id uuid not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (suggestion_id, voter_id)
);

create index if not exists suggestions_created_at_idx on public.suggestions (created_at desc);
create index if not exists suggestion_votes_suggestion_id_idx on public.suggestion_votes (suggestion_id);

-- O painel acessa as tabelas somente pela API do Next usando a service role.
-- O RLS continua habilitado para impedir acesso direto pelas chaves públicas.
alter table public.suggestions enable row level security;
alter table public.suggestion_votes enable row level security;

revoke all on table public.suggestions from anon, authenticated;
revoke all on table public.suggestion_votes from anon, authenticated;
