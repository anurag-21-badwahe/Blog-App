const { createHmac, randomBytes } = require("crypto");
const User = require("../models/user")

const handleSignupRoute = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body || {};

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate salt
    const salt = randomBytes(16).toString("hex");

    // Hash the password
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    // Create a new user object with salt and hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      salt,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const handleSigninRoute = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    // Assuming you have an asynchronous operation like querying a database for user credentials
    const user = await User.findOne({ email: email });

    // Assuming you have some logic to check if the user credentials are valid
    // if (!user || !isValidPassword(user, password)) {
    //   return res.status(401).json({ error: "Invalid email or password" });
    // }

    // If the user credentials are valid, you can send a success response
    res.status(200).json({ success: true, message: "Sign-in successful" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

  


module.exports = { handleSignupRoute,handleSigninRoute };
