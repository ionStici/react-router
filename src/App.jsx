import RouterProvider from './Router';

import Layout from './ui/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import FetchPage from './pages/FetchPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './ui/Loading';

const isAuthenticated = () => true;

async function fetchData(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const data = await res.json();
  return data;
}

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/team', render: TeamPage },
  {
    path: '/team/:name',
    render: TeamPage,
    guard: () => isAuthenticated(),
  },
  {
    path: '/fetch/:id',
    render: FetchPage,
    loadData: ({ id }) => fetchData(id),
    loading: Loading,
  },
  { path: '*', render: NotFoundPage }, // must be the last
];

export default function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}
