const { alertLoginController, alertPhishingController, alertAllController} = require('../controllers/alert.controllers');
const express = require("express");
const router = express.Router();

// Obtener alertas
router.get("/", alertAllController.getAllAlerts);
router.get("/login", alertLoginController.getLoginAlert);
router.get("/phishing", alertPhishingController.getAlertPhishing);

module.exports = router;