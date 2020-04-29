import {ProgramDate} from './ProgramDate';

export class Program {
  id: number;
  name = '';
  locationId: number;
  active: boolean;
  emailRequired: boolean;
  venue = '';
  programDates: ProgramDate[] = [];
}
