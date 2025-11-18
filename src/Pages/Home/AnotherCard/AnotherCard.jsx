import React from 'react';
import trackingImg from '../../../assets/live-tracking.png';
import safeDeliveryImg from '../../../assets/safe-delivery.png';


const AnotherCard = () => {
    return (
        <div className="w-full space-y-6 border-t-2 border-dashed border-gray-400 py-10">

  {/* Feature 1 */}
  <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm ">
    <img src={trackingImg} alt="" className="w-32 md:w-40" />
     <div className='border-r-2 border-dashed border-gray-400 h-32'>

    </div>


    <div>
      <h3 className="text-xl font-semibold text-secondary">Live Parcel Tracking</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery,
        monitor your shipment’s journey and get instant status updates for complete peace of mind.
      </p>
    </div>
  </div>

  {/* Feature 2 */}
  <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm ">
    <img src={safeDeliveryImg} alt="" className="w-32 md:w-40 " />
    <div className='border-r-2 border-dashed border-gray-400 h-32'>

    </div>


    <div>
      <h3 className="text-xl font-semibold text-secondary">100% Safe Delivery</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        We ensure your parcels are handled with the utmost care and delivered securely to their
        destination. Our reliable process guarantees safe and damage-free delivery every time.
      </p>
    </div>
  </div>

  {/* Feature 3 */}
  <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm ">
    <img src={safeDeliveryImg} alt="" className="w-32 md:w-40" />
     <div className='border-r-2 border-dashed border-gray-400 h-32'>

    </div>


    <div>
      <h3 className="text-xl font-semibold text-secondary">24/7 Call Center Support</h3>
      <p className="text-gray-600 mt-2 text-sm leading-relaxed">
        Our dedicated support team is available around the clock to assist you with any questions,
        updates, or delivery concerns—anytime you need us.
      </p>
    </div>
  </div>

</div>

    );
};

export default AnotherCard;