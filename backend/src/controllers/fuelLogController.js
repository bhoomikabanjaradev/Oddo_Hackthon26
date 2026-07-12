import FuelLog from "../models/fulelogModel.js";

export const createFuelLog = async (req, res) => {
  try {
    const fuelLog = await FuelLog.create(req.body);
    res.status(201).json(fuelLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFuelLogs = async (req, res) => {
  try {
    const logs = await FuelLog.find().populate("vehicle");
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};