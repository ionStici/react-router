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
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

    if (!res.ok) throw new Error('Failed to load data');

    return res.json();
  } catch (error) {
    return Promise.reject(error);
  }
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
