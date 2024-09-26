# Vue 3 Blogging Platform

This is a feature-rich blogging platform built with Vue 3, using chadcn-vue, Supabase, and TypeScript.

## Features

- User authentication with Google login
- Create, read, update, and delete blog posts
- Markdown support for writing blog posts
- View tracking for blog posts
- Tag management for blog posts
- User profiles
- Dark mode support
- File storage using Supabase Storage
- Transaction-like operations using PostgreSQL functions

## Technology Stack

- Vue 3
- TypeScript
- Supabase for backend, authentication, and file storage
- PostgreSQL functions for complex database operations
- chadcn-vue for UI components
- Markdown parser for blog post content
- Vitest for unit testing
- Vue Test Utils for component testing

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up your Supabase project and add the credentials to your environment variables
4. Set up Supabase Storage buckets for file uploads
5. Create necessary PostgreSQL functions in your Supabase project
6. Run the development server: `pnpm run dev`

## Testing

This project uses Vitest for unit testing and Vue Test Utils for component testing.

To run unit tests:
`pnpm run test:unit`

To run tests with coverage:
`pnpm run test:unit:coverage`
To run E2E tests:
`pnpm run test:e2e`

## Project Structure

- `src/components`: Vue components
- `src/stores`: Pinia stores for state management
- `src/composables`: Reusable Vue composition functions
- `src/router`: Vue Router configuration
- `.spec.ts`: Test files
- `cypress` : E2E tests

## Key Components to Tested

1. Authentication components (e.g., LoginWithGoogle)
2. Blog post components (CreateBlogForms, MediaUpload)
3. Tag management components
4. User profile components
5. Navigation components
   <!-- 6. Comment system components adding -->
   <!-- 7. Search functionality adding -->
   <!-- 8. Pagination component adding -->
6. Rich text editor component

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
