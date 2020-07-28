import { Appointment } from './Appointment';

export class TimeSlot {
  id: number;
  startTime = ''; // 24-hour HH:mm:ss format, useful for sorting and comparisons, stored as Time data type in the database
  endTime = ''; // 24-hour HH:mm:ss format, useful for sorting and comparisons, stored as Time data type in the database
  startTimeDisplay = ''; // 12-hour hh:mm A format, useful for displaying to users and including in reports
  endTimeDisplay = ''; // 12-hour hh:mm A format, useful for displaying to users and including in reports
  maxAppointments: number;
  availableAppointments: number;
  appointments: Appointment[];
}