const mongoose = require('mongoose');

const AppointmentStatus = {
  SCHEDULED:   'scheduled',
  CONFIRMED:   'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED:   'completed',
  CANCELLED:   'cancelled',
  NO_SHOW:     'no_show',
};

const AppointmentType = {
  CHECKUP:      'checkup',
  FOLLOW_UP:    'follow_up',
  CONSULTATION: 'consultation',
  EMERGENCY:    'emergency',
  PROCEDURE:    'procedure',
  LAB:          'lab',
};

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
    date:      { type: Date,   required: true },
    startTime: { type: String, required: true },
    endTime:   { type: String, required: true },
    type:      { type: String, enum: Object.values(AppointmentType),   default: AppointmentType.CHECKUP },
    status:    { type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.SCHEDULED },
    reason:    { type: String, required: true },
    notes:     { type: String, default: '' },
    room:      { type: String, default: '' },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment, AppointmentStatus, AppointmentType };