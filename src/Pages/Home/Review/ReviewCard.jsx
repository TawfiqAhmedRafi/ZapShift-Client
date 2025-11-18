import React from "react";
import quote from "../../../assets/reviewQuote.png"
import { FaStar } from "react-icons/fa";
import StarRating from "../../../Components/StarRating/StarRating";

const ReviewCard = ({ review }) => {
  const {user_photoURL,userName , review:hehe , ratings} = review;
  return (
    <div className="rounded-2xl p-8 bg-base-100 w-96 shadow-lg mt-7">
      <figure>
        <img
          src={quote}
          alt="Shoes"
          className="text-left"
        />
      </figure>
      <div >
        
        <p className="p-2">
          {hehe}
        </p>
        <div className=" border-t border-dashed border-gray-400 py-2">

        </div>
       <div className="flex items-center gap-3">
        <img src={user_photoURL} className="w-12 h-12 rounded-full" alt="" />
        <div>
            <p className="text-xl text-secondary font-semibold">{userName}</p>
            <p className="flex items-center gap-1">{ratings}<StarRating ratings={ratings}></StarRating></p>

        </div>
       </div>
      </div>
    </div>
  );
};

export default ReviewCard;
