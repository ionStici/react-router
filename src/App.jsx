import RouterProvider from './router/RouterProvider';
import Root from './components/Root';
import Home from './pages/Home';
import About from './pages/About';
import Dynamic from './pages/Dynamic';
import Search from './pages/Search';
import Error from './pages/Error';

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
    path: '*',
    render: Error,
  },
];

function App() {
  return <RouterProvider router={router} root={Root} />;
}

export default App;
