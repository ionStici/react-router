# Client-Side Router

v2

## New Features & Changes

- Dynamic Routes
- Backward compatible to v1

## Dynamic Routes

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
