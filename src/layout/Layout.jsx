// components
import Menu from "../components/Menu";
import Footer from "../components/Footer.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <main>{children}</main>
    </>
  );
};

export default Layout;
