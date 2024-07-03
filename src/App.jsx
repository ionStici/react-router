import RouterProvider from './Router';
import { useRouter } from './Router';
import { Link } from './Router';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/user/:name', render: UserPage },
  { path: '*', render: NotFoundPage }, // must be the last
];

export default function App() {
  return <RouterProvider router={router} />;
}

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>Greetings and Welcome!</p>
      <Nav />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>What's up?</p>
      <Nav />
    </>
  );
}

function UserPage({ params }) {
  const { name } = params;

  return (
    <>
      <h1>User: {name}</h1>
      <p>{name}'s space</p>
      <Nav />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <p>No such page exists.</p>
      <Link to="/">Go Back Home</Link>
    </>
  );
}

function Nav() {
  const { navigate } = useRouter();
  const goError = () => navigate('/error');

  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/user/mike">Mike's Profile</Link>
      </li>
      <li>
        <button onClick={goError}>404</button>
      </li>
    </ul>
  );
}
