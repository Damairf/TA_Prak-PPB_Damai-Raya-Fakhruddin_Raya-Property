import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import dalam1 from "../assets/dalam1.jpg";
import dalam2 from "../assets/dalam2.jpg";
import dalam3 from "../assets/dalam3.jpg";
import dalam4 from "../assets/dalam4.jpg";

const imgMap = {
  1: dalam1,
  2: dalam2,
  3: dalam3,
  4: dalam4,
};

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("portfolio_detail")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setData(data);
      else console.error(error);
    };

    fetchDetail();
  }, [id]);

  if (!data) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <button
        onClick={() => navigate("/portofolio")}
        className="mb-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
      >
        Kembali
      </button>

      <div className="bg-blue-900 p-4 rounded-2xl shadow-xl mb-6">
        <img
          src={imgMap[id]}
          alt={data.keterangan}
          className="w-full h-64 md:h-80 object-cover rounded-xl"
        />
      </div>

      <div className="text-black">
        <h2 className="text-2xl font-bold mb-3">{data.keterangan}</h2>

        <p className="leading-relaxed text-gray-700 text-base">
          {data.deskripsi}
        </p>
      </div>
    </div>
  );
};

export default Detail;
