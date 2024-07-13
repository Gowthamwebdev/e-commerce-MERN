import express from "express";
import { PORT, DB } from "./config.js";
import UserRoutes from "./routes/User.js";
import productRoutes from "./routes/product.js";
import dbConn from "./database/dbConnect.js";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

//Middle Wares
app.use("/uploads",express.static("uploads"));

app.use("/user/", UserRoutes);
app.use("/product/", productRoutes);
mongoose.connect(DB).then(() => {
  console.log("Connected to MongoDB!");
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  dbConn();
  // Connect to MongoDB database
});
