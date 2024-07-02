import RouterProvider from './Router';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = [
  { path: '/', render: HomePage, label: 'home' },
  { path: '/about', render: AboutPage, label: 'about' },
  { path: '/contact', render: ContactPage, label: 'contact' },
];

export default function App() {
  return <RouterProvider router={router} notFound={NotFoundPage} useHash={true} />;
}
