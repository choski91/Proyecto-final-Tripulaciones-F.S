
const { alertController, alertPhishingController, alertDdosController, alertDosController, alertFuerzaBrutaController,alertAllController } = require('../controllers/alert.controllers');
const express = require("express");
const router = express.Router();

// Obtener alertas
router.get("/", alertAllController.getAllAlerts);
router.get("/login", alertLoginController.getLoginAlert);
router.get("/phishing", alertPhishingController.getAlertPhishing);
router.get("/ddos", alertDdosController.getAlertDdos);
router.get("/dos", alertDosController.getAlertDos);
router.get("/fuerzabruta", alertFuerzaBrutaController.getAlertFuerzaBruta);
router.get("/login", alertController.getAlert);

module.exports = router;