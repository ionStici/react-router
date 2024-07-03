import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], Layout = ({ children }) => <>{children}</> }) {
  const getCurrentPath = () => window.location.pathname;
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const navigate = useCallback((to) => {
    window.history.pushState({}, '', to);
    const locationChange = new PopStateEvent('navigate');
    window.dispatchEvent(locationChange);
    setCurrentPath(to);
  }, []);

  useEffect(() => {
    const handleNavigate = () => setCurrentPath(getCurrentPath());

    window.addEventListener('popstate', handleNavigate);
    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handleNavigate);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const matchedRoute = router.find(({ path }) => matchRoute(currentPath, path));

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      <Layout>
        {router.map(({ path, render: Component }, i) => {
          if (path === '*') return null;
          const match = matchRoute(currentPath, path);
          return match ? <Route key={i} Component={Component} location={match} /> : null;
        })}
        {matchedRoute?.path === '*' && router.find(({ path }) => path === '*')?.render()}
      </Layout>
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, location }) {
  return <Component location={location} />;
}

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

const matchRoute = (path, routePath) => {
  if (!routePath) return null;
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

// // // // // // // // // // // // // // // // // // // //
