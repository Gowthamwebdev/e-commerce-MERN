import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ACTIVATION_SECRET, JWT_SECRET } from "../config.js";
import { response } from "express";
// import sendMail from '../middleware/sendMail.js'; // Uncomment if you have this function

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Use 'email' instead of 'mail'
    console.log(req.body);

    // Email verification
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Convert password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = Math.floor(Math.random() * 100000);
    console.log(otp);

    // Create signed activation token
    const activationToken = jwt.sign(
      { name, email, hashedPassword, otp },
      ACTIVATION_SECRET,
      {
        expiresIn: "5m",
      }
    );

    // Send email with OTP
    // const message = `Please verify your mail with the following OTP: ${otp}`;
    // await sendMail(email, 'Welcome to Shopzee', message);

    return res.status(200).json({ message: "OTP sent successfully", activationToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }

    // Generate signed Token...
    const token = jwt.sign(
      { _id: user.id },
      JWT_SECRET,
      { expiresIn: "15d" }
    );

    //Exclude password field
    const{password:userPassword, ...userDetails} = user.toObject();

    return res.status(200).json({message:"Welcome "+user.name,
      token,
      userDetails
    })


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// user profile

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};