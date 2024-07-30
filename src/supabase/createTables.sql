-- * Create the 'users' table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- * Create the 'blogs' table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description Text NOT NULL,
    tldr Text NOT NULL,
    content TEXT NOT NULL,
    -- image_url VARCHAR(500) NOT NULL,
    image VARCHAR(500) NOT NULL,
    image_id uuid NOT NULL,
    readCount INTEGER NOT NULL DEFAULT 0,
    author_id INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Create the 'comments' table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    blog_id INTEGER NOT NULL,
    author_id INTEGER DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Create the 'tags' table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Create the 'blog_tags' table to handle the many-to-many relationship between blogs and tags
CREATE TABLE blog_tags (
    blog_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (blog_id, tag_id),
    FOREIGN KEY (blog_id) REFERENCES blogs(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Create the trigger function
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

--  Create the trigger for each table that has updatedAt  column
-- update updatedAt column in the users table 
CREATE TRIGGER update_users_updated_at BEFORE
UPDATE
    ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- update updatedAt column in the blogs table 
CREATE TRIGGER update_blogs_updated_at BEFORE
UPDATE
    ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- update updatedAt column in the comment table 
CREATE TRIGGER update_comments_updated_at BEFORE
UPDATE
    ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
