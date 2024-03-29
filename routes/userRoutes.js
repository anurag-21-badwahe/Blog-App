import express from "express";
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
} from "../controllers/userController.js";
import { check, validationResult } from 'express-validator';

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",
[
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more character'
  ).isLength({ min: 6 }),
],registerUser);

router.post("/auth",
[
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please is required').exists(),
], authUser);
router.post("/logout", logoutUser);
router.get("/profile",protect,getUserProfile)



export default router;
