require('dotenv').config();
const express              = require('express');
const { connectDB }        = require('./db');
const appointmentRoutes    = require('./routes/appointment.routes');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/appointments', appointmentRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ message: err.message || 'Error interno' });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error('Error al conectar DB:', err);
    process.exit(1);
  });