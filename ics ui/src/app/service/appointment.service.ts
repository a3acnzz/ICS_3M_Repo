import { Injectable } from '@angular/core';
import { HttpService } from './base/http.service';
import { AppConstant } from '../shared/app.constant';
import { Appointment } from '../model/Appointment';

@Injectable()
export class AppointmentService {

  constructor(private httpService: HttpService) { }

  save(appointments: Appointment[]) {
    return this.httpService.post(AppConstant.saveAppointments, appointments);
  }

  managePendingAppointment(timeSlotData) {
    return this.httpService.post(AppConstant.managePendingAppointment, timeSlotData);
  }

  getPendingAppointments(programId: number) {
    const params = { programId: programId };
    return this.httpService.get(AppConstant.getPendingAppointments, params);
  }

  clearPendingAppointment(data) {
    return this.httpService.post(AppConstant.clearPendingAppointment, data);
  }

  getUserAppointments() {
    return this.httpService.get(AppConstant.getUserAppointments);
  }

  cancelAppointment(data) {
    return this.httpService.post(AppConstant.cancelAppointment, data);
  }

  rescheduleAppointment(data) {
    return this.httpService.post(AppConstant.rescheduleAppointment, data);
  }

  getAppointment(id: number) {
    const params = { id: id };
    return this.httpService.get(AppConstant.getAppointment, params);
  }

  validateAppointments(appointments: Appointment[]) {
    return this.httpService.post(AppConstant.validateAppointments, appointments);
  }

  validateTimeSlots(appointments: Appointment[]) {
    return this.httpService.post(AppConstant.validateTimeSlots, appointments);
  }

  alreadySavedAppointmentsCount(programId: number, firstName: string, lastName: string) {
    const params = { programId: programId, firstName: firstName, lastName: lastName };
    return this.httpService.get(AppConstant.alreadySavedAppointments, params);
  }

}
