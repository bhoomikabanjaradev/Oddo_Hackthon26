import express from "express";
import {
  createTrip,
  getTrips,
  dispatchTrip,
  completeTrip,
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/", createTrip);
router.get("/", getTrips);
router.patch("/:id/dispatch", dispatchTrip);
router.patch("/:id/complete", completeTrip);

export default router;