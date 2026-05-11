export enum AppointmentStatus {
  SCHEDULED   = 'scheduled',
  CONFIRMED   = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED   = 'completed',
  CANCELLED   = 'cancelled',
  NO_SHOW     = 'no_show',
}

export enum AppointmentType {
  CHECKUP      = 'checkup',
  FOLLOW_UP    = 'follow_up',
  CONSULTATION = 'consultation',
  EMERGENCY    = 'emergency',
  PROCEDURE    = 'procedure',
  LAB          = 'lab',
}
