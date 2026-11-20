
create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id)
    on delete cascade,
  public_key text,
  created_at timestamptz default now()
);

create table public.private_rooms (
  id uuid primary key default gen_random_uuid(),
  name text default 'BLACKROOM',
  created_at timestamptz default now()
);

create table public.room_members (
  room_id uuid references public.private_rooms(id)
    on delete cascade,
  user_id uuid references auth.users(id)
    on delete cascade,
  joined_at timestamptz default now(),
  primary key (room_id, user_id)
);

create table public.encrypted_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.private_rooms(id)
    on delete cascade,
  sender_id uuid not null references auth.users(id),
  ciphertext text not null,
  nonce text not null,
  created_at timestamptz default now()
);

create index messages_room_time
on public.encrypted_messages(room_id, created_at);

alter table public.profiles enable row level security;
alter table public.private_rooms enable row level security;
alter table public.room_members enable row level security;
alter table public.encrypted_messages enable row level security;

create policy "Read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Insert own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

create policy "Read rooms as member"
on public.private_rooms for select
to authenticated
using (
  exists (
    select 1 from public.room_members m
    where m.room_id = id
    and m.user_id = auth.uid()
  )
);

create policy "Read own membership"
on public.room_members for select
to authenticated
using (user_id = auth.uid());

create policy "Read messages as member"
on public.encrypted_messages for select
to authenticated
using (
  exists (
    select 1 from public.room_members m
    where m.room_id = encrypted_messages.room_id
    and m.user_id = auth.uid()
  )
);

create policy "Send encrypted messages"
on public.encrypted_messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.room_members m
    where m.room_id = encrypted_messages.room_id
    and m.user_id = auth.uid()
  )
);

alter publication supabase_realtime
add table public.encrypted_messages;
