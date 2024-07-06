import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

export default function RouterProvider({ router = [], Layout = ({ children }) => <>{children}</> }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = useCallback((to) => {
    window.history.pushState({}, '', to);
    const locationChange = new PopStateEvent('navigate');
    window.dispatchEvent(locationChange);
    setCurrentPath(to);
  }, []);

  useEffect(() => {
    const handleNavigate = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handleNavigate);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const is404 = !router.some(({ path }) => currentPath === path);
  const NotFound = router.find(({ path }) => path === '*')?.render;

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      <Layout>
        {router.map(({ path: routePath, render: Component }, i) => {
          return currentPath === routePath ? <Component key={i} /> : null;
        })}
        {is404 && NotFound && <NotFound />}
      </Layout>
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
}

export function Link({ children, to, className, active }) {
  const { currentPath: path, navigate } = useRouter();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  return (
    <a href={to} onClick={handleClick} className={`${className} ${path === to ? active : ''}`}>
      {children}
    </a>
  );
}