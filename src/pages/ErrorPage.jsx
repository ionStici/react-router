import { useRouter } from '../router/Router';

function ErrorPage() {
  const { currentPath, navigate } = useRouter();
  const goHome = () => navigate('/');

  return (
    <div className="errorPage">
      <h1>404 Not Found</h1>
      <p>
        The requested URL <span>{currentPath}</span> does not exist.
      </p>
      <button onClick={goHome}>Back to Home</button>
    </div>
  );
}

export default ErrorPage;
