import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from './../../../assets/menu/banner3.jpg'
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessImg from './../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from './../../../assets/menu/pizza-bg.jpg'
import saladImg from './../../../assets/menu/salad-bg.jpg'
import soupImg from './../../../assets/menu/soup-bg.jpg'

const Menu = () => {

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === "dessert");
    const salad = menu.filter(item => item.category === "salad");
    const soup = menu.filter(item => item.category === "soup");
    const pizza = menu.filter(item => item.category === "pizza");
    const offered = menu.filter(item => item.category === "offered");

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu"></Cover>

            <SectionTitle heading="Don't miss" subHeading="TODAY'S OFFER"></SectionTitle>
            <MenuCategory items={offered} coverImg={dessImg} title="dessert"></MenuCategory>

            <MenuCategory items={dessert} coverImg={dessImg} title="dessert"></MenuCategory>

            <MenuCategory items={pizza} coverImg={pizzaImg} title="pizza"></MenuCategory>
            <MenuCategory items={salad} coverImg={saladImg} title="salad"></MenuCategory>
            <MenuCategory items={soup} coverImg={soupImg} title="soup"></MenuCategory>
        </div>
    );
};

export default Menu;