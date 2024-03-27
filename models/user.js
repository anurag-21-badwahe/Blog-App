const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// We are using this middleware to hash the password before saving data to the database.
userSchema.pre("save", async function (next) {
  const user = await this.findOne({email});
  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString("hex"); 
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
  next();
});

userSchema.static("matchPassword", function (email, password) {
  const user = this.findOne({ email });
  if (!user) throw new Error("User Not Found");

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHash)
    throw new Error("Invalid Credential");

  return { ...user, password: undefined, salt: undefined };
  //  return hashedPassword === userProvidedHash;
});

const User = model("user", userSchema);

module.exports = User;
