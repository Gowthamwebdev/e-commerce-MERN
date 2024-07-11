import { DB } from "../config.js";
import mongoose from "mongoose";
const dbConn = () => {
  try {
    mongoose.connect(DB);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export default dbConn;
