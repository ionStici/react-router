function TeamPage({ params }) {
  const { name } = params;

  return (
    <div>
      <h1>The Team</h1>
      {!name ? <p>None of us is as smart as all of us</p> : <p>Employee of the month 🎉</p>}
      {name && <h2>{name[0].toUpperCase() + name.slice(1)}</h2>}
    </div>
  );
}

export default TeamPage;
