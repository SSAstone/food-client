import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({items, title, coverImg}) => {
    return (
        <div className="mt-12">
            { title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}><button className="btn btn-outline border-b-4 mt-4 border-0 flex mx-auto bg-slate-200">Order Now {title}</button></Link>
        </div>
    );
};

export default MenuCategory;