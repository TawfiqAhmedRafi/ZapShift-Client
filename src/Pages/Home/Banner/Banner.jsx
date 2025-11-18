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
      <div className="relative">
        <img src={b1} className="w-full" />

        <div className="absolute top-5/6 left-[18%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="btn btn-primary rounded-3xl">
            Track Your Parcel
          </button>
          <FaArrowCircleUp className="rotate-45 text-3xl  " />
          <button className="btn rounded-lg">Be a Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={b2} className="w-full" />

        <div className="absolute top-5/6 left-[18%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="btn btn-primary rounded-3xl">
            Track Your Parcel
          </button>
          <FaArrowCircleUp className="rotate-45 text-3xl  " />
          <button className="btn rounded-lg">Be a Rider</button>
        </div>
      </div>
      <div className="relative">
        <img src={b3} className="w-full" />

        <div className="absolute top-5/6 left-[18%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="btn btn-primary rounded-3xl">
            Track Your Parcel
          </button>
          <FaArrowCircleUp className="rotate-45 text-3xl  " />
          <button className="btn rounded-lg">Be a Rider</button>
        </div>
      </div>
      
    </Carousel>
  );
};

export default Banner;
