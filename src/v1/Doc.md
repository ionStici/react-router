# Client-Side Router

v1

## Features

- Static routes
- Catch-all route for non-existent url paths
- `Link` element : navigation without reloading the page
- `currentPath` : access to the current url path
- `navigate` : function for imperative navigation

## RouterProvider

The `RouterProvider` component handles the routing setup, it takes in:

1. The `router` configuration (array containing object routes).
2. A `Layout` component that wraps all the routes (optional).
3. An optional `useHash` flag for hash-based routing.

```jsx
import RouterProvider from './Router';

import { Layout, HomePage, AboutPage } from 'pages';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
];

export default function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}
```

## Defining Routes

Routes are defined in the `router` array, passed to `RouterProvider`. Each route object should include:

1. `path` : the path for the route.
2. `render` : the component to render the route.

```jsx
const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/team/:name', render: TeamPage },
  { path: '*', render: NotFoundPage },
];
```

An object route that contains a wildcard path can be used for catch-all routes.

## Link

The `Link` component creates navigable links within the application. It uses the `navigate` function from the router context to change the routes without reloading the page.

```jsx
import { Link } from './Router';

function Navigation() {
  return <Link to="/about">About</Link>;
}
```

## useRouter

The `useRouter` hook allows you to access the router context, which provides the current path and the `navigate` function.

```jsx
import { useRouter } from './Router';

function UserProfile() {
  const { currentPath, navigate } = useRouter();

  // ...
}
```
