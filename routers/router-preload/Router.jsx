import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], Layout = ({ children }) => <>{children}</> }) {
  const getCurrentPath = () => window.location.pathname;

  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);

  const navigate = useCallback(
    async (to) => {
      const matchedRoute = router.find(({ path }) => matchRoute(to, path));

      if (matchedRoute && matchedRoute.loadData) {
        setLoading(true);

        const data = await matchedRoute.loadData(matchRoute(to, matchedRoute.path));
        setRouteData(data);
        setLoading(false);
      } else {
        setRouteData(null);
      }

      window.history.pushState({}, '', to);
      const locationChange = new PopStateEvent('navigate');
      window.dispatchEvent(locationChange);
      setCurrentPath(to);
    },
    [router]
  );

  useEffect(() => {
    const handleNavigate = async () => {
      const path = getCurrentPath();
      const matchedRoute = router.find(({ path: routePath }) => matchRoute(path, routePath));

      if (matchedRoute && matchedRoute.loadData) {
        setLoading(true);

        const data = await matchedRoute.loadData(matchRoute(path, matchedRoute.path));
        setRouteData(data);
        setLoading(false);
      } else {
        setRouteData(null);
      }

      setCurrentPath(path);
    };

    handleNavigate();

    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handleNavigate);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, [router]);

  const matchedRoute = router.find(({ path }) => matchRoute(currentPath, path));

  return (
    <RouterContext.Provider value={{ currentPath, navigate, loading, routeData }}>
      <Layout>
        {router.map(({ path: routePath, render: Component }, i) => {
          if (routePath === '*') return null;
          const match = matchRoute(currentPath, routePath);
          return match ? <Component key={i} location={match} data={routeData} /> : null;
        })}
        {matchedRoute?.path === '*' && router.find(({ path }) => path === '*')?.render()}
      </Layout>
    </RouterContext.Provider>
  );
}

// {router.map(({ path, render: Component, guard = true }, i) => {
// if (typeof guard === 'function' && !guard()) return null;

// // // // // // // // // // // // // // // // // // // //

const matchRoute = (currentPath, routePath) => {
  if (!currentPath || !routePath) return null;
  if (routePath === '*') return { currentPath, params: {} };

  const paramNames = [];
  const regexPath = routePath.replace(/:([^/]+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return '([^/]+)';
  });

  const match = new RegExp(`^${regexPath}$`).exec(currentPath);
  if (!match) return null;

  const params = paramNames.reduce((acc, paramName, index) => {
    acc[paramName] = match[index + 1];
    return acc;
  }, {});

  return { currentPath, params };
};

// // // // // // // // // // // // // // // // // // // //

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
}

// // // // // // // // // // // // // // // // // // // //

export function Link({ children, to }) {
  const { navigate } = useRouter();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

// // // // // // // // // // // // // // // // // // // //