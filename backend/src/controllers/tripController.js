import Trip from "../models/tripModel.js";
import Vehicle from "../models/vehicalModel.js";
import Driver from "../models/driverModel.js";

export const createTrip = async (req, res) => {
  try {
    const { vehicle, driver, cargoWeight } = req.body;

    const vehicleDoc = await Vehicle.findById(vehicle);
    if (!vehicleDoc) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    if (cargoWeight > vehicleDoc.maxLoadCapacity) {
      return res.status(400).json({
        message: `Capacity exceeded by ${cargoWeight - vehicleDoc.maxLoadCapacity}kg. Trip creation blocked.`,
      });
    }

    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("vehicle").populate("driver");
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dispatchTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    if (vehicle.status !== "Available") {
      return res.status(400).json({ message: "Vehicle is not available" });
    }

    if (driver.status !== "Available") {
      return res.status(400).json({ message: "Driver is not available" });
    }

    if (driver.licenseExpiryDate < new Date()) {
      return res.status(400).json({ message: "Driver's license has expired" });
    }

    if (trip.cargoWeight > vehicle.maxLoadCapacity) {
      return res.status(400).json({
        message: `Capacity exceeded by ${trip.cargoWeight - vehicle.maxLoadCapacity}kg. Dispatch blocked.`,
      });
    }

    vehicle.status = "On Trip";
    driver.status = "On Trip";
    trip.status = "Dispatched";

    await vehicle.save();
    await driver.save();
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const completeTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const vehicle = await Vehicle.findById(trip.vehicle);
    const driver = await Driver.findById(trip.driver);

    vehicle.status = "Available";
    driver.status = "Available";
    trip.status = "Completed";

    if (req.body.finalOdometer) {
      vehicle.odometer = req.body.finalOdometer;
      trip.finalOdometer = req.body.finalOdometer;
    }

    await vehicle.save();
    await driver.save();
    await trip.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};