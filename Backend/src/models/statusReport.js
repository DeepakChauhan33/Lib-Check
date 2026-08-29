const mongoose = require("mongoose");

const statusReportSchema = new mongoose.Schema(
  {
    
    wifi: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    water: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    ac: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    electricity: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    rain: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }

);

const StatusReport = mongoose.model("StatusReport", statusReportSchema);

module.exports = StatusReport;