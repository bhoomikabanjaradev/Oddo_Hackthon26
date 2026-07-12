import express from "express";

import authRoute from "./authRoute.js";
import driverRoutes from "./driverRoutes.js";
import vehicleRoutes from "./vehicleRoutes.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/drivers", driverRoutes);
router.use("/vehicles", vehicleRoutes);

export default router;
