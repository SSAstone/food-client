import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import img1 from './../../../assets/home/slide1.jpg'
import img2 from './../../../assets/home/slide2.jpg'
import img3 from './../../../assets/home/slide3.jpg'
import img4 from './../../../assets/home/slide4.jpg'
import img5 from './../../../assets/home/slide5.jpg'
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
    return (
        <section>
            <SectionTitle heading="From 11.00am to 9.00pm" subHeading="Order Online"></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide>
                    <img src={img1} />
                    <h3 className="text-4xl text-center uppercase -mt-16 text-white">Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                    <h3 className="text-4xl text-center uppercase -mt-16 text-white">pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                    <h3 className="text-4xl text-center uppercase -mt-16 text-white">soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} />
                    <h3 className="text-4xl text-center uppercase -mt-16 text-white">desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} />
                    <h3 className="text-4xl text-center uppercase -mt-16 text-white">Salads</h3>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;