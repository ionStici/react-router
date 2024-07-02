import RouterProvider from './Router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const home = { path: '/', render: HomePage };
const about = { path: '/about', render: AboutPage };
const contact = { path: '/contact', render: ContactPage };

const router = [home, about, contact];

export default function App() {
  return <RouterProvider router={router} notFound={NotFoundPage} />;
}
