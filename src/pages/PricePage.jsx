import React, { useEffect, useState } from "react";
import Price from "../components/Price";
import { supabase } from "../supabaseClient";

const PricePage = () => {
  const [paketList, setPaketList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching price data:", error);
        return;
      }

      setPaketList(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [currentPage]);

  if (paketList.length === 0) return null;

  const filteredPaket = paketList.filter((p) =>
    p.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPaket.length / itemsPerPage);
  const indexStart = (currentPage - 1) * itemsPerPage;
  const indexEnd = indexStart + itemsPerPage;
  const paginatedData = filteredPaket.slice(indexStart, indexEnd);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="md:pt-32 pt-8 md:pb-16 pb-24 px-5 md:px-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-center md:mb-8 mb-6 text-blue-900">
        Daftar Harga
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Cari hunian..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="
            w-full max-w-3xl p-3 rounded-xl text-black 
            outline-none border border-gray-400 
            focus:border-blue-400 focus:ring-2 focus:ring-blue-300
          "
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
        {paginatedData.length > 0 ? (
          paginatedData.map((paket) => (
            <Price
              key={paket.id}
              id={paket.id}
              title={paket.nama}
              image_url={paket.image_url}
              price={paket.harga}
              deskripsi={paket.deskripsi}
              maxFeatures={9}
              features={paket.fasilitas || []}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center mt-5">
            Tidak ada hunian yang cocok dengan pencarian.
          </p>
        )}
      </div>

      {filteredPaket.length > 3 && (
        <div className="flex justify-center gap-3 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <div className="px-4 py-2 font-semibold">
            Halaman {currentPage} / {totalPages}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={handleNext}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PricePage;
