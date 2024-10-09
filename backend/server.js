import path from "path";
import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const __dirname = path.resolve();

console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html"),
      (err) => {
        if (err) {
          res.status(err.status).send(err.message);
        }
      }
    );
  });
}

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("DB connected succesfully"));

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server is started on port: ${port}`);
});
