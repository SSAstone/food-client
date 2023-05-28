import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
    const location = useLocation();
    // console.log(location);

    const isNF = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <div>
            { isNF || <Navbar></Navbar>}
            <Outlet></Outlet>
            { isNF || <Footer></Footer>}
        </div>
    );
};

export default Main;