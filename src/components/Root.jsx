import NavBar from './NavBar';

function Root({ children }) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Root;
