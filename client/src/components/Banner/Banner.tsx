import slider1 from "../../assets/slider-img-1.webp";
import slider2 from "../../assets/slider-img-2.webp";
import slider3 from "../../assets/slider-img-3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BannerItem from "./BannerItem";
const data = [
    {
        id: 1,
        bg: "bg-[#115061]",
        image: slider1,
    },
    {
        id: 2,
        bg: "bg-red-500",
        image: slider2,
    },
    {
        id: 3,
        bg: "bg-blue-400",
        image: slider3,
    },
];

function Banner() {
    return (
        <div>
            <Swiper loop={true} slidesPerView={1} spaceBetween={0} speed={600} autoplay={{ delay: 3000 }}>
                {data.map((val, index) => {
                    return (
                        <SwiperSlide key={index}>
                            {({ isActive }) => <BannerItem bg={val.bg} isActive={isActive} image={val.image} />}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default Banner;
