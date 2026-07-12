import express from "express";

import {
  createMaintenance,
  getMaintenance,
  closeMaintenance,
} from "../controllers/maintenanceController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createMaintenance,
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  getMaintenance,
);

router.patch(
  "/:id/close",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  closeMaintenance,
);

export default router;
