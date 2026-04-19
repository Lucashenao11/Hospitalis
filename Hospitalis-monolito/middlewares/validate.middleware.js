function isMongoId(value) {
  return /^[a-f\d]{24}$/i.test(value);
}

function isTimeFormat(value) {
  return /^([0-1]\d|2[0-3]):[0-5]\d$/.test(value);
}

function validateCreateAppointment(req, res, next) {
  const { patientId, doctorId, date, startTime, endTime, reason } = req.body;
  const errors = [];

  if (!isMongoId(patientId)) errors.push('patientId debe ser un MongoId válido');
  if (!isMongoId(doctorId))  errors.push('doctorId debe ser un MongoId válido');
  if (!date || isNaN(Date.parse(date))) errors.push('date debe ser una fecha válida');
  if (!isTimeFormat(startTime)) errors.push('startTime debe ser HH:MM');
  if (!isTimeFormat(endTime))   errors.push('endTime debe ser HH:MM');
  if (!reason || typeof reason !== 'string') errors.push('reason es requerido');

   if (errors.length > 0) {
    return res.status(400).json({ message: 'Datos inválidos', errors });
  }
  next();
}

module.exports = { validateCreateAppointment };