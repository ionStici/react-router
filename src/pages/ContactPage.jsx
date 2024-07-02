import Navigation from './Navigation';

function ContactPage({ params }) {
  const { id, name } = params;

  return (
    <div>
      <h1>Contact</h1>
      <p>How to find us? You can't.</p>
      {id && <p>{id}</p>}
      {name && <p>{name}</p>}
      <Navigation />
    </div>
  );
}

export default ContactPage;
