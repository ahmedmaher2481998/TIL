
----------Functions ------------------------------------------------------------------------------------------------------------------------------

-- Create the trigger function
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;

END;

$$ LANGUAGE plpgsql;

--  Create the trigger for each table that has updatedAt  column
-- update updatedAt column in the blogs table 
CREATE TRIGGER update_blogs_updated_at BEFORE
UPDATE
    ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- update updatedAt column in the comment table 
CREATE TRIGGER update_comments_updated_at BEFORE
UPDATE
    ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


    -- creating function for creating new blog post and attaching tags in the same db call (transaction in away of the supabase )
    -- drop if it's already defined 
    DROP FUNCTION IF EXISTS create_blog_with_tags (
    VARCHAR(500),
    VARCHAR(255),
    text,
    text,
    text,
    VARCHAR(500),
    uuid,
    uuid,
    integer []
);

CREATE OR REPLACE FUNCTION create_blog_with_tags (
    blog_title VARCHAR(500),
    blog_slug VARCHAR(255),
    blog_description TEXT,
    blog_tldr TEXT,
    blog_content TEXT,
    blog_image_url VARCHAR(500),
    blog_image_id UUID,
    blog_author_id UUID,
    blog_tag_ids INTEGER []
) RETURNS TABLE (
    id INTEGER,
    title VARCHAR(500),
    slug VARCHAR(255),
    description TEXT,
    tldr TEXT,
    content TEXT,
    image_url VARCHAR(500),
    image_id UUID,
    read_count INTEGER,
    author_id UUID,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
DECLARE
    blog_id INTEGER;
    tag_id_var INTEGER;
BEGIN
    -- Insert a new blog into the "blogs" table
    INSERT INTO blogs (
        title,
        slug,
        description,
        tldr,
        content,
        image_url,
        image_id,
        author_id
    ) VALUES (
        blog_title,
        blog_slug,
        blog_description,
        blog_tldr,
        blog_content,
        blog_image_url,
        blog_image_id,
        blog_author_id
    ) RETURNING blogs.id INTO blog_id;

    -- Insert tags into the "blog_tags" table
    FOREACH tag_id_var IN ARRAY blog_tag_ids LOOP
        INSERT INTO blog_tags (blog_id, tag_id)
        VALUES (blog_id, tag_id_var);
    END LOOP;

    -- Return the newly inserted blog post row
    RETURN QUERY
    SELECT
    blogs.id ,
    blogs.title ,
    blogs.slug ,
    blogs.description,
    blogs.tldr,
    blogs.content,
    blogs.image_url ,
    blogs.image_id,
    blogs.read_count,
    blogs.author_id,
    blogs.created_at,
    blogs.updated_at 
    FROM blogs
    WHERE blogs.id = blog_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_profile_from_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new profile into the profiles table with the corresponding user_id
  INSERT INTO public.profiles (author_id, email, user_metadata)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE OR REPLACE FUNCTION update_profiles_from_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the profiles table with the new data from auth.users
  UPDATE public.profiles
  SET
    email = NEW.email, -- Update email or any other fields that should be synced
    user_metadata = New.raw_user_meta_data,
    -- Add other fields as necessary
    updated_at = NOW() -- Optional: update a timestamp for last modification
  WHERE
    author_id = NEW.id; -- Assumes profiles.id matches auth.users.id

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;




CREATE TRIGGER trigger_create_profile
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile_from_user();


CREATE TRIGGER trigger_update_profiles
AFTER UPDATE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION update_profiles_from_users();
