import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], Layout = ({ children }) => <>{children}</> }) {
  const getCurrentPath = () => window.location.pathname + window.location.search;
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const navigate = useCallback((to) => {
    window.history.pushState({}, '', to);
    const locationChange = new PopStateEvent('navigate');
    window.dispatchEvent(locationChange);
    setCurrentPath(to);
  }, []);

  const setSearchParams = useCallback(
    (params) => {
      const url = new URL(window.location);
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, params[key]);
        }
      });
      navigate(url.pathname + url.search);
    },
    [navigate]
  );

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
  const NotFoundPage = router.find(({ path }) => path === '*')?.render;

  return (
    <RouterContext.Provider value={{ currentPath, navigate, setSearchParams }}>
      <Layout>
        {router.map(({ path: routePath, render: Component }, i) => {
          const match = matchRoute(currentPath, routePath);
          return match ? <Route key={i} Component={Component} location={match} /> : null;
        })}
        {!matchedRoute && NotFoundPage && <NotFoundPage />}
      </Layout>
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, location }) {
  const { currentPath, params: dynamicParams, searchParams } = location;
  return <Component currentPath={currentPath} dynamicParams={dynamicParams} searchParams={searchParams} />;
}

// // // // // // // // // // // // // // // // // // // //

const matchRoute = (currentPath, routePath) => {
  if (!currentPath || !routePath || routePath === '*') return null;

  const [pathname, search] = currentPath.split('?');

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

  const searchParams = new URLSearchParams(search || '');

  return { currentPath, params, searchParams };
};

// // // // // // // // // // // // // // // // // // // //

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
}

// // // // // // // // // // // // // // // // // // // //

export function Link({ children, to, className, active }) {
  const { currentPath, navigate } = useRouter();

  const path = currentPath.split('?')[0];
  const classes = `${className ? className : ''} ${path === to && active ? active : ''}`;

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  return (
    <a href={to} onClick={handleClick} className={classes}>
      {children}
    </a>
  );
}

// // // // // // // // // // // // // // // // // // // //
