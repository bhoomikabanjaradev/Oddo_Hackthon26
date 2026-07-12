import express from "express";

import authRoute from "./authRoute.js";
import vehicleRoutes from "./vehicleRoutes.js";
import driverRoutes from "./driverRoutes.js";
import tripRoutes from "./tripRoutes.js";
import maintenanceRoutes from "./maintenanceRoutes.js";
import fuelRoutes from "./fuelRoutes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/vehicles", vehicleRoutes);
router.use("/drivers", driverRoutes);
router.use("/trips", tripRoutes);
router.use("/maintenance", maintenanceRoutes);
router.use("/fuel", fuelRoutes);

export default router;
