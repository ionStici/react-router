import { Link } from '../router/Router';

function NavBar() {
  return (
    <nav>
      <Link to="/" className="link" active="active">
        Home
      </Link>
      <Link to="/about" className="link" active="active">
        About
      </Link>
      <Link to="/error" className="link" active="active">
        Error
      </Link>
    </nav>
  );
}

export default NavBar;
