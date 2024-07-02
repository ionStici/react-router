import RouterProvider from './Router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/contact', render: ContactPage },
  { path: '/contact/:id', render: ContactPage },
  { path: '/contact/:id/:name', render: ContactPage },
];

export default function App() {
  return <RouterProvider router={router} notFound={NotFoundPage} />;
}
