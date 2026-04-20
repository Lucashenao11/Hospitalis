import { Request, Response, NextFunction } from 'express';

function isMongoId(value: unknown): boolean {
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value);
}

function isTimeFormat(value: unknown): boolean {
  return typeof value === 'string' && /^([0-1]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function validateCreateAppointment(req: Request, res: Response, next: NextFunction): void {
  const { patientId, doctorId, date, startTime, endTime, reason } = req.body as Record<string, unknown>;
  const errors: string[] = [];

  if (!isMongoId(patientId)) errors.push('patientId debe ser un MongoId válido');
  if (!isMongoId(doctorId))  errors.push('doctorId debe ser un MongoId válido');
  if (!date || isNaN(Date.parse(date as string))) errors.push('date debe ser una fecha válida');
  if (!isTimeFormat(startTime)) errors.push('startTime debe ser HH:MM');
  if (!isTimeFormat(endTime))   errors.push('endTime debe ser HH:MM');
  if (!reason || typeof reason !== 'string') errors.push('reason es requerido');

  if (errors.length > 0) {
    res.status(400).json({ message: 'Datos inválidos', errors });
    return;
  }
  next();
}