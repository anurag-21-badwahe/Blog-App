import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
const port = process.env.PORT;

connectDB(process.env.MONGO_URI);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`listening on ${port}`));
