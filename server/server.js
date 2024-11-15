import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import causeRoutes from "./routes/causeRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 6000;
app.use("/api/cause", causeRoutes);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
