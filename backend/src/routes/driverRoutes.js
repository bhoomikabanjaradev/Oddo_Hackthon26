import express from "express";

import {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driverController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// View Drivers (Admin & Manager)
router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getDrivers);

// View Single Driver
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getDriverById,
);

// Create Driver
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createDriver,
);

// Update Driver
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateDriver,
);

// Delete Driver (Admin Only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDriver);

export default router;
