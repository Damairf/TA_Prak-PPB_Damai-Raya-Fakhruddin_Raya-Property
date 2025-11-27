import React from "react";
import Price from "../components/Price";

import House1 from "../assets/slider4.jpg";
import House2 from "../assets/slider3.jpg";

const PricePage = () => {
  return (
    <div className="md:pt-32 pt-10 md:pb-16 pb-24 px-5 md:px-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-900">
        Daftar Harga
      </h1>

      <div className="flex flex-col md:flex-row items-stretch justify-center gap-10">

        <Price
          title="Hunian Hemat"
          img={House1}
          price="Rp. 120 Juta"
          maxFeatures={9}
          features={[
            "1 ruang tamu",
            "2 kamar tidur",
            "1 kamar mandi",
            "1 ruang keluarga",
            "1 garasi",
            "1 Tempat Laundry",
            "1 Dapur",
          ]}
        />

        <Price
          title="Hunian Luas"
          img={House2}
          price="Rp. 400 Juta"
          maxFeatures={9}
          features={[
            "1 ruang tamu",
            "4 kamar tidur",
            "3 kamar mandi",
            "1 ruang keluarga",
            "1 garasi",
            "1 Tempat Laundry",
            "1 Dapur",
            "1 Rooftop",
            "1 Taman kecil",
          ]}
        />

      </div>
    </div>
  );
};

export default PricePage;
