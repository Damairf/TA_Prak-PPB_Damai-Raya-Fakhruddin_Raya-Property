import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AdminPage = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [fasilitas, setFasilitas] = useState([""]);
  const [fasilitasDetail, setFasilitasDetail] = useState([""]);
  const [harga, setHarga] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const updateArrayItem = (arr, setArr, index, value) => {
    const newArr = [...arr];
    newArr[index] = value;
    setArr(newArr);
  };

  const addArrayField = (arr, setArr) => {
    setArr([...arr, ""]);
  };

  const removeArrayField = (arr, setArr, index) => {
    if (arr.length <= 1) return;
    setArr(arr.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Jenis file harus PNG, JPG, atau JPEG!");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran file maksimal 5MB!");
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Gambar belum dipilih!");

    try {
      setLoading(true);

      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("price_images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicURL } = await supabase.storage
        .from("price_images")
        .getPublicUrl(filePath);

      const imageUrl = publicURL.publicUrl;

      const { data, error } = await supabase.from("detail_price").insert([
        {
          nama: nama,
          deskripsi: deskripsi,
          fasilitas: fasilitas,
          fasilitas_detail: fasilitasDetail,
          harga: harga,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      alert("Hunian berhasil ditambahkan!");
      navigate("/");
    } catch (err) {
      console.error("Error:", err.message);
      alert("Gagal menambahkan hunian. Cek console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-10 md:px-20">
      <h1 className="text-4xl font-bold text-center text-blue-900">
        Tambah Data Hunian
      </h1>

      <p className="text-center mt-2 text-gray-700 mb-10">
        Halaman untuk menambahkan hunian yang tersedia
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl mx-auto"
      >
        <button
          onClick={() => navigate("/")}
          type="button"
          className="mb-8 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
        >
          Kembali
        </button>

        {/* NAMA */}
        <label className="block mb-4">
          <span className="font-semibold">Nama Hunian</span>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-3 mt-1 border rounded-lg"
            required
          />
        </label>

        {/* DESKRIPSI */}
        <label className="block mb-4">
          <span className="font-semibold">Deskripsi</span>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full p-3 mt-1 border rounded-lg"
            rows="3"
            required
          />
        </label>

        {/* FASILITAS */}
        <div className="mb-4">
          <span className="font-semibold">Fasilitas</span>

          {fasilitas.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mt-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateArrayItem(
                    fasilitas,
                    setFasilitas,
                    index,
                    e.target.value
                  )
                }
                className="w-full p-3 border rounded-lg"
                placeholder={`Fasilitas ${index + 1}`}
                required
              />

              {fasilitas.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeArrayField(fasilitas, setFasilitas, index)
                  }
                  className="text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayField(fasilitas, setFasilitas)}
            className="mt-2 text-blue-600 font-semibold"
          >
            + Tambah Fasilitas
          </button>
        </div>

        {/* FASILITAS DETAIL */}
        <div className="mb-4">
          <span className="font-semibold">Fasilitas Detail</span>

          {fasilitasDetail.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 mt-2">
              <input
                type="text"
                value={item}
                onChange={(e) =>
                  updateArrayItem(
                    fasilitasDetail,
                    setFasilitasDetail,
                    idx,
                    e.target.value
                  )
                }
                className="w-full p-3 border rounded-lg"
                placeholder={`Fasilitas Detail ${idx + 1}`}
                required
              />

              {fasilitasDetail.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeArrayField(fasilitasDetail, setFasilitasDetail, idx)
                  }
                  className="text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => addArrayField(fasilitasDetail, setFasilitasDetail)}
            className="mt-2 text-blue-600 font-semibold"
          >
            + Tambah Fasilitas Detail
          </button>
        </div>

        {/* GAMBAR */}
        <label className="block mb-4">
          <span className="font-semibold">Unggah Gambar</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageUpload}
            className="w-full p-3 mt-1 border rounded-lg"
            required
          />
        </label>

        {/* HARGA */}
        <label className="block mb-6">
          <span className="font-semibold">Harga</span>
          <input
            type="text"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            className="w-full p-3 mt-1 border rounded-lg"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-900 text-white font-semibold py-3 rounded-xl 
                     hover:bg-blue-700 active:scale-95 transition"
        >
          {loading ? "Menyimpan..." : "Tambahkan"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/edit")}
          className="w-full mt-4 bg-green-600 text-white font-semibold py-3 rounded-xl 
             hover:bg-green-700 active:scale-95 transition"
        >
          Edit Hunian
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
