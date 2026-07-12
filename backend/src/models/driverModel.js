import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    licenseExpiryDate: {
      type: Date,
      required: true,
    },

    contactNumber: {
      type: String,
    },

    safetyScore: {
      type: Number,
      default: 100,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "Suspended"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Driver", driverSchema);
