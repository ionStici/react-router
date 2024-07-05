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

// // // // // // // // // // // // // // // // // // // //

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Greetings and Welcome!</p>
    </>
  );
}

function Layout({ children }) {
  const id = Math.ceil(Math.random() * 200);

  return (
    <>
      <header>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to={`/fetch/${id}`}>Fetch</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
