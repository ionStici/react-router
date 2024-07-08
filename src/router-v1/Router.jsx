import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], Root = ({ children }) => <>{children}</> }) {
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

  const is404 = !router.some(({ path }) => currentPath === path);
  const NotFoundPage = router.find(({ path }) => path === '*')?.render;

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {router.map(({ path: routePath, render: Component }) => {
        return currentPath === routePath ? (
          <Root key={routePath}>
            <Component />
          </Root>
        ) : null;
      })}
      {is404 && NotFoundPage && <NotFoundPage />}
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

export function useCurrentPath() {
  const { currentPath } = useRouter();
  return currentPath;
}

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

// // // // // // // // // // // // // // // // // // // //

export function Link({ children, to, className, active }) {
  const { currentPath: path, navigate } = useRouter();

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

// // // // // // // // // // // // // // // // // // // //
