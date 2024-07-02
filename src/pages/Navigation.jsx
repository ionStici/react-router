import { Link } from '../Router';
import { router } from '../App';

function Navigation() {
  return (
    <ul>
      {router.map(({ label, path }) => {
        return (
          <li key={label}>
            <Link to={path}>{label[0].toUpperCase() + label.slice(1)}</Link>
          </li>
        );
      })}
      <li>
        <Link to="/error">Error</Link>
      </li>
    </ul>
  );
}

export default Navigation;
