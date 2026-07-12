import express from "express";

import {
  createTrip,
  getTrips,
  dispatchTrip,
  completeTrip,
} from "../controllers/tripController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  createTrip,
);

router.get("/", authMiddleware, roleMiddleware("admin", "manager"), getTrips);

router.patch(
  "/:id/dispatch",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  dispatchTrip,
);

router.patch(
  "/:id/complete",
  authMiddleware,
  roleMiddleware("admin", "manager"),
  completeTrip,
);

export default router;
