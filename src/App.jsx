import RouterProvider from './Router';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DynamicPage from './pages/DynamicPage';
import SearchPage from './pages/SearchPage';
import ErrorPage from './pages/ErrorPage';

const router = [
  { path: '/', render: HomePage },
  { path: '/about', render: AboutPage },
  { path: '/dynamic', render: DynamicPage },
  { path: '/dynamic/:answer', render: DynamicPage },
  { path: '/search', render: SearchPage },
  { path: '*', render: ErrorPage },
];

function App() {
  return <RouterProvider router={router} Layout={Layout} />;
}

export default App;
