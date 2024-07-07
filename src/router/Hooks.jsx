import { useCallback } from 'react';
import { useRouter } from './RouterProvider';

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

export function useParams() {
  const { params } = useRouter();
  return params;
}

export function useSearchParams() {
  const { currentPath, navigate } = useRouter();

  const searchParams = new URLSearchParams(currentPath.split('?')[1] || '');

  const setSearchParams = useCallback(
    (params) => {
      const url = new URL(window.location.href);
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, params[key]);
        }
      });
      navigate(url.pathname + url.search);
    },
    [navigate]
  );

  return [searchParams, setSearchParams];
}
