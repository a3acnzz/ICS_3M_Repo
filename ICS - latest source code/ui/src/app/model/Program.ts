import { ProgramDate } from './ProgramDate';

export class Program {
  id: number;
  name = '';
  locationId: number;
  active: boolean;
  emailRequired: boolean;
  recursiveApp:boolean;
  venue = '';
  programDates: ProgramDate[] = [];

  minAppointmentsPerUser: number;
  maxAppointmentsPerUser: number;
}
