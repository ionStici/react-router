import { useLoader } from '../router/Hooks';

function Fetch() {
  const data = useLoader();

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Fetch</h1>
      <p>{data.title}</p>
    </div>
  );
}

export default Fetch;
