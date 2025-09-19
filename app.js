const express = require("express"); // Importamos el paquete express
const app = express(); // Inciializar servidor con express
const port = 3000; // Puerto a usar por el servidor
const morgan = require('morgan');
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/users.routes');

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});