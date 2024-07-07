import RouterProvider from './router/RouterProvider';
import Root from './components/Root';
import Home from './pages/Home';
import About from './pages/About';
import Dynamic from './pages/Dynamic';
import Search from './pages/Search';
import Fetch from './pages/Fetch';
import Error from './pages/Error';

// {router.map(({ path, render: Component, guard = true }, i) => {
// if (typeof guard === 'function' && !guard()) return null;

async function fetchData(params) {
  params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  return await response.json();
}

const router = [
  {
    path: '/',
    render: Home,
  },
  {
    path: '/about',
    render: About,
  },
  {
    path: '/dynamic',
    render: Dynamic,
  },
  {
    path: '/dynamic/:answer',
    render: Dynamic,
  },
  {
    path: '/search',
    render: Search,
  },
  {
    path: '/fetch',
    render: Fetch,
    loader: (params) => fetchData(params),
  },
  {
    path: '*',
    render: Error,
  },
];

function App() {
  return <RouterProvider router={router} root={Root} />;
}

export default App;
