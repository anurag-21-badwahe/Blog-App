// import { cookie } from "express-validator";
// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   try {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET);

//     res.cookie("jwt", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
//       sameSite: "strict", // Prevent CSRF attacks
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     });
//     console.log(token);
//     res.cookie("jwt",token);
//     console.log(cookie);
    
    
//     console.log("JWT token generated and set as cookie.");
//   } catch (error) {
//     console.error("Error generating or setting JWT token:", error);
//   }
// };

// export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "none", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    };

    res.cookie("jwt", token, cookieOptions);
    console.log("JWT token generated and set as cookie:", token);
  } catch (error) {
    console.error("Error generating or setting JWT token:", error);
  }
};

export default generateToken;

