const SensorData = require("../models/sensorData.model");

async function updateController(req, res) {
  const sensorId = req.params.id;
  const { hydration, temperature, heartRate, gsr, bioimpedance } = req.body;

  try {
    if (!sensorId) {
      return res
        .status(400)
        .json({ success: false, message: "Sensor ID is required." });
    }
    // if (!hydration || !temperature || !heartRate || !gsr || !bioimpedance) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "All fields are required." });
    // }


    if (
  hydration === undefined || hydration === null ||
  temperature === undefined || temperature === null ||
  heartRate === undefined || heartRate === null ||
  gsr === undefined || gsr === null ||
  bioimpedance === undefined || bioimpedance === null
) {
  return res.status(400).json({
    success: false,
    message: "All fields are required."
  });
}
    const updatedSensor = await SensorData.findByIdAndUpdate(
      sensorId,
      { hydration, temperature, heartRate, gsr, bioimpedance },
      { new: true }
    );

    if (!updatedSensor) {
      return res
        .status(404)
        .json({ success: false, message: "Sensor data not found." });
    }
    res.status(200).json({ success: true, data: updatedSensor });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

async function getController(req, res) {
  const sensorId = req.params.id;

  try {
    const sensorData = await SensorData.findById(sensorId);
    if (!sensorData) {
      return res
        .status(404)
        .json({ success: false, message: "Sensor data not found." });
    }
    res.status(200).json({ success: true, data: sensorData });
  } catch (error) {
    console.error("Get error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}

async function createController(req, res) {
  try {
    const { hydration, temperature, heartRate, gsr, bioimpedance } = req.body;

    if (!hydration || !temperature || !heartRate || !gsr || !bioimpedance) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const newSensor = await SensorData.create({
      hydration,
      temperature,
      heartRate,
      gsr,
      bioimpedance,
    });

    newSensor.save;

    res.status(201).send({
      success: true,
      message: "Data created successfully",
      data: newSensor,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  updateController,
  getController,
  createController,
};
