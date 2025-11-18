import React from 'react';
import { FaBuilding, FaMoneyBillWave, FaShippingFast, FaTruck, FaWarehouse } from 'react-icons/fa';
import { HiTruck } from 'react-icons/hi';

const HowItWork = () => {
    return (
        <div className='my-8'>
            <p className='text-2xl text-secondary font-bold pb-5'>How It Works</p>
           <div className="grid grid-cols-4 gap-4 ">

      {/* Card 1 */}
      <div className="p-5 bg-white shadow rounded-xl hover:shadow-lg hover:-translate-y-1 
    transition-all duration-300 ease-out">
        <FaTruck className="text-3xl text-secondary mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Booking Pick & Drop</h3>
        <p className="text-sm text-gray-600 mt-1">
          Seamless doorstep pickup and delivery service for your parcels.
        </p>
      </div>

      {/* Card 2 */}
      <div className="p-5 bg-white shadow rounded-xl hover:shadow-lg hover:-translate-y-2 
    transition-all duration-300 ease-out">
        <FaMoneyBillWave className="text-3xl text-secondary mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Cash on Delivery</h3>
        <p className="text-sm text-gray-600 mt-1">
          Hassle-free COD service for businesses and customers.
        </p>
      </div>

      {/* Card 3 */}
      <div className="p-5 bg-white shadow rounded-xl hover:shadow-lg hover:-translate-y-2 
    transition-all duration-300 ease-out">
        <FaWarehouse className="text-3xl text-secondary mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Delivery Hub</h3>
        <p className="text-sm text-gray-600 mt-1">
          Multiple delivery hubs ensuring fast parcel distribution.
        </p>
      </div>

      {/* Card 4 */}
      <div className="p-5 bg-white shadow rounded-xl hover:shadow-lg hover:-translate-y-2 
    transition-all duration-300 ease-out">
        <FaBuilding className="text-3xl text-secondary mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Booking SME & Corporate</h3>
        <p className="text-sm text-gray-600 mt-1">
          Tailored delivery solutions for SMEs and corporate clients.
        </p>
      </div>

    </div>
        </div>
    );
};

export default HowItWork;