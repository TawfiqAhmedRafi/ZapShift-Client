import React from "react";
import bgLines from "../../../assets/be-a-merchant-bg.png";
import location from "../../../assets/location-merchant.png";

const MerchantSection = () => {
  return (
   <div className="relative bg-secondary rounded-2xl overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 my-10">
    
      <img
        src={bgLines}
        alt="background lines"
        className="absolute top-0 right-0 w-full h-full object-cover opacity-10 pointer-events-none"
      />

      
      <div className="relative z-10 flex-1 text-white">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Merchant and Customer Satisfaction is Our First Priority
        </h2>
        <p className="mb-6 text-gray-200 max-w-lg">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition">
            Become a Merchant
          </button>
          <button className="border border-primary text-primary px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      
      <div className="relative z-10 flex-1">
        <img
          src={location}
          alt="Merchant Illustration"
          className="w-full h-auto max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default MerchantSection;
