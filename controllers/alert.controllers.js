const {
  getAlert,
  getAlertPhishing,
  getAlertDdos,
  getAlertDos,
  getAlertFuerzaBruta,
} = require("../models/alert.models");

const alertController = {
  getAlert: async (req, res) => {
    try {
      const alerts = await getAlert();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const alertDdosController = {
  getAlertDdos: async (req, res) => {
    try {
      const alerts = await getAlertDdos();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const alertDosController = {
  getAlertDos: async (req, res) => {
    try {
      const alerts = await getAlertDos();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const alertFuerzaBrutaController = {
  getAlertFuerzaBruta: async (req, res) => {
    try {
      const alerts = await getAlertFuerzaBruta();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const alertPhishingController = {
  getAlertPhishing: async (req, res) => {
    try {
      const alerts = await getAlertPhishing();
      res.status(200).json(alerts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = { alertController, alertPhishingController, alertDosController, alertDdosController, alertFuerzaBrutaController };