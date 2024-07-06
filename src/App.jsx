import RouterProvider from './router/Router';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '*', render: ErrorPage },
];

function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}

export default App;
