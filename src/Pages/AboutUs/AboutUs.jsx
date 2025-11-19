import React, { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Story", "Mission", "Success", "Terms & Others"];

  const tabContents = [
    <>
      <p className="mb-4">
        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
      </p>
      <p className="mb-4">
        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
      </p>
      <p className="mb-4">
        We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
      </p>
    </>,
    <>
    <p className="mb-4">
      Our mission is to make shipping seamless, fast, and worry-free for everyone. We aim to remove the complexities of logistics, providing a service that anyone can trust. Transparency and accountability are at the heart of our mission.
    </p>
    <p className="mb-4">
      We focus on real-time tracking, reliable service, and exceptional customer support at every stage. Every shipment is treated with care, ensuring that promises are not just made, but delivered. Efficiency and precision guide our daily operations.
    </p>
    <p className="mb-4">
      Innovation drives us to constantly improve our services, adopting the latest technologies and industry best practices. Our team is dedicated to making delivery faster, safer, and more reliable every day. Together, we aim to redefine customer experience in logistics.
    </p>
  </>,
  <>
    <p className="mb-4">
      We've successfully delivered millions of parcels across the country, building a reputation for trust and reliability. Each successful delivery is a testament to the hard work and dedication of our team. We take pride in every satisfied customer.
    </p>
    <p className="mb-4">
      Our success is measured not only by the number of parcels delivered but also by the loyalty and repeat service of our customers. We continuously strive to exceed expectations, ensuring that every delivery experience is smooth and dependable. Growth and trust go hand in hand.
    </p>
    <p className="mb-4">
      Awards and recognitions reflect our commitment to excellence and continuous improvement. They remind us of our responsibility to maintain high standards. Every achievement motivates us to innovate further and enhance our delivery services.
    </p>
  </>,
  <>
    <p className="mb-4">
      Our terms ensure transparency, reliability, and trust with every shipment. Clear policies help our customers understand what to expect, eliminating confusion. We believe that honesty and openness are key to building long-term relationships.
    </p>
    <p className="mb-4">
      We strictly adhere to industry standards and maintain a strong focus on customer satisfaction. Every procedure is designed to protect both the sender and recipient, ensuring a smooth shipping experience. Safety, clarity, and accountability guide our operations.
    </p>
    <p className="mb-4">
      Additional policies and detailed procedures are documented for each type of service we offer. Customers can refer to these for clarity on terms, insurance, and delivery commitments. Our aim is to provide complete peace of mind with every shipment.
    </p>
  </>,
  ];

  return (
    <div className="bg-base-100 rounded-2xl md:p-15 p-5">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-secondary">About Us</h2>
        <p className="text-sm mt-4 text-[#606060]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal <br /> packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      <div className="border-t my-10 border-gray-400"></div>

      {/* Tabs */}
      <div className="w-full max-w-3xl ">
        <div className="flex ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === index ? "text-secondary border-b-2 border-secondary" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-6 text-gray-600 space-y-4">
          {tabContents[activeTab]}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
