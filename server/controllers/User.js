import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACTIVATION_SECRET, JWT_SECRET } from "../config.js";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email verification
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(Math.random() * 100000);

    // Create signed activation token
    const activationToken = jwt.sign(
      { name, email, hashedPassword, otp },
      ACTIVATION_SECRET,
      { expiresIn: "5m" }
    );

    // Send email with OTP (optional)
    // const message = `Please verify your email with the following OTP: ${otp}`;
    // await sendMail(email, 'Welcome to Shopzee', message);

    res.status(200).json({ message: "OTP sent successfully", activationToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify User
export const verifyUser = async (req, res) => {
  try {
    const { otp, activationToken } = req.body;
    const verify = jwt.verify(activationToken, ACTIVATION_SECRET);

    if (!verify) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (verify.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await User.create({
      name: verify.name,
      email: verify.email,
      password: verify.hashedPassword,
    });

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate signed token
    const token = jwt.sign(
      { _id: user.id },
       JWT_SECRET,
        { expiresIn: "15d" });

    // Exclude password field
    const { password: userPassword, ...userDetails } = user.toObject();

    res.status(200).json({
      message: "Welcome " + user.name,
      token,
      userDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User Profile
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
