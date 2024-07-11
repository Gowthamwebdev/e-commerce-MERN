import express from "express";
import { loginUser, myProfile, registerUser, verifyUser } from "../controllers/User.js";
import { authenticateUser } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/login",loginUser);
router.get("/profile",authenticateUser, myProfile);
// send token to verify about the user trying to access the profile
//By decoding it we can able to authenticate the user

export default router;
