import RouterProvider from './Router';
import { Link } from './Router';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/contact', render: ContactPage },
];

export default function App() {
  return <RouterProvider router={router} notFound={NotFoundPage} />;
}

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <Nav />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <Nav />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <Nav />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <h1>404 Page Not Found</h1>
      <Link to="/">Go Back Home</Link>
    </>
  );
}

function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/error">Error</Link>
      </li>
    </ul>
  );
}
