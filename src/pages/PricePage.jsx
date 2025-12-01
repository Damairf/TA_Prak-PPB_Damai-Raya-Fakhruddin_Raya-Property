import React, { useEffect, useState } from "react";
import Price from "../components/Price";
import { supabase } from "../supabaseClient";

const PricePage = () => {
  const [hemat, setHemat] = useState(null);
  const [eksklusif, setEksklusif] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .in("id", [1, 2]);

      if (error) {
        console.error("Error fetching price data:", error);
        return;
      }

      data.forEach((item) => {
        if (item.id === 1) setHemat(item);
        if (item.id === 2) setEksklusif(item);
      });
    };

    fetchData();
  }, []);

  if (!hemat || !eksklusif) return null;

  // 🔍 Filter berdasarkan title (nama paket)
  const paketList = [
    { key: "hemat", data: hemat },
    { key: "eksklusif", data: eksklusif },
  ];

  const filteredPaket = paketList.filter((p) =>
    p.data.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="md:pt-32 pt-8 md:pb-16 pb-24 px-5 md:px-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center md:mb-8 mb-6 text-blue-900">
        Daftar Harga
      </h1>

      {/* 🔍 SEARCH BAR */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Cari hunian..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full max-w-3xl p-3 rounded-xl text-black 
            outline-none border border-gray-400 
            focus:border-blue-400 focus:ring-2 focus:ring-blue-300
          "
        />
      </div>

      {/* Card Harga */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">
        {filteredPaket.length > 0 ? (
          filteredPaket.map((paket) => (
            <Price
              key={paket.data.id}
              id={paket.data.id}
              title={paket.data.nama}
              image_url={paket.data.image_url}
              price={paket.data.harga}
              deskripsi={paket.data.deskripsi}
              maxFeatures={9}
              features={paket.data.fasilitas || []}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center mt-5">
            Tidak ada hunian yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </div>
  );
};

export default PricePage;
