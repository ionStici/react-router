import { useNavigate, useParams } from "../router/RouterProvider";

function Dynamic() {
  const navigate = useNavigate();

  const goYes = () => navigate("/dynamic/yes!");

  const { answer } = useParams();

  return (
    <div>
      <h1>Dynamic</h1>
      <p>
        <span>Am I dynamic?</span>
        {answer ? (
          <span className="yes">{answer}</span>
        ) : (
          <button onClick={goYes}>Find out!</button>
        )}
      </p>
    </div>
  );
}

export default Dynamic;
