import React, { useEffect, useState } from "react";
import Price from "../components/Price";
import { supabase } from "../supabaseClient";

import House1 from "../assets/slider4.jpg";
import House2 from "../assets/slider3.jpg";

const PricePage = () => {
  const [hemat, setHemat] = useState(null);
  const [eksklusif, setEksklusif] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .in("id", [1, 2]);

      if (error) {
        console.error("Error fetching data:", error);
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

  return (
    <div className="md:pt-32 pt-8 md:pb-16 pb-24 px-5 md:px-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center md:mb-12 mb-6 text-blue-900">
        Daftar Harga
      </h1>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">

        {hemat && (
          <Price
            id={hemat.id}
            title={hemat.nama}
            img={House1}
            price={hemat.harga}
            maxFeatures={9}
            features={hemat.fasilitas || []}
          />
        )}

        {eksklusif && (
          <Price
            id={eksklusif.id}
            title={eksklusif.nama}
            img={House2}
            price={eksklusif.harga}
            maxFeatures={9}
            features={eksklusif.fasilitas || []}
          />
        )}
      </div>
    </div>
  );
};

export default PricePage;
