const express = require("express"); // Importamos el paquete express
const path = require("path");
const app = express(); // Inciializar servidor con express

const port = process.env.PORT || 3000;
// const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://proyecto-final-tripulaciones-f-s-bpzh.onrender.com",
  ],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/users.routes');
const alertRoutes = require('./routes/alert.routes');

app.use('/users', userRoutes);
app.use('/alert', alertRoutes);

app.use(express.static(path.join(__dirname, "client", "dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});