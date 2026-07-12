import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();

dotenv.config();
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

export default app;
