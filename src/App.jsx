import RouterProvider from './Router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserPage from './pages/UserPage';
import NotFoundPage from './pages/NotFoundPage';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/contact', render: ContactPage },
  { path: '/user/:name', render: UserPage },
  { path: '*', render: NotFoundPage }, // must be the last
];

export default function App() {
  return <RouterProvider router={router} />;
}
