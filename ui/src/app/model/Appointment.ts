export class Appointment {
  id: number;
  locationId: number;
  programId: number;
  programName = '';
  programVenue = '';
  programDateId: number;
  date = '';
  timeSlotId: number;
  startTime = '';
  endTime = '';
  startTimeDisplay = '';
  endTimeDisplay = '';
  firstName = '';
  lastName = '';
  emailAddress = '';
  pin = '';
  createdByFirstName = '';
  createdByLastName = '';
  archived = false;
  pinIsValid = true;
  emailRequired = true;
}
