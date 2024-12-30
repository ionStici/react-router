import { useLoader } from "../router/RouterProvider";

export default function Fetch() {
  const data = useLoader();

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Fetch</h1>
      <p>{data.title}</p>
    </div>
  );
}

export async function loaderFetch() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/2`);
  return await res.json();
}

// import { useEffect, useState } from "react";

// export default function Fetch() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     async function loaderFetch() {
//       try {
//         const res = await fetch(`https://jsonplaceholder.typicode.com/todos/2`);
//         const resData = await res.json();
//         setData(resData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loaderFetch();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Fetch</h1>
//       <p>{data.title}</p>
//     </div>
//   );
// }
