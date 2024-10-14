# TIL

### **App Progress**

- [x] Set up Supabase and blog creation.

- [x] Integrate Pinia for state management.

- [x] Add authentication (login, signup, logout).

- [x] Support OAuth and email-password authentication.

- [x] Hide authentication tokens from redirect URLs after Supabase auth.

- [x] Create the main page layout.

- [x] Implement blog card component with links.

- [x] Display blog cards and blogs on the home page.

- [x] Ensure featured blogs section functions as required.

- [x] Implement the "View Blog" page.

- [x] Complete the "View Single Blog" page.

- [x] Redesign tag selector, including a complete rework of architecture and store management.

- [x] Add functionality for tags: creation, filtering blogs by tag, etc.

- [x] Implement "Add Tag" as a pop-up feature.

- [x] Style the "Add New Blog" page with fixed themes and colors.

- [x] Improve the layout and style of the "Create New Blog" page.

- [x] Fix styles on the home page, "Create Blog" page, and "Display Blogs by Tag" page.

- [x] Implement profile editing as a pop-up.

- [x] Adjust overall layout and style (utilizing dark themes).

- [x] Add support for light and dark themes.

- [x] upon changing avatar the previous avatar is not deleted

- [x] view blogs by tag page

- [x] view all blog posts page

- [x] view all tags in the home page

- [x] view all blog posts written by author when clicking on author

- [x] Implement a blog views tracker (RLS issue) solved using psq functions.

- [x] display view counts for Each blog(card & blog page)

- [x] fix build step

- [x] Create the user profile page with activity tracking.

- [x] FIX image upload functionality

- [x] write a read me for the whole app [ AppImage / Video ] & lunch it on reddit /linked/twitter
- [ ] Patching the platform for better user experience

  - [ ] @ register success message & loading indicator
  - [ ] allow account removal
  - [ ] @ add privacy policy and terms of use
  - [ ] @ (HTML) avoid duplicated id attributes
  - [ ] @ add list-style: initial or remove list-style: none (md Content)
  - [ ] @ add footer link
  - [ ] fix wide posts text contrast (index page) (light theme)
  - [ ] fix invisible scroll thumb in dropdown list (post form) (dark theme)
  - [ ] capitalize text in buttons (auth, post form, profile form)
  - [ ] fix loading user name in profile form
  - [ ] user can edit his posts
  - [ ] fix scrolling the dropdown list
  - [ ] user can draft published posts
  - [ ] checkbox to confirm "I confirm I have obtained legal rights to use this image" for cover image auto un-check after image selection
  - [ ] before allowing user to publish any post make sure their email is verified
  - [ ] after verifying user email - request writing permission on the platform

    - [ ] manually granted by super admin (aka me ;)
    - [ ] all posts after writing require approval before publish - if account is not yet verified as safe account

  - [ ] verify post content for bad words / links (white list domain)
  - [ ] round new features for this platform to make it more unique

- [x] error handling creating a new blog & loading indicator

- [ ] add more unit tests for shared components & stores

  - [ ] pinia stores auth , blog , pop-up tags
  - [ ] components
    - [ ] this
    - [ ] auth [register ,logout,updateUser,user menu]
    - [ ] blog :
      - [ ] newBlog: {createNewTag , formInputField,MDContentInput,tagSelector},
      - [ ] displaySingleBlog: { displaySingleBlog ,tagChip ? },
      - [ ] BlogCard,
      - [ ] TagChip
    - [ ] home [blogGrid , main/secondary featured section ,tagScrollArea ]
    - [ ] my-account blogCards[cerated /visited] , user profile
    - [ ] shared footer?,imageUpload(important),loaderComponent,NavBarComponent,popUp
    - [ ] check for the existence of the required components
  - [ ] vue router (test navigation)
  - [ ] supabase setup file and it's utilities

- [ ] verify preCommit is working as intended

- [ ] add more end to end tests for all features

  - [ ] User Can Sign in / out / up (Auth)
  - [ ] User Can view blog (single,by tag , author)
  - [ ] user can create Blog

  ***

### **Upcoming Tasks**

- [ ] pagination on the blog grid(home page,tags page,blog page,profile page) any where we fetch a lot of blogs

- [ ] Persist blog data on un-mounting the app

- [ ] Add a comment section for each blog.

- [ ] Support anonymous or authenticated user comments.

- [ ] Display loaders for registration, sign-in, blog creation, profile updates, and tag creation.

- [ ] Enable image uploads within blog content.

- [ ] Allow anonymous commenting.

- [ ] Add tag filters on the homepage.

- [ ] Implement pagination on the homepage.

- [ ] Filter blogs by author.

- [ ] Add a "like" feature for blogs.

- [ ] Refine the grid layout for blogs.

- [ ] Resolve conflicts between TagChip component and TagChipComponent.

- [ ] Write unit tests and end-to-end (e2e) tests.

- [ ] Iterate and refine the project.
