const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  hydration: Number,
  temperature: Number,
  heartRate: Number,
  gsr: Number,
  bioimpedance: Number,

  timestamp: { type: Date, default: Date.now },
});
const SensorData = mongoose.model("sensor", sensorDataSchema);

module.exports = SensorData;
