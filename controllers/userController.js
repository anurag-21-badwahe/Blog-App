import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import User from "../models/userModel.js";
import { validationResult } from 'express-validator';


// Register a new user
const registerUser = asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password } = req.body;
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ firstName, lastName, email, password: hashedPassword });
  await newUser.save();

  generateToken(res, newUser._id);
  res.status(201).json({
    message: "User successfully created",
    user: {
      _id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    },
  });
});

// Auth user & get token
const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  generateToken(res, user._id);
  res.status(200).json({
    _id: user._id,
    email: user.email,
  });
});

// Logout user / clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).send("User logged out");
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    email: user.email,
  });
});

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile
};
