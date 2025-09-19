const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createUser } = require("../models/users.models");
const saltRounds = 10;
const pool = require("../config/sqlConfig");       
const queries = require("../utils/queries");       

async function register(req, res) {
  if (!req.body) {
    return res.status(400).json({ error: "No se recibió body en la petición" });
  }

  const { name, email, password } = req.body;

  try {
    // Hashear la contraseña aquí en el servidor
    const hashed_password = await bcrypt.hash(password, saltRounds);

    // Guardar el usuario en la base de datos
    const newUser = await createUser(name, email, hashed_password);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { name, email }, // 👈 No devuelvas la contraseña
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    if (error.code === "23505") {
      return res.status(409).json({ message: "El email ya está en uso" });
    }
    res.status(500).send("Error en el registro");
  }
}

async function login(req, res) {
  if (!req.body) return res.status(400).json({ message: "Falta body" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email y password son obligatorios" });

  let client;
  try {
    client = await pool.connect();

    // Debe existir queries.getUserByEmail = 'SELECT id,name,email,hashed_password FROM users WHERE email=$1 LIMIT 1'
    const result = await client.query(queries.getUserByEmail, [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const ok = await bcrypt.compare(password, user.hashed_password); // 👈 usa hashed_password
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    // Cookies seguras
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,                         // 👈 protege frente a XSS
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 60 * 60 * 1000,                // 1h
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,       // 7 días
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .status(200)
      .json({
        msg: "Login correcto",
        user: { id: user.id, name: user.name, email: user.email },
        token: accessToken,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error en el inicio de sesión" });
  } finally {
    if (client) client.release();
  }
}


module.exports = { register, login };
