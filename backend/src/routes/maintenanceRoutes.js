import express from "express";
import {
  createMaintenance,
  getMaintenance,
  closeMaintenance,
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", createMaintenance);
router.get("/", getMaintenance);
router.patch("/:id/close", closeMaintenance);

export default router;