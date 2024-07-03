import { Link } from '../Router';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/team">Team</Link>
      <Link to="/team/mike">Employee of the month</Link>
      <Link to="/fetch/25">Fetch</Link>
      <Link to="/error">404 Error</Link>
    </nav>
  );
}

export default NavBar;
