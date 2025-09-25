const {
  getLoginAlert,
  getAlertPhishing,
  getAlertDdos,
  getAlertDos,
  getAlertFuerzaBruta,
    getAllAlerts
} = require("../models/alert.models");


const alertLoginController = {
  getLoginAlert: async (req, res) => {
    try {
      const alerts = await getLoginAlert();
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
module.exports = { alertPhishingController, alertDosController, alertDdosController, alertFuerzaBrutaController, alertAllController , alertLoginController};
