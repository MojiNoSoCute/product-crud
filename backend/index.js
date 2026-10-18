import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import productRouter from "./router/productRouter.js";
dotenv.config();
const PORT = process.env.PORT || process.env.BACKEND_PORT || 5000;
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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on: http://0.0.0.0:${PORT}`);
});
