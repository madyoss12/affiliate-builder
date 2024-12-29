-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users profiles table
create table profiles (
    id uuid references auth.users primary key,
    name text,
    avatar_url text,
    subscription_tier text default 'free',
    subscription_status text default 'active',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create sites table
create table sites (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users not null,
    name text not null,
    description text,
    domain jsonb not null,
    template text not null,
    settings jsonb default '{}'::jsonb,
    status text default 'draft',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create pages table
create table pages (
    id uuid default uuid_generate_v4() primary key,
    site_id uuid references sites on delete cascade not null,
    title text not null,
    slug text not null,
    content jsonb not null,
    meta jsonb default '{}'::jsonb,
    status text default 'draft',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(site_id, slug)
);

-- Create statistics table
create table statistics (
    id uuid default uuid_generate_v4() primary key,
    site_id uuid references sites on delete cascade not null,
    date date not null,
    visitors integer default 0,
    pageviews integer default 0,
    conversions integer default 0,
    revenue numeric(10,2) default 0.00,
    data jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create templates table
create table templates (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    preview_url text,
    thumbnail_url text,
    category text not null,
    features jsonb default '[]'::jsonb,
    settings jsonb default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table profiles enable row level security;
alter table sites enable row level security;
alter table pages enable row level security;
alter table statistics enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

-- Sites policies
create policy "Users can view their own sites"
    on sites for select
    using (auth.uid() = user_id);

create policy "Users can create sites"
    on sites for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own sites"
    on sites for update
    using (auth.uid() = user_id);

create policy "Users can delete their own sites"
    on sites for delete
    using (auth.uid() = user_id);

-- Pages policies
create policy "Users can view pages of their sites"
    on pages for select
    using (
        exists (
            select 1 from sites
            where sites.id = pages.site_id
            and sites.user_id = auth.uid()
        )
    );

create policy "Users can create pages for their sites"
    on pages for insert
    with check (
        exists (
            select 1 from sites
            where sites.id = pages.site_id
            and sites.user_id = auth.uid()
        )
    );

create policy "Users can update pages of their sites"
    on pages for update
    using (
        exists (
            select 1 from sites
            where sites.id = pages.site_id
            and sites.user_id = auth.uid()
        )
    );

create policy "Users can delete pages of their sites"
    on pages for delete
    using (
        exists (
            select 1 from sites
            where sites.id = pages.site_id
            and sites.user_id = auth.uid()
        )
    );

-- Statistics policies
create policy "Users can view statistics of their sites"
    on statistics for select
    using (
        exists (
            select 1 from sites
            where sites.id = statistics.site_id
            and sites.user_id = auth.uid()
        )
    );

-- Functions
create or replace function handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, name)
    values (new.id, new.raw_user_meta_data->>'name');
    return new;
end;
$$ language plpgsql security definer;

-- Triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure handle_new_user();
