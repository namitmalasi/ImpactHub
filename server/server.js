import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
