import { createContext, useContext, useState, useEffect, useCallback } from "react";

const RouterContext = createContext();

// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({
  router = [],
  useHash = false,
  Root = ({ children }) => <>{children}</>,
}) {
  const getCurrentPath = () =>
    useHash ? window.location.hash.slice(1) || "/" : window.location.pathname;
  const [currentPath, setCurrentPath] = useState(getCurrentPath);

  const navigate = useCallback(
    (to) => {
      if (useHash) {
        window.location.hash = to;
      } else {
        window.history.pushState({}, "", to);
        const locationChange = new PopStateEvent("navigate");
        window.dispatchEvent(locationChange);
      }
      setCurrentPath(to);
    },
    [useHash]
  );

  useEffect(() => {
    const handleNavigate = () => setCurrentPath(getCurrentPath());

    window.addEventListener(useHash ? "hashchange" : "popstate", handleNavigate);
    if (!useHash) window.addEventListener("navigate", handleNavigate);

    return () => {
      window.removeEventListener(useHash ? "hashchange" : "popstate", handleNavigate);
      if (!useHash) window.removeEventListener("navigate", handleNavigate);
    };
  }, [useHash]);

  const is404 = !router.some(({ path }) => currentPath === path);
  const NotFoundPage = router.find(({ path }) => path === "*")?.render;

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

  const classes = `${className || ""} ${path === to && classActive ? classActive : ""}`;

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
