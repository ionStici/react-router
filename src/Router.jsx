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

  const isPathMatched = router.some(({ path }) => currentPath === path);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {router?.map(({ path, render: Component }, i) => {
        return <Route key={i} path={path} Component={Component} />;
      })}
      {!isPathMatched && notFound()}
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

function Route({ path, Component }) {
  const { currentPath } = useRouter();
  return currentPath === path ? <Component /> : null;
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