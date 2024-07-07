import { useLoader } from '../router/Hooks';

function Fetch({ data, loading }) {
  // const { data, loading } = useLoader();

  if (loading) return <p>Loading...</p>;

  console.log(data.title);

  return (
    <div>
      <h1>Fetch</h1>
    </div>
  );
}

export default Fetch;
