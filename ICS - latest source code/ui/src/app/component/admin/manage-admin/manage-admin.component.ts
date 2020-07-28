import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../../model/User';
import {AdminService} from '../../../service/admin.service';
import {DialogService} from '../../../service/dialog.service';
import * as _ from 'lodash/lodash.min';
import {AppConstant} from '../../../shared/app.constant';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css'],
  providers: [AdminService, DialogService]
})
export class ManageAdminComponent implements OnInit {

  alerts = [];
  adminUserList: User[];
  busyLoading: Subscription;
  busySave: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(private adminService: AdminService,
              private dialogService: DialogService) {}

  ngOnInit() {
    this.busyLoading = this.adminService.getAdminUserList().subscribe((result: User[]) => {
      this.adminUserList = result;
    });
  };

  addAdminUser() {
    this.dialogService.searchUser().subscribe((adminUser: User) => {
      if (adminUser) {
        if (_.findIndex(this.adminUserList, adminUser) < 0) {
          this.adminUserList.push(adminUser);
        }
      }
    });
  }

  removeAdminUser(adminUser: User) {
    _.remove(this.adminUserList, adminUser);
  }

  save({value, valid}: { value: any, valid: boolean }) {
    this.alerts = [];
    if (valid) {
      this.busySave = this.adminService.saveAdminUserList(this.adminUserList).subscribe((result: User[]) => {
          this.alerts.push({msg: 'Changes saved.', type: 'success', closable: true});
        },
        (error: any) => {
          this.alerts.push({msg: 'Save failed.', type: 'danger', closable: true});
        }
      );
    }
  }
}
