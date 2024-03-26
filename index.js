const express = require("express");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const connectDB = require("./db")
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.end("Hello, World");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Example app listening at http://localhost:${PORT}`);
});
