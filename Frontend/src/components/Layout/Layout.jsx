import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "../../assets/blocks/layout.css";

function Layout() {
  return (
    <div className="page__content">
      <Header />
      <main>
        <Outlet /> {/* Aqui entra Main ou Register */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
