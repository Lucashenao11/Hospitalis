const repo = require('../repositories/appointment.repository');

async function create(data) {
  return repo.createAppointment(data);
}

async function findAll(query) {
  return repo.findAllAppointments(query);
}

async function findOne(id) {
  const appointment = await repo.findAppointmentById(id);
  if (!appointment) {
    const err = new Error('Cita no encontrada');
    err.statusCode = 404;
    throw err;
  }
  return appointment;
}

async function update(id, data) {
  const appointment = await repo.updateAppointment(id, data);
  if (!appointment) {
    const err = new Error('Cita no encontrada');
    err.statusCode = 404;
    throw err;
  }
  return appointment;
}

async function remove(id) {
  const appointment = await repo.deleteAppointment(id);
  if (!appointment) {
    const err = new Error('Cita no encontrada');
    err.statusCode = 404;
    throw err;
  }
  return { message: 'Cita eliminada exitosamente' };
}

async function findToday() {
  return repo.findTodayAppointments();
}

module.exports = { create, findAll, findOne, update, remove, findToday };