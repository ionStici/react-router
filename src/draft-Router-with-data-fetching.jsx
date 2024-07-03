// // // // // // // // // // // // // // // // // // // //

export default function RouterProvider({ router = [], useHash = false, Layout = ({ children }) => <>{children}</> }) {
  const getCurrentPath = () => (useHash ? window.location.hash.slice(1) || '/' : window.location.pathname);

  const [currentPath, setCurrentPath] = useState(getCurrentPath);
  const [loading, setLoading] = useState(false);
  const [routeData, setRouteData] = useState(null);

  const navigate = useCallback(
    async (to) => {
      const matchedRoute = router.find(({ path }) => matchRoute(to, path));

      if (matchedRoute && matchedRoute.loadData) {
        setLoading(true);

        try {
          const data = await matchedRoute.loadData(matchRoute(to, matchedRoute.path).params);
          setRouteData(data);
        } catch (error) {
          console.error('Failed to load data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setRouteData(null);
      }

      if (useHash) {
        window.location.hash = to;
      } else {
        window.history.pushState({}, '', to);
        const locationChange = new PopStateEvent('navigate');
        window.dispatchEvent(locationChange);
      }
      setCurrentPath(to);
    },
    [useHash, router]
  );

  useEffect(() => {
    const handleNavigate = async () => {
      const path = getCurrentPath();
      const matchedRoute = router.find(({ path: routePath }) => matchRoute(path, routePath));

      if (matchedRoute && matchedRoute.loadData) {
        setLoading(true);
        try {
          const data = await matchedRoute.loadData(matchRoute(path, matchedRoute.path).params);
          setRouteData(data);
        } catch (error) {
          console.error('Failed to load data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setRouteData(null);
      }

      setCurrentPath(path);
    };

    handleNavigate();

    window.addEventListener(useHash ? 'hashchange' : 'popstate', handleNavigate);
    if (!useHash) window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener(useHash ? 'hashchange' : 'popstate', handleNavigate);
      if (!useHash) window.removeEventListener('navigate', handleNavigate);
    };
  }, [useHash, router]);

  const matchedRoute = router.find(({ path }) => matchRoute(currentPath, path));

  return (
    <RouterContext.Provider value={{ currentPath, navigate, loading, routeData }}>
      <Layout>
        {router.map(({ path, render: Component, guard = true }, i) => {
          if (typeof guard === 'function' && !guard()) return null;
          if (path === '*') return null;

          const match = matchRoute(currentPath, path);
          return match ? <Route key={i} Component={Component} params={match.params} data={routeData} /> : null;
        })}
        {matchedRoute?.path === '*' && router.find(({ path }) => path === '*')?.render()}
      </Layout>
    </RouterContext.Provider>
  );
}

// // // // // // // // // // // // // // // // // // // //

function Route({ Component, params, data }) {
  return <Component params={params} data={data} />;
}

// // // // // // // // // // // // // // // // // // // //
