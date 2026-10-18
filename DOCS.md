# 📚 คู่มือการพัฒนาโปรเจกต์ Product Management System (Full-Stack Docs)

เอกสารฉบับนี้อธิบายลำดับขั้นตอนการสร้างโปรเจกต์ **Product Management System** ตั้งแต่เริ่มต้นทีละขั้นตอน (Step-by-Step) ตั้งแต่การวางโครงสร้างไฟล์แรก คำสั่งติดตั้ง Library / Package ที่จำเป็นทั้งหมด พร้อมโค้ดตัวอย่างฉบับสมบูรณ์ครบทุกไฟล์

---

## 🏗️ 1. สถาปัตยกรรมและเทคโนโลยีที่ใช้ (Tech Stack)

* **Database**: PostgreSQL 15 (รันผ่าน Docker Container)
* **Backend**: Node.js, Express.js 5, Sequelize ORM, PostgreSQL Driver (`pg`), CORS, Dotenv, Nodemon
* **Frontend**: React 19, Vite, React Router v7/8, TailwindCSS v4, DaisyUI v5, Lucide React (Icons), SweetAlert2
* **DevOps**: Docker & Docker Compose (รองรับ Hot-reload ทั้ง Frontend, Backend และ Database)

```
product-management-app/
├── .env                              # ค่าตัวแปร Environment ระดับ Root สำหรับ Docker Compose
├── .gitignore                        # ระบุไฟล์ที่ไม่ต้องการ Push ขึ้น Git
├── docker-compose.yml                # คอนฟิกรัน Postgres, Backend และ Frontend
├── backend/
│   ├── .env                          # ค่า Config สำหรับการเชื่อมต่อ Database และ Port
│   ├── package.json                  # กำหนด dependencies และ scripts ของ Backend
│   ├── nodemon.json                  # คอนฟิกการ Watch และ Reload เซิร์ฟเวอร์
│   ├── index.js                      # Entry point ของ Backend API Server
│   ├── config/
│   │   └── database.js               # จัดการเชื่อมต่อ PostgreSQL ผ่าน Sequelize
│   ├── model/
│   │   └── productModel.js           # โครงสร้างตาราง (Schema) สินค้า
│   ├── controller/
│   │   └── productController.js      # ฟังก์ชัน CRUD จัดการข้อมูลสินค้า
│   └── router/
│       └── productRouter.js          # เส้นทาง API Endpoints (/api/products)
└── frontend/
    ├── .env                          # URL ชี้ไปยัง Backend API
    ├── index.html                    # Single Page Application HTML Template
    ├── vite.config.js                # คอนฟิก Vite พร้อม TailwindCSS Plugin
    ├── package.json                  # กำหนด dependencies ของ React Frontend
    └── src/
        ├── main.jsx                  # จุดเริ่มต้นการ Render ของ React DOM
        ├── App.jsx                   # ตัวจัดการ Routes ของหน้าเว็บ
        ├── index.css                 # นำเข้า TailwindCSS และ DaisyUI ธีม Dark
        ├── App.css                   # Custom Styles
        ├── services/
        │   ├── productService.js     # ฟังก์ชันเรียก REST API ติดต่อ Backend
        │   └── alertService.js       # ฟังก์ชันแจ้งเตือนและ Modal ด้วย SweetAlert2
        ├── components/
        │   ├── PageState.jsx         # แสดง Loading Spinner และ Alert ข้อผิดพลาด
        │   ├── ProductHeader.jsx     # ส่วนหัว Banner แสดงชื่อระบบ
        │   ├── ProductForm.jsx       # ฟอร์มสำหรับกรอก/แก้ไขข้อมูลสินค้า
        │   └── ProductList.jsx       # แสดงรายการสินค้าแบบ Responsive Grid Cards
        └── pages/
            ├── ProductPage.jsx       # หน้ารายการสินค้าหลัก (Dashboard)
            ├── ProductFormPage.jsx   # หน้าฟอร์มกลาง (รองรับทั้ง Add และ Edit)
            ├── AddProductPage.jsx    # หน้าเพิ่มสินค้าใหม่
            └── EditProductPage.jsx   # หน้าแก้ไขสินค้าเดิม
```

---

## 🚀 2. ขั้นตอนการสร้างตามลำดับ (Step-by-Step Build Order)

ลำดับการพัฒนาที่ถูกต้องตามหลักวิศวกรรมซอฟต์แวร์:
1. **Root Setup & Docker**: สร้างโฟลเดอร์โครงการ, ตั้งค่า `.gitignore`, `.env` และ Docker Compose เพื่อเตรียมฐานข้อมูล PostgreSQL
2. **Backend Development**:
   - สร้างโฟลเดอร์ `backend/` และ Initialize `package.json`
   - ติดตั้ง Express, Sequelize, PG, CORS, Dotenv, Nodemon
   - สร้างโมดูลเชื่อมต่อ Database (`config/database.js`)
   - สร้างโมเดลข้อมูล (`model/productModel.js`)
   - สร้าง Business Logic Controller (`controller/productController.js`)
   - กำหนด Route API (`router/productRouter.js`)
   - รวมระบบที่ `backend/index.js`
3. **Frontend Development**:
   - ใช้ Vite สร้างโปรเจกต์ React 19
   - ติดตั้ง TailwindCSS, DaisyUI, React Router, SweetAlert2, Lucide React
   - ตั้งค่า Vite Plugin และ CSS ธีม
   - สร้าง Services ติดต่อ API และระบบแจ้งเตือน
   - สร้าง Reusable Components (Header, State, List, Form)
   - สร้าง Pages และจัดการ Routing

---

## 📁 ส่วนที่ 1: การตั้งค่าระบบหลัก (Root Setup & Docker)

### ขั้นตอนที่ 1.1: สร้างโฟลเดอร์โปรเจกต์
```bash
mkdir product-management-app
cd product-management-app
```

### ขั้นตอนที่ 1.2: สร้างไฟล์ `.gitignore`
ป้องกันไม่ให้ไฟล์ที่ไม่จำเป็นและ Secrets ถูก commit ขึ้น git

**ไฟล์: `.gitignore`**
```gitignore
node_modules/
.env
```

---

### ขั้นตอนที่ 1.3: สร้างไฟล์ `.env` (Root Environment)
กำหนดค่าตัวแปรระดับ Root เพื่อส่งต่อให้ Docker Compose และฐานข้อมูล

**ไฟล์: `.env`**
```env
POSTGRES_USER=dev_user
POSTGRES_PASSWORD=dev_password
POSTGRES_DB=product_db
POSTGRES_PORT=5433

NODE_ENV=development
DB_HOST=postgres-db
DB_PORT=5432
DB_NAME=product_db
DB_USER=dev_user
DB_PASSWORD=dev_password

VITE_API_URL=http://localhost:5000
BACKEND_PORT=5000

FRONTEND_PORT=5173
```

---

### ขั้นตอนที่ 1.4: สร้างไฟล์ `docker-compose.yml`
กำหนดการรัน 3 Services: `postgres-db`, `backend`, และ `frontend`

**ไฟล์: `docker-compose.yml`**
```yaml
services:
  postgres-db:
    image: postgres:15-alpine
    container_name: express_postgres_container
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      # Host Port: Container port
      - "${POSTGRES_PORT}:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test:
        ["CMD-SHELL",
        "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"
        ]
      interval: 5s
      timeout: 5s
      retries: 10
  backend:
    image: node:22-alpine
    working_dir: /app
    volumes:
      - ./backend:/app
      - backend_node_modules:/app/node_modules
    environment:
      - NODE_ENV=${NODE_ENV}
      - DB_HOST=${DB_HOST}
      - DB_PORT=${DB_PORT}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
    command: >-
      sh -c 'if [ "$$NODE_ENV" = "development" ]; then
      npm install && npm run dev;
      else npm install --omit=dev && npm start;
      fi'
    ports:
      - "${BACKEND_PORT}:5000"
    depends_on:
      postgres-db:
        condition: service_healthy
  frontend:
    image: node:22-alpine
    working_dir: /app
    volumes:
      - ./frontend:/app
      - frontend_node_modules:/app/node_modules
    environment:
      - VITE_API_URL=${VITE_API_URL}
    command: sh -c "npm install && npm run dev -- --host 0.0.0.0 --force"
    ports:
      - "${FRONTEND_PORT}:5173"
    depends_on:
      - backend

volumes:
  pgdata:
  backend_node_modules:
  frontend_node_modules:
```

---

## 📁 ส่วนที่ 2: การพัฒนาฝั่ง Backend (Node.js & Express API)

### ขั้นตอนที่ 2.1: เตรียมโฟลเดอร์และติดตั้ง Dependencies
```bash
mkdir backend
cd backend
npm init -y
```

ติดตั้งแพ็กเกจหลัก (Production Dependencies):
```bash
npm install express cors dotenv pg pg-hstore sequelize
```

ติดตั้งแพ็กเกจสำหรับโหมดพัฒนา (Development Dependencies):
```bash
npm install -D nodemon
```

---

### ขั้นตอนที่ 2.2: กำหนดค่า `backend/package.json`
ตั้งค่า `"type": "module"` เพื่อใช้ ES Modules (import/export) และสร้าง scripts สำหรับรัน nodemon

**ไฟล์: `backend/package.json`**
```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Restful API for Product Management App",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Worachet Uttha",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "pg": "^8.23.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.8"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

---

### ขั้นตอนที่ 2.3: สร้างไฟล์ `backend/nodemon.json`
ตั้งค่าให้ Nodemon ตรวจจับไฟล์ `.js` และ `.json` โดยรองรับ Legacy Watch สำหรับ Docker Volume

**ไฟล์: `backend/nodemon.json`**
```json
{
  "watch": ["."],
  "ext": "js, json",
  "ignore": ["node_modules"],
  "legacyWatch": true,
  "exec": "node index.js"
}
```

---

### ขั้นตอนที่ 2.4: สร้างไฟล์ `backend/.env`
กำหนดค่าเชื่อมต่อ Database ประจำโฟลเดอร์ Backend

**ไฟล์: `backend/.env`**
```env
BACKEND_PORT=5000
DB_HOST=postgres-db
DB_PORT=5432
DB_NAME=product_db
DB_USER=dev_user
DB_PASSWORD=dev_password
```

---

### ขั้นตอนที่ 2.5: สร้างไฟล์ `backend/config/database.js`
เชื่อมต่อกับ PostgreSQL ผ่าน Sequelize ORM และซิงก์ Schema อัตโนมัติในโหมด Development

**ไฟล์: `backend/config/database.js`**
```javascript
import { Sequelize } from "sequelize";
import dotnev from "dotenv";
dotnev.config();

// Connection string ของ Cloud PostgreSQL (เช่น Neon)
// const databaseURL = process.env.DATABASE_URL_UNPOOLED;

// const sequelize = new Sequelize(databaseURL, {
//   dialect: "postgres",
//   logging: false,                 // ปิดการพิมพ์ SQL ดิบใน console
//   dialectOptions: {
//     ssl: { require: true, rejectUnauthorized: false }, // Cloud DB ส่วนใหญ่บังคับ SSL
//   },
// });


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  },
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development",
    });
    console.log("Table Synchronized!");
  } catch (error) {
    console.error("Connection failed", error);
    process.exit(1);
  }
};
export { sequelize, connectDB };
```

---

### ขั้นตอนที่ 2.6: สร้างไฟล์ `backend/model/productModel.js`
นิยาม Model โครงสร้างตารางสินค้า (Product Schema)

**ไฟล์: `backend/model/productModel.js`**
```javascript
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
export default Product;
```

---

### ขั้นตอนที่ 2.7: สร้างไฟล์ `backend/controller/productController.js`
จัดการ Business Logic สำหรับ CRUD ได้แก่ สร้างสินค้า, อ่านสินค้าทั้งหมด, อ่านตาม ID, อัปเดต และ ลบสินค้า

**ไฟล์: `backend/controller/productController.js`**
```javascript
import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !price) {
      return res
        .status(400)
        .json({ message: "Name and Price are required fields" });
    }
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      image,
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};
const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const { name, price, description, image } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price cannot be null" });
    }
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updates = {};
    if (name != undefined) updates.name = name;
    if (price != undefined) updates.price = Number(price);
    if (description != undefined) updates.description = description;
    if (image != undefined) updates.image = image;
    await product.update(updates);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    return res.status(200).json({
      message: "Product is deleted successfully",
      deleteProduct: product,
    });
  } catch (error) {
    return next(error);
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
```

---

### ขั้นตอนที่ 2.8: สร้างไฟล์ `backend/router/productRouter.js`
กำหนด Routing ตามหลัก RESTful API เพื่อผูก URL Endpoint เข้ากับ Controller

**ไฟล์: `backend/router/productRouter.js`**
```javascript
import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
```

---

### ขั้นตอนที่ 2.9: สร้างไฟล์ `backend/index.js`
ไฟล์ Entry point หลักของเซิร์ฟเวอร์ Express เริ่มต้นการเชื่อมต่อฐานข้อมูลและเปิดพอร์ต

**ไฟล์: `backend/index.js`**
```javascript
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";
dotenv.config();
const PORT = process.env.BACKEND_PORT;
const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h>Welcome to Restful API for Product Management App</h>");
});
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
```

---

## 📁 ส่วนที่ 3: การพัฒนาฝั่ง Frontend (React 19 + Vite)

### ขั้นตอนที่ 3.1: สร้างโปรเจกต์ Vite และติดตั้ง Dependencies
จาก Root โฟลเดอร์:
```bash
npm create vite@latest frontend -- --template react
cd frontend
```

ติดตั้ง Dependencies ที่จำเป็น:
```bash
npm install react-router sweetalert2 lucide-react tailwindcss @tailwindcss/vite
npm install -D daisyui
```

---

### ขั้นตอนที่ 3.2: ตรวจสอบ `frontend/package.json`

**ไฟล์: `frontend/package.json`**
```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "lucide-react": "^1.53.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router": "^8.4.0",
    "sweetalert2": "^11.26.25",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "@vitejs/plugin-react": "^6.1.1",
    "daisyui": "^5.7.39",
    "eslint": "^10.10.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.6",
    "globals": "^17.12.0",
    "vite": "^8.3.0"
  }
}
```

---

### ขั้นตอนที่ 3.3: สร้างไฟล์ `frontend/.env`
กำหนด URL ของ Backend สำหรับการติดต่อ Fetch API

**ไฟล์: `frontend/.env`**
```env
VITE_API_URL=http://localhost:5000
```

---

### ขั้นตอนที่ 3.4: ปรับแต่ง `frontend/vite.config.js`
เปิดใช้งาน TailwindCSS Plugin พร้อมตั้งค่า Polling เพื่อรองรับ Hot Reload ใน Docker Volume

**ไฟล์: `frontend/vite.config.js`**
```javascript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  optimizeDeps: {
    include: ["react-router"],
    force: true,
  },
});
```

---

### ขั้นตอนที่ 3.5: สร้างไฟล์ `frontend/index.html`

**ไฟล์: `frontend/index.html`**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### ขั้นตอนที่ 3.6: ปรับแต่ง CSS (`index.css` & `App.css`)
เชื่อมต่อ TailwindCSS v4 และ DaisyUI พร้อมธีม dark

**ไฟล์: `frontend/src/index.css`**
```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: dark --default;
}
```

**ไฟล์: `frontend/src/App.css`**
```css
/* Custom CSS หากต้องการตกแต่งเพิ่มเติม */
```

---

### ขั้นตอนที่ 3.7: สร้างไฟล์ Services

#### 1) `frontend/src/services/productService.js`
ฟังก์ชัน Wrapper สำหรับ Fetch ข้อมูลจาก Backend REST API

**ไฟล์: `frontend/src/services/productService.js`**
```javascript
const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "เกิดข้อผิดพลาดในการเชื่อมต่อ");
  }
  return response.json();
};

const getProducts = () => request(API_URL);

const getProduct = (id) => request(`${API_URL}/${id}`);

const createProduct = (product) =>
  request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

const deleteProduct = (id) =>
  request(`${API_URL}/${id}`, {
    method: "DELETE",
  });

export { getProduct, getProducts, createProduct, updateProduct, deleteProduct };
```

#### 2) `frontend/src/services/alertService.js`
โมดูลกล่องข้อความแจ้งเตือนความผิดพลาด สำเร็จ และการยืนยันการลบ

**ไฟล์: `frontend/src/services/alertService.js`**
```javascript
import Swal from "sweetalert2";

const getErrorMessage = (error) => {
  if (typeof error === "string") return error;

  try {
    const response = JSON.parse(error.message);
    return response.error || response.message || error.message;
  } catch {
    return error?.message || "เกิดข้อผิดพลาดในการทำรายการ";
  }
};

const showError = (error) =>
  Swal.fire({
    icon: "error",
    title: "เกิดข้อผิดพลาด",
    text: getErrorMessage(error),
  });

const showSuccess = (title, text) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1600,
    showConfirmButton: false,
  });

const confirmDelete = () =>
  Swal.fire({
    icon: "warning",
    title: "ยืนยันการลบสินค้า",
    text: "คุณต้องการลบรายการสินค้านี้ใช่หรือไม่?",
    showCancelButton: true,
    confirmButtonText: "ลบสินค้า",
    cancelButtonText: "ยกเลิก",
    reverseButtons: true,
  }).then((result) => result.isConfirmed);

export { confirmDelete, showError, showSuccess };
```

---

### ขั้นตอนที่ 3.8: สร้าง Components

#### 1) `frontend/src/components/ProductHeader.jsx`
แถบ Header ส่วนหัวแสดงชื่อระบบ Product Management System

**ไฟล์: `frontend/src/components/ProductHeader.jsx`**
```jsx
import React from "react";
import { Package } from "lucide-react";

const ProductHeader = () => {
  return (
    <header className="hero-panel rounded-box px-5 py-7 text-primary-content shadow-xl sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:item-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white">
              <Package className="size-7" />
            </div>
            <span className="badge badge-outline border-white/40 text-white">
              Product
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Product Management System
          </h1>
          <p className="mt-2 max-w-xl text-sm text-primary-content/75 sm:text-base">
            จัดการสินค้าและราคาได้อย่างรวดเร็วในที่เดียว
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
```

#### 2) `frontend/src/components/PageState.jsx`
แสดงสถานะ Loading Spinner หรือแสดงแถบ Alert เมื่อมีข้อผิดพลาด

**ไฟล์: `frontend/src/components/PageState.jsx`**
```jsx
function PageState({ loading, error }) {
  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-box border border-base-300 bg-base-100 shadow-sm">
        <span className="loading loading-spinner text-info" />
        <span className="sr-only">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>เกิดข้อผิดพลาด : {error}</span>
      </div>
    );
  }

  return null;
}

export default PageState;
```

#### 3) `frontend/src/components/ProductForm.jsx`
ฟอร์มรับข้อมูลสินค้า (ชื่อ, ราคา, รายละเอียด, URL รูปภาพ) รองรับทั้งการสร้างและแก้ไข

**ไฟล์: `frontend/src/components/ProductForm.jsx`**
```jsx
import { Pencil, PlusCircle, X } from "lucide-react";

function ProductForm({
  editingId,
  name,
  price,
  description,
  image,
  isSubmitting,
  onNameChange,
  onPriceChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-5 sm:p-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <PlusCircle className="size-5" />
          </div>
          <div>
            <h2 className="card-title text-xl">
              {editingId ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
            </h2>
            <p className="text-sm text-base-content/60">
              {editingId
                ? "แก้ไขข้อมูลสินค้าในระบบ"
                : "กรอกข้อมูลเพื่อเพิ่มรายการเข้าสู่ระบบ"}
            </p>
          </div>
        </div>
        <form
          className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={onSubmit}
        >
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">ชื่อสินค้า</span>
            <input
              className="input input-bordered w-full"
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="เช่น Gaming keyboard"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">ราคา (บาท)</span>
            <input
              className="input input-bordered w-full"
              type="text"
              value={price}
              onChange={(event) => onPriceChange(event.target.value)}
              placeholder="เช่น 1500"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">รายละเอียด</span>
            <textarea
              className="textarea textarea-bordered w-full"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="รายละเอียดสินค้าเพิ่มเติม"
              rows="3"
            />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">URL รูปภาพ</span>
            <input
              className="input input-bordered w-full"
              type="url"
              value={image}
              onChange={(event) => onImageChange(event.target.value)}
              placeholder="https://example.com/product.jpg"
            />
          </label>
          <div className="flex flex-col gap-2 md:col-span-2 md:flex-row md:justify-end">
            <button
              className="btn btn-primary w-full md:w-auto"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm" />
              ) : editingId ? (
                <Pencil className="size-4" />
              ) : (
                <PlusCircle className="size-4" />
              )}
              {isSubmitting
                ? "กำลังบันทึก..."
                : editingId
                  ? "บันทึกการแก้ไข"
                  : "บันทึกข้อมูล"}
            </button>
            <button
              className="btn btn-ghost w-full md:w-auto"
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="size-4" /> ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
```

#### 4) `frontend/src/components/ProductList.jsx`
แสดงการ์ดรายการสินค้าพร้อมรูปภาพ, ราคาแบบจัด Format และปุ่มแก้ไข/ลบ

**ไฟล์: `frontend/src/components/ProductList.jsx`**
```jsx
import { Package, Pencil, Trash2 } from "lucide-react";
import React from "react";

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length == 0) {
    return (
      <div className="card border border-dashed border-base-300 bg-base-100 shadow-sm">
        <div className="card-body items-center py-14 text-center">
          <Package className="size-12 text-base-content/25" />
          <h2 className="card-tilte mt-2">ยังไม่มีข้อมูลสินค้า</h2>
          <p className="text-sm text-base-content/60">
            เริ่มต้นด้วยการเพิ่มสินค้าใหม่ด้านบน
          </p>
        </div>
      </div>
    );
  }
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">รายการสินค้าทั้งหมด</h2>
          <p className="text-sm text-base-content/60">
            มีสินค้า {products.length} รายการ
          </p>
        </div>
        <span className="badge badge-primary badge-lg">{products.length}</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            className="card overflow-hidden border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
            key={product.id}
          >
            <figure className="aspect-[4/3] bg-base-200">
              {product.image ? (
                <img
                  className="h-full w-full object-cover"
                  src={product.image}
                  alt={product.name}
                />
              ) : (
                <Package className="size-14 text-base-content/25" />
              )}
            </figure>
            <div className="card-body gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-base-content/50">
                    #{product.id}
                  </p>
                  <h3 className="mt-1 truncate text-lg font-bold">
                    {product.name}
                  </h3>
                </div>
                <span className="whitespace-nowrap font-bold text-success">
                  {Number(product.price).toLocaleString()}฿
                </span>
              </div>
              <p className="min-h-10 text-sm text-base-content/70">
                {product.description || "ไม่มีรายละเอียดสินค้า"}
              </p>
              <div className="card-actions justify-end border-t border-base-200 pt-3">
                <button
                  className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                  onClick={() => onEdit(product)}
                  aria-label={`แก้ไขสินค้า ${product.name}`}
                >
                  <Pencil className="size-4" /> แก้ไข
                </button>
                <button
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                  onClick={() => onDelete(product.id)}
                  aria-label={`ลบสินค้า ${product.name}`}
                >
                  <Trash2 className="size-4" /> ลบ
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
```

---

### ขั้นตอนที่ 3.9: สร้าง Pages

#### 1) `frontend/src/pages/ProductFormPage.jsx`
เพจศูนย์กลางจัดการ Form State ทั้งการ Create และ Update

**ไฟล์: `frontend/src/pages/ProductFormPage.jsx`**
```jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import PageState from "../components/PageState.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductHeader from "../components/ProductHeader.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productService.js";

function ProductFormPage({ isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadProduct = async () => {
      try {
        const product = await getProduct(id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description ?? "");
        setImage(product.image ?? "");
      } catch (requestError) {
        setError(requestError.message);
        showError(requestError);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !price) {
      showError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const product = {
        name,
        price: Number(price),
        description: description || null,
        image: image || null,
      };
      if (isEditing) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      await showSuccess(isEditing ? "แก้ไขสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ");
      navigate("/products");
    } catch (requestError) {
      showError(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />
        <PageState loading={loading} error={error} />
        {!loading && !error && (
          <ProductForm
            editingId={isEditing ? id : null}
            name={name}
            price={price}
            description={description}
            image={image}
            isSubmitting={isSubmitting}
            onNameChange={setName}
            onPriceChange={setPrice}
            onDescriptionChange={setDescription}
            onImageChange={setImage}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/products")}
          />
        )}
      </div>
    </main>
  );
}

export default ProductFormPage;
```

#### 2) `frontend/src/pages/AddProductPage.jsx`
เพจเพิ่มสินค้า

**ไฟล์: `frontend/src/pages/AddProductPage.jsx`**
```jsx
import ProductFormPage from "./ProductFormPage";
const AddProductPage = () => {
  return <ProductFormPage />;
};

export default AddProductPage;
```

#### 3) `frontend/src/pages/EditProductPage.jsx`
เพจแก้ไขสินค้า

**ไฟล์: `frontend/src/pages/EditProductPage.jsx`**
```jsx
import React from "react";
import ProductFormPage from "./ProductFormPage";

const EditProductPage = () => {
  return <ProductFormPage isEditing />;
};

export default EditProductPage;
```

#### 4) `frontend/src/pages/ProductPage.jsx`
หน้าหลักแสดงรายการสินค้า (Home / Dashboard)

**ไฟล์: `frontend/src/pages/ProductPage.jsx`**
```jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import { deleteProduct, getProducts } from "../services/productService";
import {
  confirmDelete,
  showError,
  showSuccess,
} from "../services/alertService";
const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadingProducts = async () => {
      setLoading(true);
      setError("");
      try {
        setProducts(await getProducts());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadingProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!(await confirmDelete())) return;
    try {
      await deleteProduct(id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
      showSuccess("ลบสินค้าสำเร็จ");
    } catch (error) {
      showError(error);
    }
  };
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />
        <div className="flex justify-end">
          <Link className="btn btn-primary" to="/product/new">
            เพิ่มสินค้า
          </Link>
        </div>
        {!loading && (
          <ProductList
            products={products}
            onEdit={(product) => navigate(`/product/${product.id}/edit`)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
};

export default ProductPage;
```

---

### ขั้นตอนที่ 3.10: เชื่อมต่อ Routing และ Mount Root

#### 1) `frontend/src/App.jsx`
กำหนด Routes ของแอปพลิเคชัน

**ไฟล์: `frontend/src/App.jsx`**
```jsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AddProductPage from "./pages/AddProductPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/product" replace />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/new" element={<AddProductPage />} />
        <Route path="/product/:id/edit" element={<EditProductPage />} />
        <Route path="*" element={<Navigate to="/product" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```

#### 2) `frontend/src/main.jsx`
Entry point ของ React DOM

**ไฟล์: `frontend/src/main.jsx`**
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## ⚡ 4. วิธีการสั่งรันโปรเจกต์ (Run & Execution)

### วิธีที่ 1: รันด้วย Docker Compose ทั้งระบบ (แนะนำ สะดวกที่สุด)
มั่นใจว่าเปิด Docker Desktop แล้ว จากนั้นรันคำสั่งที่ Root Directory:
```bash
docker compose up --build
```
ระบบจะเปิดใช้งานทั้ง 3 Containers อัตโนมัติ:
* **Frontend**: `http://localhost:5173`
* **Backend API**: `http://localhost:5000`
* **PostgreSQL Database**: Port `5433` (Host)

---

### วิธีที่ 2: รันแบบแยกเครื่อง Local Development

#### 1. สตาร์ท PostgreSQL
ตรวจสอบให้แน่ใจว่า PostgreSQL รันอยู่ที่ Port `5432` หรือ `5433` ตามที่กำหนดใน `.env` และสร้าง Database ชื่อ `product_db`

#### 2. รัน Backend:
```bash
cd backend
npm install
npm run dev
```

#### 3. รัน Frontend:
```bash
cd frontend
npm install
npm run dev
```
เข้าใช้งานผ่านเบราว์เซอร์ที่: `http://localhost:5173`
