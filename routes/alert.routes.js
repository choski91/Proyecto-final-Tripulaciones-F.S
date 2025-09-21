const { alertController, alertPhishingController} = require('../controllers/alert.controllers');
const express = require("express");
const router = express.Router();

// Obtener alertas
router.get("/", alertController.getAlert);
router.get("/phishing", alertPhishingController.getAlertPhishing);

module.exports = router;