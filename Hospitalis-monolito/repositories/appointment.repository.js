const { Appointment } = require('../models/appointment.model');

async function createAppointment(data) {
  const appointment = new Appointment(data);
  return appointment.save();
}

async function findAllAppointments({ doctorId, patientId, status, date, page = 1, limit = 10 } = {}) {
  const skip   = (page - 1) * limit;
  const filter = {};

  if (doctorId)  filter.doctorId  = doctorId;
  if (patientId) filter.patientId = patientId;
  if (status)    filter.status    = status;
  if (date) {
    const start = new Date(date);
    const end   = new Date(date);
    end.setDate(end.getDate() + 1);
    filter.date = { $gte: start, $lt: end };
  }

  const [data, total] = await Promise.all([
    Appointment.find(filter)
      .populate('patientId', 'firstName lastName email phone')
      .populate('doctorId',  'fullname email specialty')
      .skip(skip).limit(limit).sort({ date: 1, startTime: 1 }),
    Appointment.countDocuments(filter),
  ]);

  return { data, total, page, limit };
}

async function findAppointmentById(id) {
  return Appointment.findById(id)
    .populate('patientId', 'firstName lastName email phone dateOfBirth gender')
    .populate('doctorId',  'fullname email specialty');
}

async function updateAppointment(id, data) {
  return Appointment.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
    .populate('patientId', 'firstName lastName')
    .populate('doctorId',  'fullname specialty');
}

async function deleteAppointment(id) {
  return Appointment.findByIdAndDelete(id);
}

async function findTodayAppointments() {
  const now  = new Date();
  const yyyy = now.getUTCFullYear();
  const mm   = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd   = String(now.getUTCDate()).padStart(2, '0');
  const today = `${yyyy}-${mm}-${dd}`;

  return Appointment.find({
    date: { $gte: new Date(`${today}T00:00:00.000Z`), $lte: new Date(`${today}T23:59:59.999Z`) },
  })
    .populate('patientId', 'firstName lastName')
    .populate('doctorId',  'fullname specialty')
    .sort({ startTime: 1 });
}

module.exports = {
  createAppointment,
  findAllAppointments,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
  findTodayAppointments,
};