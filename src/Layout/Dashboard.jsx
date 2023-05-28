import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaHome, FaShoppingCart } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><NavLink to="/dashboard/home"><FaHome></FaHome>User Home</NavLink></li>
                        <li><NavLink to="/dashboard/reservations"><FaCalendarAlt></FaCalendarAlt>Reservations</NavLink></li>
                        <li><NavLink to="/dashboard/history"><GiWallet></GiWallet>Payment History</NavLink></li>
                        <li>
                            <NavLink to="/dashboard/mycart"><FaShoppingCart></FaShoppingCart>My Cart<span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink>
                        </li>
                        <div className="divider"></div>
                        <li><FaHome></FaHome><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Our Menu</NavLink></li>
                        <li><NavLink to="/order/salad">Order Food</NavLink></li>
                        <li><NavLink to=""></NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;