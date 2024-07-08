import { useLoader } from '../router/RouterProvider';

export default function Fetch() {
  const data = useLoader();
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Fetch</h1>
      <p>{data.title}</p>
    </div>
  );
}

export async function loaderFetch() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  return await res.json();
}
