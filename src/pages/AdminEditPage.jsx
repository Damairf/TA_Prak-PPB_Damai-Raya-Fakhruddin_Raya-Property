import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminEditPage = () => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }
      setList(data);
    };

    fetchData();
  }, []);

  const filteredList = list.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="md:pt-14 pt-10 px-6 pb-12">

      <h1 className="text-4xl font-bold text-center text-blue-900">
        Edit Data Hunian
      </h1>

      <p className="text-center mt-2 text-gray-700 mb-6">
        Halaman untuk mengubah dan menghapus hunian yang tersedia
      </p>

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

      <div className="flex justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg ml-2"
        >
          Kembali
        </button>

        <button
          onClick={() => navigate("/admin/tambah")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg mr-2"
        >
          Tambah
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentItems.length === 0 ? (
          <p className="text-center col-span-3 text-gray-600">
            Tidak ada hunian ditemukan.
          </p>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={item.image_url}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-bold mb-2">{item.nama}</h2>
              <p className="text-gray-600 mb-4 truncate">{item.deskripsi}</p>

              <button
                onClick={() => navigate(`/admin/${item.id}`)}
                className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold"
              >
                Lihat Detail / Edit
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-10 space-x-2">
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
    </div>
  );
};

export default AdminEditPage;
