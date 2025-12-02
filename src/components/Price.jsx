import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

const Price = ({ title, features, price, maxFeatures = 10, id, image_url }) => {
  const navigate = useNavigate();

  const normalizedFeatures = [
    ...features,
    ...Array(Math.max(0, maxFeatures - features.length)).fill(""),
  ];

  return (
    <div className="bg-blue-900 text-white rounded-xl shadow-lg p-5 w-full md:w-[450px] h-full flex flex-col">
      <div className="w-full h-[230px] rounded-xl overflow-hidden">
        <LazyImage
          src={image_url}
          alt={title}
          className="w-full h-full object-cover"
        />
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
        Harga: <span className="text-yellow-300">Rp. {price}</span>
      </p>

      <button
        onClick={() => navigate(`/detail-price/${id}`)}
        className="mt-5 bg-white text-blue-900 font-semibold py-2 rounded-lg 
                   hover:bg-gray-200 active:scale-95 transition"
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default Price;
