import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === "popular");
    
    return (
        <section className="mb-12">
            <SectionTitle heading="Check it out" subHeading="FROM OUR MENU"></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-b-4 border-b-white border-0">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;