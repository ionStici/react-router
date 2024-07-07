import { useNavigate, useParams } from '../router/Hooks';

function Dynamic() {
  const navigate = useNavigate();

  const goYes = () => navigate('/dynamic/yes!');

  const { answer } = useParams();

  return (
    <div>
      <h1>Dynamic</h1>
      <p>
        <span>Am I dynamic?</span>
        {answer ? <span>{answer}</span> : <button onClick={goYes}>Find out!</button>}
      </p>
    </div>
  );
}

export default Dynamic;
