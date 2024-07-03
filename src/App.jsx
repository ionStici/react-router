import RouterProvider from './Router';

import Layout from './ui/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import NotFoundPage from './pages/NotFoundPage';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/team', render: TeamPage },
  { path: '/team/:name', render: TeamPage },
  { path: '*', render: NotFoundPage }, // must be the last
];

export default function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}
