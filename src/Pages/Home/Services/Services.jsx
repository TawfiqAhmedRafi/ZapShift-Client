import React from 'react';
import service from "../../../assets/service.png"
const Services = () => {
    return (
      <div className="bg-secondary px-6 py-16 rounded-3xl">
     
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="text-gray-200 max-w-2xl mx-auto mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

 <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">Express & Standard Delivery</h3>
    <p className="text-sm text-gray-600 mt-2">
      We deliver parcels within 24-72 hours in major cities.
      Express delivery in Dhaka within 4-6 hours.
    </p>
  </div>


  <div className="bg-primary p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">Nationwide Delivery</h3>
    <p className="text-sm text-gray-700 mt-2">
      We deliver nationwide with home delivery across every district.
    </p>
  </div>

 
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">Fulfillment Solution</h3>
    <p className="text-sm text-gray-600 mt-2">
      Inventory management, packaging, and after-sales support.
    </p>
  </div>


  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">Cash on Home Delivery</h3>
    <p className="text-sm text-gray-600 mt-2">
      100% COD anywhere in Bangladesh with product safety guaranteed.
    </p>
  </div>

  
  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">
      Corporate Service / Contract In Logistics
    </h3>
    <p className="text-sm text-gray-600 mt-2">
      Customized warehouse + inventory management for businesses.
      
    </p>
  </div>

  <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
    <img src={service} className="w-12 mb-3 mx-auto" alt="" />
    <h3 className="font-semibold text-lg text-gray-800">Parcel Return</h3>
    <p className="text-sm text-gray-600 mt-2">
      Easy return or exchange via our reverse logistics.
    </p>
  </div>


      </div>
    </div>
    );
};

export default Services;