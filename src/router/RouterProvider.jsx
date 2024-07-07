import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

export default function RouterProvider({ router = [], root: Root = ({ children }) => <>{children}</> }) {
  const getCurrentPath = () => window.location.pathname + window.location.search;
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const [routeData, setRouteData] = useState(null);
  const fetch = useCallback(
    async (currentPath) => {
      const routeLoader = router.find(({ path: routePath }) => doesRouteMatch(currentPath, routePath))?.loader;
      if (routeLoader) {
        const data = await routeLoader();
        setRouteData(data);
      } else {
        setRouteData(null);
      }
    },
    [router]
  );

  const navigate = useCallback(
    (to) => {
      fetch(to);
      window.history.pushState({}, '', to);
      const locationChange = new PopStateEvent('navigate');
      window.dispatchEvent(locationChange);
      setCurrentPath(to);
    },
    [fetch]
  );

  useEffect(() => {
    fetch(currentPath);
    const handleNavigate = () => setCurrentPath(getCurrentPath());

    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handleNavigate);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, [fetch]);

  const params = router.map(({ path: routePath }) => getParams(currentPath, routePath)).find((a) => a);
  const NotFoundPage = router.find(({ path }) => path === '*')?.render;

  return (
    <RouterContext.Provider value={{ currentPath, params, navigate, routeData }}>
      <Root>
        {router.map(({ path: routePath, render: Route }) => {
          const match = doesRouteMatch(currentPath, routePath);
          return match ? <Route key={routePath} /> : null;
        })}
        {!params && NotFoundPage && <NotFoundPage />}
      </Root>
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

const doesRouteMatch = (currentPath, routePath) => {
  if (!currentPath || !routePath || routePath === '*') return false;
  const pathname = currentPath.split('?')[0];

  const regexPath = routePath.replace(/:([^/]+)/g, '([^/]+)');
  return new RegExp(`^${regexPath}$`).test(pathname);
};

const getParams = (currentPath, routePath) => {
  if (!currentPath || !routePath || routePath === '*') return null;

  const pathname = currentPath.split('?')[0];

  const paramNames = [];
  const regexPath = routePath.replace(/:([^/]+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return '([^/]+)';
  });

  const match = new RegExp(`^${regexPath}$`).exec(pathname);
  if (!match) return null;

  const params = paramNames.reduce((acc, paramName, index) => {
    acc[paramName] = match[index + 1];
    return acc;
  }, {});

  return params;
};
