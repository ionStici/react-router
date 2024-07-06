import RouterProvider, { useRouter, Link } from './Router';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/search', render: SearchPage },
  { path: '*', render: NotFoundPage },
];

export function App() {
  return <RouterProvider router={router} Layout={Layout} />;
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

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Satisfy your curiosity</p>
    </>
  );
}

function SearchPage({ location }) {
  const { searchParams } = location;

  const filter = searchParams.get('filter');
  const sortBy = searchParams.get('sortBy');

  return (
    <>
      <h1>Search</h1>
      <p>What are you looking for?</p>
      {filter && <p>{filter}</p>}
      {sortBy && <p>{sortBy}</p>}
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <h1>404 Not Found</h1>
      <p>No such page exists</p>
    </>
  );
}

function Layout({ children }) {
  return (
    <>
      <header>
        <nav style={{ display: 'flex', gap: '15px' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Search</Link>
          <Link to="/search?filter=price">Search: filter</Link>
          <Link to="/search?filter=price&sortBy=asc">Search: filter & sortBy</Link>
          <Link to="/error">404 Error</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
