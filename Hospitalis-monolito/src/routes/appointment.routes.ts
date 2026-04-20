import { Router, Response } from 'express';
import { appointmentService } from '../services/appointment.service';
import { checkJwt, AuthRequest } from '../middlewares/auth.middleware';
import { validateCreateAppointment } from '../middlewares/validate.middleware';
import { AppError } from '../services/appointment.service';

const router = Router();

function handleError(err: unknown, res: Response): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

router.use(checkJwt);

router.post('/', validateCreateAppointment, async (req: AuthRequest, res: Response) => {
  try {
    const result = await appointmentService.create(req.body);
    res.status(201).json(result);
  } catch (err) { handleError(err, res); }
});

router.get('/today', async (_req: AuthRequest, res: Response) => {
  try {
    const result = await appointmentService.findToday();
    res.json(result);
  } catch (err) { handleError(err, res); }
});

router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, patientId, status, date, page, limit } = req.query as Record<string, string>;
    const result = await appointmentService.findAll({
      doctorId, patientId, status, date,
      page:  page  ? parseInt(page,  10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
    res.json(result);
  } catch (err) { handleError(err, res); }
});

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await appointmentService.findOne(req.params.id);
    res.json(result);
  } catch (err) { handleError(err, res); }
});

router.patch('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await appointmentService.update(req.params.id, req.body);
    res.json(result);
  } catch (err) { handleError(err, res); }
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const result = await appointmentService.remove(req.params.id);
    res.json(result);
  } catch (err) { handleError(err, res); }
});

export default router;