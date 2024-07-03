import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
