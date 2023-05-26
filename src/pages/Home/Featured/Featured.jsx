import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import img from './../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle heading="Check it out" subHeading="FROM OUR MENU"></SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-40 items-center py-20 pt-12 px-36">
                <div>
                    <img src={img} />
                </div>
                <div className="md:ml-10">
                    <p>March 20, 2023</p>
                    <p className="uppercase">WHERE CAN I GET SOME?Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-b-4 border-b-white border-0">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;