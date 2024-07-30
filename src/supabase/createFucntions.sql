
----------Functions ------------------------------------------------------------------------------------------------------------------------------

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
    integer,
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
    blog_author_id INTEGER,
    blog_tag_ids INTEGER []
) RETURNS TABLE (
    id INTEGER,
    title VARCHAR(500),
    slug VARCHAR(255),
    description TEXT,
    tldr TEXT,
    content TEXT,
    image VARCHAR(500),
    image_id UUID,
    read_count INTEGER,
    author_id INTEGER,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
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
        image,
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
    blogs.image ,
    blogs.image_id,
    blogs.read_count,
    blogs.author_id,
    blogs.createdAt,
    blogs.updatedAt 
    FROM blogs
    WHERE blogs.id = blog_id;
END;
$$ LANGUAGE plpgsql;