const { getLoginAlert, getAlertPhishing, getAllAlerts } = require("../models/alert.models");

const alertLoginController = {
  getLoginAlert: async (req, res) => {
    try {
      const alerts = await getLoginAlert();
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

const alertAllController = {
  getAllAlerts: async (req, res) => {
    try {
      const alerts = await getAllAlerts();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = { alertLoginController, alertPhishingController, alertAllController };