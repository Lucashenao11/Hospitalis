import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './db';
import appointmentRoutes from './routes/appointment.routes';
import { AppError } from './services/appointment.service';

const app  = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/appointments', appointmentRoutes);

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err: Error) => {
    console.error('Error al conectar DB:', err.message);
    process.exit(1);
  });