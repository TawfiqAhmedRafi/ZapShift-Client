import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../src/assets/json/loading.json"; 

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-32 h-32 md:w-48 md:h-48">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoadingPage;
