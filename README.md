# Client-Side Router

## RouterProvider

The `RouterProvider` component is the main provider for the routing setup. In takes in the `router` configuration, a `Layout` component that wraps the routes, and an optional `useHash` flag for hash-based routing.

```jsx
import RouterProvider from './Router';

import Layout from 'ui';
import HomePage from 'pages';
import AboutPage from 'pages';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
];

export default function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}
```

## useRouter

The `useRouter` hook allows you to access the router context, which provides the current path, the `navigate` function, and the loading state.

```jsx
import { useRouter } from './Router';

function UserProfile() {
  const { currentPath, navigate, loading } = useRouter();

  if (loading) return <div>Loading...</div>;

  return null;
}
```

## Link

The `Link` component creates navigable links within the application. It uses the navigate function from the router context to change routes without reloading the page.

```jsx
import { Link } from './Router';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="About">About</Link>
    </nav>
  );
}
```
