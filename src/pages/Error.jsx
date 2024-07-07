import { useRouter } from '../router/RouterProvider';

function Error() {
  const { currentPath, navigate } = useRouter();
  const goHome = () => navigate('/');

  return (
    <div className="errorPage">
      <h1>404 Not Found</h1>
      <p>
        The requested url <span>{currentPath}</span> does not exist.
      </p>
      <p>
        No worries, you can always go
        <button onClick={goHome}>Home</button>
      </p>
    </div>
  );
}

export default Error;
