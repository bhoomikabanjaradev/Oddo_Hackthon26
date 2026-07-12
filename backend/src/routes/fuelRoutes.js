import express from "express";

import {
  createFuelLog,
  getFuelLogs,
} from "../controllers/fuelLogController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createFuelLog,
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getFuelLogs,
);

export default router;
