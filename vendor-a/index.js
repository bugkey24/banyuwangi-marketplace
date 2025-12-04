require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- KONEKSI DB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Vendor A (Warung) DB Connected"))
  .catch((err) => console.error(err));

// --- MIDDLEWARE API KEY ---
const apiKeyAuth = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== process.env.API_SECRET) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Akses Ditolak: API Key Salah/Tidak Ada",
    });
  }
  next();
};
app.use(apiKeyAuth);

// --- SCHEMA ---
const ProductSchema = new mongoose.Schema(
  {
    kd_produk: { type: String, unique: true, required: true },
    nm_brg: String,
    hrg: String,
    ket_stok: String,
  },
  {
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);
const ProductA = mongoose.model("ProductA", ProductSchema, "products_vendor_a");

// -- ROUTES --
// GET ALL
app.get("/api/produk", async (req, res) => {
  const data = await ProductA.find();
  res.json(data);
});

// GET
app.get("/api/produk/:kd", async (req, res) => {
  const item = await ProductA.findOne({ kd_produk: req.params.kd });
  if (!item) return res.status(404).json({ message: "Barang tidak ditemukan" });
  res.json(item);
});

// CREATE
app.post("/api/produk", async (req, res) => {
  try {
    const newItem = new ProductA(req.body);
    await newItem.save();
    res.status(201).json({ message: "Sukses", data: newItem });
  } catch (e) {
    if (e.code === 11000)
      return res.status(400).json({ message: "Kode Produk Duplikat!" });
    res.status(500).json({ error: e.message });
  }
});

// UPDATE
app.put("/api/produk/:kd", async (req, res) => {
  const updated = await ProductA.findOneAndUpdate(
    { kd_produk: req.params.kd },
    req.body,
    { new: true }
  );
  if (!updated)
    return res.status(404).json({ message: "Barang tidak ditemukan" });
  res.json({ message: "Update Sukses", data: updated });
});

// DELETE
app.delete("/api/produk/:kd", async (req, res) => {
  const deleted = await ProductA.findOneAndDelete({ kd_produk: req.params.kd });
  if (!deleted)
    return res.status(404).json({ message: "Barang tidak ditemukan" });
  res.json({ message: "Data Terhapus" });
});

app.listen(PORT, () => console.log(`Vendor A running on port ${PORT}`));
