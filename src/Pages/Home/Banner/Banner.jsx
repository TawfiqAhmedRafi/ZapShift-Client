import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import b1 from "../../../assets/banner/banner1.png";
import b2 from "../../../assets/banner/banner2.png";
import b3 from "../../../assets/banner/banner3.png";
import { FaArrowCircleUp } from "react-icons/fa";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} className="mt-5">
      {[b1, b2, b3].map((banner, index) => (
        <div className="relative" key={index}>
          <img src={banner} className="w-full" />

          {/* Buttons container */}
          <div className="
            absolute
            top-5/6
            left-[18%]
            -translate-x-1/5
            md:-translate-x-1/2
            -translate-y-1/2
            flex
            gap-2
            flex-wrap
            justify-center
            md:flex-nowrap
            mt-1
            items-center
          ">
            <button className="btn btn-primary rounded-3xl text-[12px] sm:text-base px-3 sm:px-5 py-1 sm:py-3">
              Track Your Parcel
            </button>
            <FaArrowCircleUp className="rotate-45 text-3xl sm:text-3xl mt-1 sm:mt-0" />
            <button className="btn rounded-lg text-[12px]  sm:text-base px-3 sm:px-5 py-1 sm:py-3">
              Be a Rider
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
