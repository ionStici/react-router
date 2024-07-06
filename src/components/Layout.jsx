import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
