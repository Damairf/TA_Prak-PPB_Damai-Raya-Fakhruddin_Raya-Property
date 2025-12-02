import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const DetailAdminEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    fasilitas: [],
    fasilitas_detail: [],
    harga: "",
    image_url: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const { data, error } = await supabase
        .from("detail_price")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const { id: _ignored, ...rest } = data;

      rest.fasilitas = Array.isArray(rest.fasilitas) ? rest.fasilitas : [];
      rest.fasilitas_detail = Array.isArray(rest.fasilitas_detail)
        ? rest.fasilitas_detail
        : [];

      setFormData(rest);
    };

    fetchDetail();
  }, [id]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImage = async () => {
    if (!newImage) return formData.image_url;

    const oldPath = formData.image_url.split("/").pop();

    if (oldPath) {
      await supabase.storage.from("price_images").remove([oldPath]);
    }

    const fileName = `price_${Date.now()}.${newImage.name.split(".").pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("price_images")
      .upload(fileName, newImage);

    if (uploadError) {
      console.error(uploadError);
      return formData.image_url;
    }

    const { data: publicURL } = supabase.storage
      .from("price_images")
      .getPublicUrl(fileName);

    return publicURL.publicUrl;
  };

  const handleSave = async () => {
    setLoading(true);

    const imageURL = await uploadImage();

    const { id: unusedId, ...updateData } = formData;

    const { error } = await supabase
      .from("detail_price")
      .update({
        ...updateData,
        image_url: imageURL,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert("Gagal menyimpan perubahan!");
      console.error(error);
    } else {
      alert("Perubahan berhasil disimpan!");
      navigate("/admin/edit");
    }
  };

  const handleDelete = async () => {
    const confirmDel = window.confirm(
      "Yakin ingin menghapus hunian ini beserta gambarnya?"
    );
    if (!confirmDel) return;

    const imgName = formData.image_url.split("/").pop();

    await supabase.storage.from("price_images").remove([imgName]);

    await supabase.from("detail_price").delete().eq("id", id);

    alert("Data berhasil dihapus!");
    navigate("/admin/edit");
  };

  return (
    <div className="md:pt-28 pt-10 px-6 pb-20 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/admin/edit")}
        type="button"
        className="mb-8 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
      >
        Kembali
      </button>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Edit Hunian: {formData.nama}
      </h1>

      <div className="space-y-5">
        {/* Nama */}
        <div>
          <label className="font-semibold">Nama</label>
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => updateField("nama", e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="font-semibold">Deskripsi</label>
          <textarea
            value={formData.deskripsi}
            onChange={(e) => updateField("deskripsi", e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* Fasilitas */}
        <div>
          <label className="font-semibold">Fasilitas</label>
          <textarea
            value={formData.fasilitas.join("\n")}
            onChange={(e) =>
              updateField("fasilitas", e.target.value.split("\n"))
            }
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* Fasilitas Detail */}
        <div>
          <label className="font-semibold">Fasilitas Detail</label>
          <textarea
            value={formData.fasilitas_detail.join("\n")}
            onChange={(e) =>
              updateField("fasilitas_detail", e.target.value.split("\n"))
            }
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* Harga */}
        <div>
          <label className="font-semibold">Harga</label>
          <input
            type="text"
            value={formData.harga}
            onChange={(e) => updateField("harga", e.target.value)}
            className="w-full p-3 border rounded-lg text-black"
          />
        </div>

        {/* Gambar */}
        <div>
          <label className="font-semibold">Gambar</label>

          {(newImage || formData.image_url) && (
            <img
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : formData.image_url || null
              }
              className="w-full h-56 object-cover rounded-xl mb-3"
              alt="Preview"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold"
        >
          Hapus Hunian
        </button>
      </div>
    </div>
  );
};

export default DetailAdminEditPage;
