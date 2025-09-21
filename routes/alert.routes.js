const { alertController} = require('../controllers/alert.controllers');
const express = require("express");
const router = express.Router();

// Obtener alertas
router.get("/", alertController.getAlert);

module.exports = router;