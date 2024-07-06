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
    <RouterContext.Provider value={{ currentPath, navigate }}>
      <Layout>
        {router.map(({ path: routePath, render: Component }, i) => {
          const match = matchRoute(currentPath, routePath);
          return match ? <Route key={i} Component={Component} dynamicParams={match.params} /> : null;
        })}
        {!matchedRoute && NotFoundPage && <NotFoundPage />}
      </Layout>
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, dynamicParams }) {
  return <Component dynamicParams={dynamicParams} />;
}

// // // // // // // // // // // // // // // // // // // //

const matchRoute = (currentPath, routePath) => {
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

  return { currentPath, params };
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

export function useSearchParams() {
  const { currentPath, navigate } = useRouter();

  const searchParams = new URLSearchParams(currentPath.split('?')[1] || '');

  const setSearchParams = useCallback(
    (params) => {
      const url = new URL(window.location.href);
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

  return [searchParams, setSearchParams];
}

// // // // // // // // // // // // // // // // // // // //
