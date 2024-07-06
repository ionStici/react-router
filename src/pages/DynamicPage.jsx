import { useRouter } from '../Router';

function DynamicPage({ dynamicParams }) {
  const { navigate } = useRouter();
  const goYes = () => navigate('/dynamic/yes!');

  const { answer } = dynamicParams;

  return (
    <div>
      <h1>Dynamic</h1>
      <p>
        Am I dynamic?
        {answer ? <span>{answer}</span> : <button onClick={goYes}>Find out!</button>}
      </p>
    </div>
  );
}

export default DynamicPage;
