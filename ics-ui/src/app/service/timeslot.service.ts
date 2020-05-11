import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class TimeSlotService {

  constructor(private httpService: HttpService) {
  }

  getTimeSlots(programDateId: number) {
    const params = {programDateId: programDateId};
    return this.httpService.get(AppConstant.getTimeSlots, params);
  }

  increaseTimeSlotMaxAppointments(changeData) {
    return this.httpService.post(AppConstant.increaseTimeSlotMaxAppointments, changeData);
  }

  decreaseTimeSlotMaxAppointments(changeData) {
    return this.httpService.post(AppConstant.decreaseTimeSlotMaxAppointments, changeData);
  }

  cancelTimeSlot(data) {
    return this.httpService.post(AppConstant.cancelTimeSlot, data);
  }

  getAppointmentCounts(timeSlotId: number) {
    const params = {timeSlotId: timeSlotId};
    if (!!timeSlotId) {
      params.timeSlotId = timeSlotId;
    }
    return this.httpService.get(AppConstant.getAppointmentCounts, params);
  }

  isTimeSlotFull(timeSlotId: number) {
    const params = {timeSlotId: timeSlotId};
    if (!!timeSlotId) {
      params.timeSlotId = timeSlotId;
    }
    return this.httpService.get(AppConstant.isTimeSlotFull, params);
  }

}
