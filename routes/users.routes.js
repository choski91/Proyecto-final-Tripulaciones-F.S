const express = require("express");
const router = express.Router();
const { register, login} = require('../controllers/users.controllers');
//const auth = require("../middlewares/auth.middleware");


// Registrar usuario
router.post("/register", register);

// Iniciar sesión
router.post("/login", login);


module.exports = router;