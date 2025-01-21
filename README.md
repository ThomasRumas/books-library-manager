# A simple repository to compare React (Next) and Vue (Nuxt)! 

In this repository, we will create the same website with the same service: 
* Boostrap 5 for our UI
* Prisma ORM with SQLite database
* Open Library API to seach books
* SASS and Typescript

The website will have theses features:
* Login and Registration 
* Search books on Open Library API
* List added books inside user's library


## React and Vue comparaison

| Feature                           | React 19                                                                                      | Vue 3                                                                                   |
|-----------------------------------|----------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| **Reactivity Model**              | Declarative UI updates using the Virtual DOM. State and props trigger component updates.    | Reactivity system with a Proxy-based implementation for fine-grained reactivity.       |
| **Rendering Performance**         | Automatic batching for updates to reduce renders.                                           | Reactive rendering with fine-grained dependency tracking for minimal re-renders.       |
| **SSR and Hydration**             | Server-side rendering (SSR) with hydration and a streaming API for improved performance.    | Native support for SSR with efficient hydration. Partial hydration via plugins.        |
| **Composition API**               | Not available (uses hooks for logic reuse).                                                 | Composition API for reusing stateful logic across components.                          |
| **Hooks**                         | Rich set of hooks (e.g., `useState`, `useEffect`, `useReducer`).                            | Provides Composition API and `setup` function for similar purposes.                   |
| **TypeScript Support**            | Fully supported with type definitions, but requires manual setup.                          | Fully supported with type definitions and seamless integration.                        |
| **State Management**              | Built-in Context API for global state management; third-party libraries like Redux popular. | Pinia (official library) for state management.          |
| **Concurrent Rendering**          | Concurrent rendering with Suspense and transitions.                                         | Reactive rendering with efficient dependency tracking (similar in performance).        |
| **Built-in Transitions**          | Requires third-party libraries for animations (e.g., Framer Motion).                       | Built-in transition system for animations and effects.                                 |
| **Tooling**                       | React Developer Tools, Create React App, Vite, and Next.js.                                | Vue Developer Tools, Vue CLI, Vite, and Nuxt.js.                                       |
| **Ecosystem and Libraries**       | Large ecosystem with libraries like Redux, React Query, and React Router.                  | Smaller but robust ecosystem with libraries like Vue Router and Vuex/Pinia.           |
| **Template Syntax**               | JSX for templating, providing full JavaScript capabilities.                                | Dedicated template syntax with directives and bindings, or JSX optionally.             |
| **Learning Curve**                | Moderate learning curve due to JSX and hooks.                                               | Lower learning curve due to simpler syntax and clearer state management tools.         |
| **Size**                          | Core library size: ~42KB (gzip).                                                           | Core library size: ~13KB (gzip).                                                      |
| **Community and Support**         | Massive community and extensive third-party support.                                       | Smaller community compared to React but highly active and growing.                     |
| **Reactive Data Handling**        | Relies on state and props, with immutability enforced.                                      | Reactive data using `ref` and `reactive` for mutable state tracking.                   |
| **API Documentation**             | Highly detailed and beginner-friendly documentation.                                       | Clear, concise, and beginner-friendly documentation.                                   |
| **Advanced Features**             | Suspense, lazy loading, and streaming for SSR.                                              | Built-in transitions, slots, and directives for advanced UI design.                    |
| **Adoption**                      | Widely adopted for large-scale applications (e.g., Facebook, Instagram).                  | Popular in both small and large applications (e.g., Alibaba, Xiaomi).                  |
| **Flexibility**                   | Highly flexible, but can result in boilerplate code.                                       | Flexible but opinionated with built-in solutions for common patterns.                  |


## Next and Nuxt comparaison

| Feature                         | Next.js 15                                                                                           | Nuxt 3                                                                                             |
|---------------------------------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| **Rendering Modes**             | Supports SSG, SSR, and CSR.                                                                         | Supports SSG, SSR, and CSR with per-route rendering strategies.                                   |
| **Routing**                     | File-based routing with nested layouts and advanced patterns.                                       | File-based routing with conventions for complex views and interfaces.                             |
| **Data Fetching**               | Server and client data fetching with async capabilities in components.                             | Composables for fetching data, enabling various rendering methods.                                |
| **Server Actions**              | Server Actions allow secure server code execution without traditional APIs.                        | Server routes provide API endpoints and secure connections with third-party services.             |
| **Caching and Performance**     | Automatic optimizations for images, fonts, and scripts to improve Core Web Vitals.                 | Built-in optimizations for assets, styles, and scripts; supports CSS Modules and popular libraries. |
| **Development Tools**           | Includes Turbopack for faster builds, codemod CLI for upgrades, and enhanced Fast Refresh.          | Robust module ecosystem with auto-imports of helpers, composables, and Vue APIs, includes Vite for faster builds.                  |
| **TypeScript Support**          | TypeScript support for `next.config.ts` and enhanced type safety.                                  | Comprehensive TypeScript support for accurate type information.                                   |
| **Middleware**                  | Custom middleware for routing, authentication, and internationalization.                          | Middleware to execute code before rendering pages, useful for auth and localization.              |
| **Transitions**                 | Requires third-party libraries for animations and transitions.                                     | Built-in support for smooth transitions between layouts, pages, and components.                   |
| **Cookie Utilities**            | No built-in client-side cookie utilities. Requires third-party libraries for cookie management.    | Includes built-in utilities for managing cookies on both client and server.                       |
| **State Management**            | Requires third-party libraries like Redux, Zustand, or Recoil for state management.                | Provides built-in state management with `useState` that works seamlessly on both client and server. |
| **Module System**               | Does not have a module system like Nuxt.                                                           | Modules allow integration of third-party libraries or features (e.g., analytics, SEO) with minimal effort. |
| **Ecosystem and Integrations**  | Seamless Vercel integration and a wide range of plugins and extensions.                            | Flexible framework with a robust modules ecosystem for headless CMS, eCommerce, and databases.    |
| **Community and Support**       | Large community backed by Vercel, with regular updates and resources.                              | Active and growing community with worldwide contributions.                                        |
| **Learning Curve**              | Moderate, especially for developers familiar with React; extensive documentation available.         | Lower learning curve due to intuitive design and clear documentation.                             |
| **Latest Release Highlights**   | Features like codemod CLI, Turbopack, Async Request APIs, Server Actions, and improved TypeScript. | Focuses on hybrid rendering, auto-imports, server routes, and enhanced developer experience.       |

### Why These Features Are Useful in Nuxt

#### **Cookie Utilities in Nuxt**
- Nuxt provides built-in utilities to manage cookies both on the client and server, which simplifies authentication, session management, and persistent data storage.  
- Developers don’t need to install third-party libraries for basic cookie functionality, reducing dependency overhead and improving security.

#### **Module System in Nuxt**
- Nuxt’s module system allows developers to easily integrate functionality like analytics, SEO, or PWA support without manually setting up configurations.  
- Modules streamline adding and maintaining features by providing pre-built, extensible functionality that works out of the box.  
- Examples of popular Nuxt modules include:
  - `@nuxtjs/axios` for HTTP requests  
  - `@nuxtjs/auth-next` for authentication  
  - `@nuxt/image` for optimized image handling  

In comparison, Next.js requires more manual setup for cookies and lacks a native module system, which can make implementing some features more time-consuming.

### Why Built-in State Management in Nuxt is Useful

#### **Seamless State Management**
- In Nuxt, `useState` provides a simple and intuitive API for managing both client-side and server-side state.  
- Developers don’t need to install or configure external libraries like Redux, Zustand, or Recoil, making state management straightforward and integrated.

#### **Unified State Across Client and Server**
- Nuxt’s `useState` allows maintaining shared state between the server and client without additional boilerplate.  
- This is particularly useful for SSR and universal applications where state needs to persist seamlessly across rendering modes.

In contrast, Next.js requires third-party libraries for state management, which can increase complexity and setup time. This makes Nuxt a more out-of-the-box solution for projects that need straightforward state management.

## Web Performance comparaison

| Asset Type  | Nuxt (without compression) | Nuxt (GZIP)   | Next (GZIP)   |
|-------------|----------------------------|---------------|---------------|
| **DOM**     | 177 KB                     | 24.2KB        | 4.2 KB        |
| **CSS**     | -                          | 15.7 KB       | 25.3 KB       |
| **JS**      | -                          | 93.4 KB       | 120 KB        |

You can also find Lighthouse report performed on the same machine, both of solution respect Google Web Vitals. Next as a built-in support for GZIP compression for HTML therefore we do it manually inside [Nuxt](./nuxt-version/server/plugins/gzip.ts) 

## State of JS 2024

We will know compare last results of [State of JS Survey](https://2024.stateofjs.com/) about theses two frameworks and theses two meta-framework. 

### React 

React is still the one most used worldwide with a result of 82%, this score is stable since 3 years. Globally all the technical stack based on React is remaining alive. But when we've got a look interest, it continually to slown down to 34% this year, in 2022 the score was 47%! 
If we are now looking for the retention of developers on this stack, it's also stable since last year, and we've got a score of 75%. 

### VueJS 

VueJS is still the second framework used on the market with a usage of 51%, the same result as 2021, we can be agree, like React, that projects made with Vue are still alive. Also the interest of VueJS still remained the same since 2021 with a score of 48%. But there is growth in VueJS retention of 12%, passing from 75% to 87%, it's an interesting growth for a framework available since 8 years on the survey! 

### NextJS (React)

If we are looking about NextJS, it's still the meta framework the most used worldwide with 54% scoring, but interest fell by 22 points in 2 years from 65% to 43% in 2024! If we have a look on the retention it have the same tendancy, passing from 89% in 2022 to 68% in 2024. Therefore Vercel continues to improve their framework, interest and retention are going down quickly. 

### Nuxt (Vue)

Like VueJS, Nuxt is the second on the market with a usage of 22%, the Nuxt interest seems stable since 2020, it only lost 8% since, passing from 47% to 39%, but when it's interesting, the retention has grown a litle from last year, winning 5 points to be now 81%. 