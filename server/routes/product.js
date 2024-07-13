import express from 'express';
import {authenticateUser} from "../middleware/isAuth.js";
import {uploadFiles } from "../middleware/multer.js";
import { createProduct } from '../controllers/product.js';

const router = express.Router();
router.post("/new", authenticateUser, uploadFiles, createProduct);

export default router;