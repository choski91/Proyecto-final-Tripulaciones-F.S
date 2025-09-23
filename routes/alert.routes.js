const { alertController, alertPhishingController, alertDdosController, alertDosController, alertFuerzaBrutaController } = require('../controllers/alert.controllers');
const express = require("express");
const router = express.Router();

// Obtener alertas
router.get("/", alertController.getAlert);
router.get("/phishing", alertPhishingController.getAlertPhishing);
router.get("/ddos", alertDdosController.getAlertDdos);
router.get("/dos", alertDosController.getAlertDos);
router.get("/fuerzabruta", alertFuerzaBrutaController.getAlertFuerzaBruta);
router.get("/login", alertController.getAlert);

module.exports = router;