require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Vendor C (Resto) DB Connected"));

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

// --- SCHEMA (Nested) ---
const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true }, // ID Manual (501, 502)
    details: {
      name: String,
      category: String,
    },
    pricing: {
      base_price: Number,
      tax: Number,
    },
    stock: Number,
  },
  {
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);
const ProductC = mongoose.model("ProductC", ProductSchema, "products_vendor_c");

// --- ROUTES ---

// GET ALL
app.get("/api/menu", async (req, res) => {
  res.json(await ProductC.find());
});

// GET ONE (By ID Numerik)
app.get("/api/menu/:id", async (req, res) => {
  const item = await ProductC.findOne({ id: req.params.id });
  item ? res.json(item) : res.status(404).json({ message: "Menu not found" });
});

app.use(apiKeyAuth);

// CREATE
app.post("/api/menu", async (req, res) => {
  try {
    const newItem = new ProductC(req.body);
    await newItem.save();
    res.status(201).json({ message: "Created", data: newItem });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE
app.put("/api/menu/:id", async (req, res) => {
  const updated = await ProductC.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  res.json({ message: "Updated", data: updated });
});

// DELETE
app.delete("/api/menu/:id", async (req, res) => {
  await ProductC.findOneAndDelete({ id: req.params.id });
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Vendor C running on port ${PORT}`));
