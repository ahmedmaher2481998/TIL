#### 1 - Identify Core Responsibilities
- What does the component render? (UI)
- What data does it manage? (state/props)
- What interactions does it handle? (events)
- What external dependencies does it interact with? (APIs, Vuex, Pinia, etc.)
 

***
 ### 2. Test Component Output (Rendering)
You should verify that the component renders correctly based on its state and props. This involves testing:

> Default render: Does the component render correctly when it mounts?
Conditional rendering: Does it render the correct DOM elements based on different states or props?
***

### 3. Test Component State (Props and Data)
Ensure that props and internal component state (data) work as expected.

> Props validation: Test that props are passed and handled correctly.
Internal state: Verify how internal data changes affect the rendered output.
***

### 4. Test User Interactions

Check how the component responds to user actions like clicks, typing, and other DOM events.

> Events: Test methods and emitted events when the user interacts with the component

***
### 5. Test Method Logic
If the component has methods with business logic, test them to ensure they behave as expected.

> Testing Methods: You can test component methods directly or test the effects of the methods by triggering user actions.
***
### 6. Test Lifecycle Hooks
> If your component uses lifecycle hooks like mounted, created, etc., you can test the effects they have on the component’s behavior. For example, you may want to ensure that API calls are made on mounted or that initial data is set properly.
***
### 7. Test External Dependencies (Pinia)
> If the component interacts with  Pinia, or external services (like API calls),
> test:
- Actions and mutations: Test that Vuex actions/mutations are dispatched or committed as expected.
- Dependency injection: Ensure that injected dependencies are used correctly.

***
### 8. Test Edge Cases
> Think of edge cases like:
> How does the component behave with invalid or missing props?
> What happens when a user tries an unexpected action?

***

### Summary of Things to Test:
1.  Render output based on state/props.
2.  State management (internal data and props).
3.  User interactions (events, clicks, typing).
4.  Component methods (their logic and effects).
5.  Lifecycle hooks (like mounted, created).
6.  External dependencies (Vuex, Pinia, API calls).
7.  Edge cases (unexpected input or actions)