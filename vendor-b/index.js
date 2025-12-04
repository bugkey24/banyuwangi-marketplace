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
  .then(() => console.log("✅ Vendor B (Distro) DB Connected"));

// --- MIDDLEWARE API KEY ---
app.use((req, res, next) => {
  if (req.headers["x-api-key"] !== process.env.API_SECRET) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  next();
});

const ProductSchema = new mongoose.Schema(
  {
    sku: { type: String, unique: true, required: true },
    productName: String,
    price: Number,
    isAvailable: Boolean,
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
const ProductB = mongoose.model("ProductB", ProductSchema, "products_vendor_b");

// ROUTES
app.get("/api/products", async (req, res) => {
  res.json(await ProductB.find());
});

app.get("/api/products/:sku", async (req, res) => {
  const item = await ProductB.findOne({ sku: req.params.sku });
  item
    ? res.json(item)
    : res.status(404).json({ message: "Product not found" });
});

app.post("/api/products", async (req, res) => {
  try {
    const newItem = new ProductB(req.body);
    await newItem.save();
    res.status(201).json({ message: "Created", data: newItem });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/products/:sku", async (req, res) => {
  const updated = await ProductB.findOneAndUpdate(
    { sku: req.params.sku },
    req.body,
    { new: true }
  );
  res.json({ message: "Updated", data: updated });
});

app.delete("/api/products/:sku", async (req, res) => {
  await ProductB.findOneAndDelete({ sku: req.params.sku });
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Vendor B running on port ${PORT}`));
