const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
  hydration: String,
  temperature: String,
  heartRate: String,
  gsr: String,
  bioimpedance: String,

  timestamp: { type: Date, default: Date.now },
});
const SensorData = mongoose.model("sensor", sensorDataSchema);

module.exports = SensorData;
