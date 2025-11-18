import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ ratings }) => {
  // Round rating to nearest half for visual accuracy
  const roundedRating = Math.round(ratings * 2) / 2;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starNumber = index + 1;

        if (starNumber <= roundedRating) {
          // Full star
          return <FaStar key={index} className="text-primary" />;
        } else if (starNumber - 0.5 === roundedRating) {
          // Half star
          return <FaStarHalfAlt key={index} className="text-primary" />;
        } else {
          // Empty star
          return <FaRegStar key={index} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default StarRating;
