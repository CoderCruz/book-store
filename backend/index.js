import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const PORT = process.env.PORT || 5555;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  return response.status(234).send("Welcome to MERN tutorial");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
