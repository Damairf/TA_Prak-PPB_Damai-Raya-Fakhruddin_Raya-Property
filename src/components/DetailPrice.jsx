import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import House1 from "../assets/slider4.jpg";
import House2 from "../assets/slider3.jpg";

const imgMap = {
  1: House1,
  2: House2,
};

const DetailPrice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setData(data);
      else console.error(error);
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto">

      <button
        onClick={() => navigate("/price")}
        className="mb-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
      >
        Kembali
      </button>

      <div className="bg-blue-900 p-4 rounded-2xl shadow-xl mb-6">
        <img
          src={imgMap[id]}
          alt={data?.nama || ""}
          className="w-full h-64 md:h-80 object-cover rounded-xl"
        />
      </div>

      <div className="text-black">
        <h2 className="text-2xl font-bold mb-3">{data?.nama}</h2>

        <h3 className="font-semibold text-lg mt-4 mb-2">Fasilitas:</h3>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          {data?.fasilitas?.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <h3 className="font-semibold text-lg mt-4">Harga:</h3>
        <p className="text-yellow-600 text-xl font-bold">
          Rp. {data?.harga}
        </p>
      </div>
    </div>
  );
};

export default DetailPrice;
