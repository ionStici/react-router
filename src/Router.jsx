import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router, notFound = () => <h1>404 Not Found</h1>, useHash = false }) {
  const getCurrentPath = () => (useHash ? window.location.hash.slice(1) || '/' : window.location.pathname);

  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const navigate = useCallback(
    (to) => {
      if (useHash) {
        window.location.hash = to;
      } else {
        window.history.pushState({}, '', to);
        const locationChange = new PopStateEvent('navigate');
        window.dispatchEvent(locationChange);
      }
      setCurrentPath(to);
    },
    [useHash]
  );

  useEffect(() => {
    const handleNavigate = () => setCurrentPath(getCurrentPath());

    window.addEventListener(useHash ? 'hashchange' : 'popstate', handleNavigate);
    if (!useHash) window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener(useHash ? 'hashchange' : 'popstate', handleNavigate);
      if (!useHash) window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const matchRoute = (path, routePath) => {
    const paramNames = [];
    const regexPath = routePath.replace(/:([^/]+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '([^/]+)';
    });

    const match = new RegExp(`^${regexPath}$`).exec(path);
    if (!match) return null;

    const params = paramNames.reduce((acc, paramName, index) => {
      acc[paramName] = match[index + 1];
      return acc;
    }, {});

    return { path, params };
  };

  const matchedRoute = router.find(({ path }) => matchRoute(currentPath, path));

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {router?.map(({ path, render: component }, i) => {
        const match = matchRoute(currentPath, path);
        return match ? <Route key={i} path={path} Component={component} params={match.params} /> : null;
      })}
      {!matchedRoute && notFound()}
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return context;
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, params }) {
  return <Component params={params} />;
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
