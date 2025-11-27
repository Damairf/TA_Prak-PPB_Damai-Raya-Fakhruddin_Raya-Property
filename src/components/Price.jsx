import React from "react";

const Price = ({ title, img, features, price, maxFeatures = 10 }) => {
  const normalizedFeatures = [
    ...features,
    ...Array(Math.max(0, maxFeatures - features.length)).fill(""),
  ];

  return (
    <div className="bg-blue-900 text-white rounded-xl shadow-lg p-5 w-full md:w-[450px] h-full flex flex-col">

      <div className="w-full h-[230px] rounded-xl overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      <h2 className="text-2xl font-bold mt-4">{title}</h2>

      <ul className="mt-3 space-y-1 flex-grow min-h-[260px]">
        {normalizedFeatures.map((item, index) => (
          <li key={index} className="text-white text-base min-h-[22px]">
            {item ? `• ${item}` : ""}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xl font-semibold">
        Harga: <span className="text-yellow-300">{price}</span>
      </p>
    </div>
  );
};

export default Price;
