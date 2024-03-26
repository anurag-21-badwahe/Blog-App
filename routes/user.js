const { Router } = require("express");
const { createHmac, randomBytes } = require("crypto");
const User = require("../models/user")

const router = Router();

router.get("/signin", (req, res) => {
  res.end("kjlhfj");
});

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate salt
    const salt = randomBytes(16).toString("hex");

    // Hash the password
    const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

    // Create a new user object with salt and hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      salt,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});


module.exports = router;
