import { AppointmentModel, AppointmentDocument, CreateAppointmentDto, UpdateAppointmentDto } from '../models/appointment.model';

export interface IAppointmentRepository {
  create(data: CreateAppointmentDto): Promise<AppointmentDocument>;
  findAll(query: FindAllQuery): Promise<PaginatedResult>;
  findById(id: string): Promise<AppointmentDocument | null>;
  update(id: string, data: UpdateAppointmentDto): Promise<AppointmentDocument | null>;
  delete(id: string): Promise<AppointmentDocument | null>;
  findToday(): Promise<AppointmentDocument[]>;
}

export interface FindAllQuery {
  doctorId?:  string;
  patientId?: string;
  status?:    string;
  date?:      string;
  page?:      number;
  limit?:     number;
}

export interface PaginatedResult {
  data:  AppointmentDocument[];
  total: number;
  page:  number;
  limit: number;
}

export const appointmentRepository: IAppointmentRepository = {

  async create(data) {
    const appointment = new AppointmentModel(data);
    return appointment.save();
  },

  async findAll({ doctorId, patientId, status, date, page = 1, limit = 10 }) {
    const skip   = (page - 1) * limit;
    const filter: Record<string, unknown> = {};

    if (doctorId)  filter.doctorId  = doctorId;
    if (patientId) filter.patientId = patientId;
    if (status)    filter.status    = status;
    if (date) {
      const start = new Date(date);
      const end   = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.date = { $gte: start, $lt: end };
    }

    const [data2, total] = await Promise.all([
      AppointmentModel.find(filter)
        .populate('patientId', 'firstName lastName email phone')
        .populate('doctorId',  'fullname email specialty')
        .skip(skip).limit(limit).sort({ date: 1, startTime: 1 }),
      AppointmentModel.countDocuments(filter),
    ]);

    return { data: data2, total, page, limit };
  },

  async findById(id) {
    return AppointmentModel.findById(id)
      .populate('patientId', 'firstName lastName email phone dateOfBirth gender')
      .populate('doctorId',  'fullname email specialty');
  },

  async update(id, data) {
    return AppointmentModel.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .populate('patientId', 'firstName lastName')
      .populate('doctorId',  'fullname specialty');
  },

  async delete(id) {
    return AppointmentModel.findByIdAndDelete(id);
  },

  async findToday() {
    const now   = new Date();
    const yyyy  = now.getUTCFullYear();
    const mm    = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd    = String(now.getUTCDate()).padStart(2, '0');
    const today = `${yyyy}-${mm}-${dd}`;

    return AppointmentModel.find({
      date: {
        $gte: new Date(`${today}T00:00:00.000Z`),
        $lte: new Date(`${today}T23:59:59.999Z`),
      },
    })
      .populate('patientId', 'firstName lastName')
      .populate('doctorId',  'fullname specialty')
      .sort({ startTime: 1 });
  },
};