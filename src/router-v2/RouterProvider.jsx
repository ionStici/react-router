import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

export default function RouterProvider({ router = [], root: Root = ({ children }) => <>{children}</> }) {
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

  const params = router.map(({ path: routePath }) => getParams(currentPath, routePath)).find((a) => a);
  const NotFoundPage = router.find(({ path }) => path === '*')?.render;

  return (
    <RouterContext.Provider value={{ currentPath, params, navigate }}>
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

// // // // // // // // // // // // // // // // // // // //

export function useCurrentPath() {
  const { currentPath } = useRouter();
  return currentPath;
}

export function useParams() {
  const { params } = useRouter();
  return params;
}

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

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

export function Link({ children, to, className, classActive }) {
  const { currentPath, navigate } = useRouter();

  const path = currentPath.split('?')[0];

  const classes = `${className || ''} ${path === to && classActive ? classActive : ''}`;

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

function useRouter() {
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

// // // // // // // // // // // // // // // // // // // //
