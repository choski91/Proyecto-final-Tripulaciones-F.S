const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createUser, getUserByEmail } = require("../models/users.models");
const saltRounds = 10;
const pool = require("../config/sqlConfig");       
const queries = require("../utils/queries");       


const register = async (req, res) => {
  try {
    const { nombre, cif, email, password } = req.body;

    // comprobar si ya existe
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(nombre, cif, email, hashedPassword);
    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

async function login(req, res) {
  if (!req.body) return res.status(400).json({ message: "Falta body" });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email y password son obligatorios" });

  let client;
  try {
    client = await pool.connect();

    // Debe existir queries.getUserByEmail = 'SELECT id_cliente, nombre, email, password, cif FROM clientes WHERE email = $1'
    const result = await client.query(queries.getUserByEmail, [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    // Cambia user.password (hash) y user.nombre
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const accessToken = jwt.sign(
      { id: user.id_cliente, name: user.nombre, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id_cliente },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    const isProd = process.env.NODE_ENV === "production";

    // Cookies seguras
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .status(200)
      .json({
        msg: "Login correcto",
        user: { id: user.id_cliente, name: user.nombre, email: user.email },
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
