import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useLocation } from "react-router-dom";

const DetailPrice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);

  const location = useLocation();
  const fromHome = location.state?.fromHome || false;

  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalReviews, setTotalReviews] = useState(0);

  const namaUser = localStorage.getItem("nama") || "Tamu";

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

  const fetchReviews = async () => {
    const { count } = await supabase
      .from("review")
      .select("*", { count: "exact", head: true })
      .eq("detail_id", id);

    setTotalReviews(count || 0);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("detail_id", id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error) setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || ulasan.trim() === "")
      return alert("Lengkapi rating dan ulasan!");

    setLoading(true);

    const { error } = await supabase.from("review").insert([
      {
        rating,
        ulasan,
        nama: namaUser,
        detail_id: id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Gagal mengirim ulasan");
      return;
    }

    setRating(0);
    setUlasan("");

    fetchReviews();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(fromHome ? "/" : "/price")}
        className="mb-4 bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
      >
        Kembali
      </button>

      {/* FOTO */}
      <div className="bg-blue-900 p-4 rounded-2xl shadow-xl mb-6">
        <img
          src={data?.image_url}
          alt={data?.nama || ""}
          className="w-full h-64 md:h-80 object-cover rounded-xl"
        />
      </div>

      {/* DETAIL */}
      <div className="text-black">
        <h2 className="text-2xl font-bold mb-3">{data?.nama}</h2>

        {data?.deskripsi && (
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            {data.deskripsi}
          </p>
        )}

        <h3 className="font-semibold text-xl mt-4 mb-2">Fasilitas:</h3>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          {data?.fasilitas_detail?.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <h3 className="font-semibold text-xl mt-4 mb-2">Harga:</h3>
        <p className="text-yellow-600 text-xl font-bold">Rp. {data?.harga}</p>

        <div className="mt-10 p-6 bg-gray-100 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Ulasan</h2>

          {reviews.length === 0 && (
            <p className="text-gray-600 italic">
              Belum ada ulasan untuk hunian ini.
            </p>
          )}

          <div className="space-y-4 mb-8">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-lg shadow border">
                <p className="text-yellow-500 text-lg">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </p>
                <p className="font-semibold">{r.nama}</p>
                <p className="text-gray-700">{r.ulasan}</p>
              </div>
            ))}
          </div>

          {totalReviews > limit && (
            <div className="flex justify-center items-center gap-3 mt-4 mb-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`px-3 py-1 rounded-lg border ${
                  page === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Prev
              </button>

              <span className="font-semibold">
                {page} / {Math.ceil(totalReviews / limit)}
              </span>

              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(Math.ceil(totalReviews / limit), p + 1)
                  )
                }
                disabled={page === Math.ceil(totalReviews / limit)}
                className={`px-3 py-1 rounded-lg border ${
                  page === Math.ceil(totalReviews / limit)
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold">Rating:</label>
              <div className="flex gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setRating(num)}
                    className={`text-2xl ${
                      rating >= num ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="w-full border p-3 rounded-lg"
              placeholder="Tulis ulasan anda..."
              value={ulasan}
              onChange={(e) => setUlasan(e.target.value)}
              rows={3}
            ></textarea>

            <button
              disabled={loading}
              className="bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
            >
              {loading ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailPrice;
