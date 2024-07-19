// UserType definition
type UserType = {
  id: number;
  name: string;
  email: string;
  posts: BlogType[];
  createdAt: Date;
  comments: CommentType[];
}

// BlogType definition
type BlogType = {
  id: number;
  slug: string;
  title: string;
  description: string;
  tldr: string;
  content: string;
  image: string;
  tags: TagType[];
  readCount: number;
}

// TagType definition
type TagType = {
  id: number;
  title: string;
  slug: string;
  blogPosts: BlogType[];
}

// CommentType definition
type CommentType = {
  id: number;
  content: string;
  blogPost: BlogType;
}

// Usage Example
export const exampleUser: UserType = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  posts: [],
  createdAt: new Date(),
  comments: []
};

export const exampleBlog: BlogType = {
  id: 1,
  slug: "example-blog",
  title: "Example Blog",
  description: "This is an example blog.",
  tldr: "Example blog tldr",
  content: "This is the content of the example blog.",
  image: "example.jpg",
  tags: [],
  readCount: 0
};

export const exampleTag: TagType = {
  id: 1,
  title: "Example Tag",
  slug: "example-tag",
  blogPosts: []
};

export const exampleComment: CommentType = {
  id: 1,
  content: "This is an example comment.",
  blogPost: exampleBlog
};
