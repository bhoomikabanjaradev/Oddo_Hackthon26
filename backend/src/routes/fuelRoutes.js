import express from "express";
import { createFuelLog, getFuelLogs } from "../controllers/fuelLogController.js";

const router = express.Router();

router.post("/", createFuelLog);
router.get("/", getFuelLogs);

export default router;