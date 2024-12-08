-- Enable RLS
alter table profiles enable row level security;
alter table moves enable row level security;
alter table inventories enable row level security;

-- Create tables
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text not null,
  name text,
  phone text,
  address text,
  constraint profiles_email_key unique (email)
);

create table moves (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references profiles(id) on delete cascade not null,
  origin_address text not null,
  destination_address text not null,
  move_date date not null,
  status text check (status in ('pending', 'confirmed', 'in_progress', 'completed')) not null default 'pending',
  estimated_cost numeric(10,2) not null,
  actual_cost numeric(10,2)
);

create table inventories (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  move_id uuid references moves(id) on delete cascade not null,
  items jsonb not null default '[]'::jsonb
);

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view own moves"
  on moves for select
  using ( auth.uid() = user_id );

create policy "Users can insert own moves"
  on moves for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own moves"
  on moves for update
  using ( auth.uid() = user_id );

create policy "Users can view own inventories"
  on inventories for select
  using ( 
    exists (
      select 1 from moves
      where moves.id = inventories.move_id
      and moves.user_id = auth.uid()
    )
  );

create policy "Users can insert own inventories"
  on inventories for insert
  with check (
    exists (
      select 1 from moves
      where moves.id = inventories.move_id
      and moves.user_id = auth.uid()
    )
  );

create policy "Users can update own inventories"
  on inventories for update
  using (
    exists (
      select 1 from moves
      where moves.id = inventories.move_id
      and moves.user_id = auth.uid()
    )
  );

-- Create indexes
create index moves_user_id_idx on moves(user_id);
create index inventories_move_id_idx on inventories(move_id);