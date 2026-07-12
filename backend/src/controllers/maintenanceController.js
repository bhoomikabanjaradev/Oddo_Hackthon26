import Maintenance from "../models/maintenanceModel.js";
import Vehicle from "../models/vehicalModel.js";

export const createMaintenance = async (req, res) => {
  try {
    const { vehicle } = req.body;

    const vehicleDoc = await Vehicle.findById(vehicle);
    if (!vehicleDoc) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const maintenance = await Maintenance.create(req.body);

    vehicleDoc.status = "In Shop";
    await vehicleDoc.save();

    res.status(201).json(maintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMaintenance = async (req, res) => {
  try {
    const records = await Maintenance.find().populate("vehicle");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const closeMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    maintenance.status = "Closed";
    await maintenance.save();

    const vehicle = await Vehicle.findById(maintenance.vehicle);
    vehicle.status = "Available";
    await vehicle.save();

    res.status(200).json(maintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};