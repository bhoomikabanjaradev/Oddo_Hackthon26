import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    vehicleName: {
      type: String,
      required: true,
    },

    vehicleType: {
      type: String,
      required: true,
    },

    maxLoadCapacity: {
      type: Number,
      required: true,
    },

    odometer: {
      type: Number,
      default: 0,
    },

    acquisitionCost: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "In Shop"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Vehicle", vehicleSchema);
