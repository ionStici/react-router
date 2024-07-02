import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router, notFound = () => <h1>404 Not Found</h1> }) {
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

  const isPathMatched = router.some(({ path }) => currentPath === path);

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {router?.map(({ path, render: Component }, i) => (
        <Route key={i} path={path} Component={Component} />
      ))}
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
