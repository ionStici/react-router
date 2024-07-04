// import RouterProvider, { useRouter, Link } from './HashRouter';
// return <RouterProvider router={router} Layout={Layout} useHash={true} />;

import RouterProvider, { useRouter, Link } from './Router';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '*', render: NotFoundPage },
];

export function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}

// // // // // // // // // // // // // // // // // // // //

function HomePage() {
  const { currentPath, navigate } = useRouter();

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
          <Link to="/error">404 Error</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
