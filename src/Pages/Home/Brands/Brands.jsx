import React from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import startpeople from "../../../assets/brands/start_people.png";
import casio from "../../../assets/brands/casio.png";

const brandlogos = [
  amazon,
  amazon_vector,
  moonstar,
  randstad,
  startpeople,
  casio,
];

const Brands = () => {
  return (
   <div className="mt-20 mb-10">
    <p className="text-center text-xl md:text-2xl text-secondary font-bold mb-10">We've helped thousands of sales teams</p>
     <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {brandlogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
   </div>
  );
};

export default Brands;
