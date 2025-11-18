import React, { useState } from "react";

const faqs = [
  {
    question: "How does this posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. It gently reminds you to sit and stand upright, strengthening your muscles over time.",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes! The posture corrector is adjustable and designed to fit a wide range of body types and ages. It can be worn comfortably by teenagers, adults, and older individuals, helping everyone maintain better posture.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Absolutely. By gently aligning your spine and shoulders, the corrector reduces strain on muscles and joints, which can help alleviate back pain. Regular use strengthens postural muscles, leading to noticeable posture improvement over time.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Yes, our smart model comes with vibration alerts that remind you to correct your posture if you slouch. The alerts are gentle and customizable, helping you develop better posture habits effortlessly.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "You will receive a notification via email or SMS if you subscribe to the restock alert. Simply enter your email or phone number on the product page, and we’ll let you know as soon as it’s available again.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-6 md:px-16 rounded-2xl max-w-5xl mx-auto my-10">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-gray-600 text-md md:text-lg max-w-2xl mx-auto">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* FAQ Items */}
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden transition-colors ${
              openIndex === index ? "bg-[#C3DFE2]" : "bg-white shadow-md"
            }`}
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center font-medium text-gray-800 hover:bg-gray-100 transition"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-primary font-bold text-xl">
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 text-gray-700 border-t border-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
