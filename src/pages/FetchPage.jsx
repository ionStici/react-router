import { useRouter } from '../Router';
import Loading from '../ui/Loading';

function FetchPage({ params, data }) {
  const { routeData, loading } = useRouter();
  if (loading) return <Loading />;
  const { id } = params;

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
