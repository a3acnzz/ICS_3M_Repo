import { TimeSlot } from './TimeSlot';

export class ProgramDate {
  id: number;
  date = '';
  displayDate = '';
  totalAvailableAppointments?: number;
  timeSlots: TimeSlot[] = [];
}
