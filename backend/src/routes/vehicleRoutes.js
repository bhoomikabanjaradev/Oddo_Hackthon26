import express from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Get all vehicles
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getVehicles,
);

// Get vehicle by ID
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getVehicleById,
);

// Create vehicle
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createVehicle,
);

// Update vehicle
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  updateVehicle,
);

// Delete vehicle (Admin only)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteVehicle);

export default router;
