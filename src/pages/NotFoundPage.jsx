import { Link } from '../Router';

function NotFoundPage() {
  return (
    <div>
      <h1>404 Page Not Found</h1>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default NotFoundPage;
