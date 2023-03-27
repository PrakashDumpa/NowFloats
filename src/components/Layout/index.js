import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./index.css";

const Layout = () => (
  <div className="layout_container">
    <Header />
    <div className="d-flex outLet_container min-vh-100 pt-4">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default Layout;
