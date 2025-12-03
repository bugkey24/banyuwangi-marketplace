require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const VENDOR_A = process.env.VENDOR_A_URL || 'http://localhost:3001';
const VENDOR_B = process.env.VENDOR_B_URL || 'http://localhost:3002';
const VENDOR_C = process.env.VENDOR_C_URL || 'http://localhost:3003';

// Konfigurasi Header
const axiosConfig = {
    headers: { 'x-api-key': process.env.API_SECRET }
};

app.get('/', (req, res) => res.send("System Ready. Access /api/catalog"));

app.get('/api/catalog', async (req, res) => {
    try {
        // Fetch Data dengan API Key Header
        const [resA, resB, resC] = await Promise.all([
            axios.get(${VENDOR_A}/api/produk, axiosConfig).catch(() => ({ data: [] })),
            axios.get(${VENDOR_B}/api/products, axiosConfig).catch(() => ({ data: [] })),
            axios.get(${VENDOR_C}/api/menu, axiosConfig).catch(() => ({ data: [] }))
        ]);

        let finalOutput = [];

        // 1. Vendor A Logic
        resA.data.forEach(item => {
            const hrgInt = parseInt(item.hrg);
            finalOutput.push({
                source: "Warung Klontong",
                key_id: item.kd_produk,
                name: item.nm_brg,
                final_price: hrgInt - (hrgInt * 0.1), // Diskon 10%
                status: item.ket_stok ? item.ket_stok.toLowerCase() : 'habis'
            });
        });

        // 2. Vendor B Logic
        resB.data.forEach(item => {
            finalOutput.push({
                source: "Distro Fashion",
                key_id: item.sku,
                name: item.productName,
                final_price: item.price,
                status: item.isAvailable ? "Tersedia" : "Habis"
            });
        });

        // 3. Vendor C Logic
        resC.data.forEach(item => {
            let fname = item.details.name;
            if(item.details.category === 'Food') fname += " (Recommended)";
            
            finalOutput.push({
                source: "Resto Kuliner",
                key_id: RESTO-${item.id},
                name: fname,
                final_price: item.pricing.base_price + item.pricing.tax,
                status: item.stock > 0 ? "Tersedia" : "Habis"
            });
        });

        res.json({ total: finalOutput.length, data: finalOutput });

    } catch (error) {
        res.status(500).json({ error: "Integration Failed", details: error.message });
    }
});

app.listen(PORT, () => console.log(`Integrator running on port ${PORT}`));