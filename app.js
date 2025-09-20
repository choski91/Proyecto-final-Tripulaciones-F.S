import express from 'express';
import dotenv from 'dotenv';
import enrichmentRoutes from './routes/enrichmentRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api', enrichmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

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
