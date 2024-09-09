
-- create clone of the public data of authors that needed to displayed 
DROP TABLE  IF EXISTS public.profiles CASCADE;
create table public.profiles (
  id int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  user_metadata jsonb,
  email text,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
alter table public.profiles enable row level security;




-- * Create the 'blogs' table
DROP TABLE  IF EXISTS public.blogs  CASCADE;
CREATE TABLE public.blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    featured BOOLEAN DEFAULT false,
    slug VARCHAR(255) NOT NULL,
    description Text NOT NULL,
    tldr Text NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_id uuid NOT NULL,
    read_count INTEGER NOT NULL DEFAULT 0,
    author_id uuid NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES profiles(user_id),
    FOREIGN KEY (image_id) REFERENCES storage.objects(id)
);
alter table public.blogs enable row level security;
-- Create the 'comments' table
DROP TABLE  IF EXISTS public.comments CASCADE;
CREATE TABLE public.comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    blog_id INTEGER NOT NULL,
    author_id uuid NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (author_id) REFERENCES auth.users(id)
);
alter table public.comments enable row level security;
-- Create the 'tags' table
DROP TABLE  IF EXISTS public.tags CASCADE;
CREATE TABLE public.tags (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);
alter table public.tags enable row level security;

-- Create the 'blog_tags' table to handle the many-to-many relationship between blogs and tags
DROP TABLE  IF EXISTS public.blog_tags CASCADE;
CREATE TABLE public.blog_tags (
    blog_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (blog_id, tag_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
alter table public.blog_tags enable row level security;


-- create table as many to many relationship between blogs and users to track readers 
DROP TABLE  IF EXISTS public.blog_readers CASCADE;
CREATE TABLE blog_readers (
  blog_id int REFERENCES public.blogs(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, user_id)
);
alter table public.blog_readers enable row level security;