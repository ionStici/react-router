import RouterProvider, { useRouter, Link } from './Router';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/team', render: TeamPage },
  { path: '/team/:name', render: TeamPage },
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
  const { currentPath: path } = useRouter();

  return (
    <>
      {path && <h1>{path[1].toUpperCase() + path.slice(2)}</h1>}
      <p>Satisfy your curiosity</p>
    </>
  );
}

function TeamPage({ location }) {
  const { navigate } = useRouter();
  const goTo = (to) => navigate(to);

  const { name } = location?.params;

  return (
    <>
      <h1>The Team</h1>
      <p>None of us is as smart as all of us</p>
      {!name && <button onClick={() => goTo('/team/mike')}>Reveal the employee of the month</button>}
      {name && <h2>{name} 🎉</h2>}
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
          <Link to="/team">Team</Link>
          <Link to="/error">404 Error</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}
