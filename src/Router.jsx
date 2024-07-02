import { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router, notFound = () => '' }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const navigate = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', navigate);
    window.addEventListener('navigate', navigate);

    return () => {
      window.removeEventListener('popstate', navigate);
      window.removeEventListener('navigate', navigate);
    };
  }, []);

  return (
    <RouterContext.Provider value={currentPath}>
      {router?.map(({ path, render }, i) => (
        <Route key={i} path={path} Component={render} />
      ))}
      {!router?.some(({ path }) => currentPath === path) && notFound()}
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

export function useRouter() {
  return useContext(RouterContext);
}

// // // // // // // // // // // // // // // // // // // //

function Route({ path, Component }) {
  const currentPath = useRouter();
  return currentPath === path ? <Component /> : null;
}

// // // // // // // // // // // // // // // // // // // //

export function Link({ children, to }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    const locationChange = new PopStateEvent('navigate');
    window.dispatchEvent(locationChange);
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

// // // // // // // // // // // // // // // // // // // //
