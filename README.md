# Client-Side Routing

## RouterProvider

The `RouterProvider` component handles the routing setup, it takes in:

1. The `router` configuration (array containing object routes).
2. A `Layout` component that wraps all the routes (optional).

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

1. `path` : the url path for the route.
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
  return (
    <Link to="/about" className="link" active="active">
      About
    </Link>
  );
}
```

The `active` prop expects a CSS class that will become available when the current URL path matches the `to` prop.

## useRouter and Route Props

The `useRouter` hook allows you to access the router context, which provides the following:

- `currentPath` : the current url path
- `navigate` : function for imperative navigation
- `setSearchParams` : function for setting search parameters

Every route component has access to the following props:

- `currentPath` : the current url path
- `dynamicParams` :
- `searchParams` :

```jsx
import { useRouter } from './Router';

function UserProfile({ currentPath, dynamicParams, searchParams }) {
  const { currentPath, navigate, setSearchParams } = useRouter();

  // ...
}
```

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Dynamic Routes

## Search Params

Dynamic routes are url segments that are parsed and provided to the matching component.

```jsx
const router = [
  { path: '/team/:name', render: TeamPage },
  { path: '/team/:id/:name/:job', render: TeamPage },
];
```

- Dynamic routes are denoted by the `:` symbol.
- The dynamic path segment can be of any value.

```
<!-- url path -->
/team/25/mike/dev
```

```jsx
function Team({ location }) {
  const { currentPath, params } = location;

  currentPath; // '/team/25/mike/dev',
  params; // { id: '25', name: 'mike', job: 'dev' }

  return null;
}
```

**Note:** In the current implementation, the static route name should differ from the dynamic route name, otherwise both routes will render on the screen.

```jsx
// WRONG
[
  { path: '/team/:name', render: TeamPage },
  { path: '/team/name', render: TeamPage },
];
```
