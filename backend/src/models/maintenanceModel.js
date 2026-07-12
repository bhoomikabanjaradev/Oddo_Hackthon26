import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    cost: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Maintenance", maintenanceSchema);
