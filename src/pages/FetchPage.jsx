import { useRouter } from '../Router';
import Loading from '../ui/Loading';

function FetchPage({ params, data }) {
  const { routeData, loading, currentPath } = useRouter();
  const { id } = params;

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Fetch</h1>
      {data && (
        <p>
          {id}: {data?.title}
        </p>
      )}
    </div>
  );
}

export default FetchPage;
