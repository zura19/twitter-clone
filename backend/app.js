import express from "express";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
// import cookieParser from "cookie-parser";
import postRouter from "./routes/postRoutes.js";

const app = express();
app.use(express.json());
// app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;
