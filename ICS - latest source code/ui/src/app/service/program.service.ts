import {Injectable} from '@angular/core';
import {HttpService} from './base/http.service';
import {AppConstant} from '../shared/app.constant';

@Injectable()
export class ProgramService {

  constructor(private httpService: HttpService) {
  }

  search(name: String, locationId: number, active: Boolean) {
    const params: any = {};
    if (!!name) {
      params.name = name;
    }
    if (!!locationId) {
      params.locationId = locationId;
    }
    if (!!active) {
      params.active = active;
    }
    return this.httpService.get(AppConstant.programSearch, params);
  }

  programOwnerLocationPrograms(locationId: number) {
    const params: any = {};
    if (!!locationId) {
      params.locationId = locationId;
    }
    return this.httpService.get(AppConstant.programOwnerLocationPrograms, params);
  }

  getProgramDates(programId: number) {
    const params = {programId: programId};
    return this.httpService.get(AppConstant.getProgramDates, params);
  }

  programOwnerGetProgram(locationId: number, programId: number) {
    const params: any = {};
    params.locationId = locationId;
    params.programId = programId;
    return this.httpService.get(AppConstant.programOwnerGetProgram, params);
  }

  programOwnerGetProgramAppointments(locationId: number, programId: number) {
    const params: any = {};
    params.locationId = locationId;
    params.programId = programId;
    return this.httpService.get(AppConstant.programOwnerGetProgramAppointments, params);
  }

  increaseProgramDateMaxAppointments(changeData) {
    return this.httpService.post(AppConstant.increaseProgramDateMaxAppointments, changeData);
  }

  decreaseProgramDateMaxAppointments(changeData) {
    return this.httpService.post(AppConstant.decreaseProgramDateMaxAppointments, changeData);
  }

  cancelProgramDate(data) {
    return this.httpService.post(AppConstant.cancelProgramDate, data);
  }

  save(program) {
    return this.httpService.post(AppConstant.saveProgram, program);
  }

}
