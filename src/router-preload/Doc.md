# Client-Side Router

v3

## New Features & Changes

- Preloading Data
- Backward compatible to v1

## Preloading Data

```jsx
import RouterProvider, { useRouter, Link } from './Router';

async function fetchData(location) {
  const { id } = location.params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return await response.json();
}

const router = [
  { path: '/', render: HomePage },
  { path: '/fetch/:id', render: FetchPage, loadData: (location) => fetchData(location) },
];

export function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}
```

```jsx
function FetchPage({ data }) {
  const { loading, routeData } = useRouter();

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Fetch</h1>
      {data && <p>{data.title}</p>}
      {routeData && <p>{routeData.id}</p>}
    </div>
  );
}
```
