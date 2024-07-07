import { Link } from '../router/Link';

function NavBar() {
  return (
    <nav>
      <Link to="/" className="link" classActive="active">
        Home
      </Link>
      <Link to="/about" className="link" classActive="active">
        About
      </Link>
      <Link to="/dynamic" className="link" classActive="active">
        Dynamic
      </Link>
      <Link to="/search" className="link" classActive="active">
        Search
      </Link>
      <Link to="/fetch" className="link" classActive="active">
        Fetch
      </Link>
      <Link to="/error" className="link" classActive="active">
        Error
      </Link>
    </nav>
  );
}

export default NavBar;
