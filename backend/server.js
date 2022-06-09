import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // allows json data in the body
app.get("/", (req, res) => {
  res.send("API is running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server listening on port ${PORT}`));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders/:id", orderRoutes);
app.use("/api/orders/myorders", orderRoutes);
