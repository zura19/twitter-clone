import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("DB connected succesfully"));

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server is started on port: ${port}`);
});
