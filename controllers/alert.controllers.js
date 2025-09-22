const { getAlert, getAlertPhishing } = require("../models/alert.models");

const alertController = {
  getAlert: async (req, res) => {
    try {
      const alerts = await getAlert();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

const alertPhishingController = {
  getAlertPhishing: async (req, res) => {
    try {
      const alerts = await getAlertPhishing();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({error: "Internal Server Error"});
    }
  },
};

module.exports = { alertController, alertPhishingController };