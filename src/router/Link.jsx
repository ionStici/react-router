import { useCallback } from 'react';
import { useRouter } from './RouterProvider';

export function Link({ children, to, className, classActive }) {
  const { currentPath, navigate } = useRouter();

  const path = currentPath.split('?')[0];

  const classes = `${className ? className : ''} ${path === to && classActive ? classActive : ''}`;

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
