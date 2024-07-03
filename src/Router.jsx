import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], useHash = false, Layout = ({ children }) => <>{children}</> }) {
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
  }, [useHash]);

  const matchRoute = (path, routePath) => {
    if (routePath === '*') return { path, params: {} };

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
      <Layout>
        {router.map(({ path, render: Component, guard = true }, i) => {
          if (!guard) return null;

          if (path === '*') return null;

          const match = matchRoute(currentPath, path);

          return match ? <Route key={i} Component={Component} params={match.params} /> : null;
        })}
        {matchedRoute.path === '*' && router.find(({ path }) => path === '*')?.render({})}
      </Layout>
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, params }) {
  return <Component params={params} />;
}

// // // // // // // // // // // // // // // // // // // //

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
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
