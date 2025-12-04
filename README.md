```
🚀 Banyuwangi Marketplace - Interoperability System
https://img.shields.io/badge/Node.js-v20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white
https://img.shields.io/badge/Alpine_Linux-0D597F?style=for-the-badge&logo=alpinelinux&logoColor=white

A Microservices Aggregator & Data Interoperability Simulation.
Final Project for Interoperability Course - Politeknik Negeri Banyuwangi.

📖 Project Overview
Banyuwangi Marketplace is a backend system designed to simulate a real-world Data Integration scenario. The system aggregates product data from three different MSME (UMKM) vendors, each representing a different technological era and data structure standard.

The core challenge addressed by this project is Data Interoperability: How to consume, map, and normalize disparate data formats (Legacy String, Modern Typed, and Complex Nested) into a single, standardized JSON output for the client (Government Dashboard).

🎯 Key Objectives
Microservices Architecture: Decoupling services to ensure independence and scalability.

Data Normalization: Converting raw, unstructured data into a standardized schema.

Aggregator Pattern: Using a centralized Gateway (Integrator) to orchestrate data fetching.

Self-Hosted Infrastructure: Deploying on a private Home Server using Docker and Cloudflare Tunnels.

🏗️ System Architecture
We utilize a Monorepo Microservices approach orchestrated by Docker Compose.

⚙️ Why This Tech Stack?
MongoDB (NoSQL): Chosen for its Schema Flexibility. Vendor A stores prices as Strings ("15000"), while Vendor B uses Integers (75000). MongoDB handles these distinct data types natively without the rigidity of SQL.

Docker: Ensures consistent environments across development and production, isolating each service in its own container.

Cloudflare Tunnel: Exposes local services to the internet securely without opening firewall ports.

📂 Project Structure (Monorepo)
text
/banyuwangi-marketplace
├── docker-compose.yml # Service Orchestration & Port Mapping
├── .env # Environment Variables (Secrets)
├── /integrator # [Service] API Gateway, Logic, & Normalization
├── /vendor-a # [Service] Warung Legacy (String Data Structure)
├── /vendor-b # [Service] Distro Modern (CamelCase & Typed Data)
└── /vendor-c # [Service] Resto Complex (Nested Object Data)
🚀 Getting Started (Local Development)
Prerequisites
Node.js v18+

Docker & Docker Compose

Git

1. Clone the Repository
   bash
   git clone https://github.com/your-username/banyuwangi-marketplace.git
   cd banyuwangi-marketplace
2. Configure Environment Variables
   Create a .env file in the root directory, then copy it to all sub-directories (vendor-a, vendor-b, vendor-c, integrator).

Template .env:

bash

# Database Configuration (MongoDB Atlas)

MONGO_URI=mongodb+srv://admin_marketplace:your_password@cluster0.mongodb.net/banyuwangi_marketplace?appName=Cluster0

# Security (API Key for Internal Communication)

API_SECRET=your_secure_api_key_2025

# Service URL Configuration (For Local Fallback)

PORT=3000
VENDOR_A_URL=http://marketplace-vendor-a:3000
VENDOR_B_URL=http://marketplace-vendor-b:3000
VENDOR_C_URL=http://marketplace-vendor-c:3000 3. Run with Docker
bash
docker compose up -d --build
Services will be available at:

Integrator (Public API): http://localhost:4000

Vendor A: http://localhost:4001

Vendor B: http://localhost:4002

Vendor C: http://localhost:4003

🔐 API Documentation
All endpoints are protected for security. You must include the x-api-key header in every request.

Auth Header:

http
x-api-key: your_secure_api_key_2025

1. Integrator (The Main Dashboard)
   This service consumes data from all vendors, normalizes it, and applies business logic (Discounts, Tax, Formatting).

Endpoint: GET /api/catalog

Response Example:

json
{
"total": 3,
"data": [
{
"source": "Warung Klontong",
"key_id": "A001",
"name": "Kopi Kapal Api",
"final_price": 13500,
"status": "ada"
},
{
"source": "Resto Kuliner",
"key_id": "RESTO-501",
"name": "Nasi Tempong (Recommended)",
"final_price": 22000,
"status": "Tersedia"
}
]
} 2. Vendor A (Warung - Legacy System)
Simulates an old system using Snake_case and String data types.

Base URL: /api/produk

Schema:

json
{ "kd_produk": "String", "nm_brg": "String", "hrg": "String", "ket_stok": "String" }
Endpoints:

GET / (Get All)

POST / (Create)

PUT /:kd (Update)

DELETE /:kd (Delete)

3. Vendor B (Distro - Modern System)
   Simulates a modern system using CamelCase and proper Data Types.

Base URL: /api/products

Schema:

json
{ "sku": "String", "productName": "String", "price": "Number", "isAvailable": "Boolean" }
Endpoints:

GET / (Get All)

POST / (Create)

PUT /:sku (Update)

DELETE /:sku (Delete)

4. Vendor C (Resto - Enterprise System)
   Simulates a complex system with Nested Objects.

Base URL: /api/menu

Schema:

json
{
"id": "Number",
"details": { "name": "String", "category": "String" },
"pricing": { "base_price": "Number", "tax": "Number" },
"stock": "Number"
}
Endpoints:

GET / (Get All)

POST / (Create)

PUT /:id (Update)

DELETE /:id (Delete)

🌐 Production Deployment
This project is deployed on a self-hosted Home Server running Alpine Linux. Public access is managed via Cloudflare Zero Trust (Tunnel).

Service Production URL:

Integrator (Public): https://kabupaten.yourdomain.com/api/catalog

Vendor A: https://warung.yourdomain.com/api/produk

Vendor B: https://distro.yourdomain.com/api/products

Vendor C: https://resto.yourdomain.com/api/menu

👨‍💻 Development Team
Role Responsibility Tech Focus
Vendor A Legacy API Provider String Data Handling
Vendor B Modern API Provider Typed Data Handling
Vendor C Complex API Provider Nested Data Handling
Integrator Lead / DevOps API Gateway, Normalization, Docker Ops System Integration

2025 © Banyuwangi Marketplace Team.
Built with Node.js & Docker.
```
