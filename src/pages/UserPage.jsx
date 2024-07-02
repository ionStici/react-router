import Navigation from './Navigation';

function UserPage({ params }) {
  const { name } = params;
  const userName = name[0].toUpperCase() + name.slice(1);

  return (
    <div>
      {name && <h1>{userName}</h1>}
      {name && <p>{userName}'s user profile page</p>}
      <Navigation />
    </div>
  );
}

export default UserPage;
