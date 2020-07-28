import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../../service/user.service';
import {MatDialogRef} from '@angular/material';
import {AppConstant} from '../../../shared/app.constant';
import {SignUpUserService} from '../../../service/sign-up-user.service';

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.css'],
  providers: [UserService, SignUpUserService]
})
export class UserSearchDialogComponent implements OnInit {

  lastName: String;
  firstName: String;
  userPin: String;
  userList: any[];
  busyLoading: Subscription;
  rowsPerPage = AppConstant.rowsPerPageDefault;
  rowsPerPageOptions = AppConstant.rowsPerPageOptions;

  constructor(public dialogRef: MatDialogRef<UserSearchDialogComponent>,
              private userService: UserService,
              private signUpUserService: SignUpUserService) {
  }

  ngOnInit() {
  }

  search() {
    this.busyLoading = this.signUpUserService.search(this.firstName, this.lastName, this.userPin).subscribe((result: any) => {
      this.userList = result;
    });
  }

  selectUser(user: any) {
    this.dialogRef.close(user);
  }

  clearSearch() {
    this.lastName = '';
    this.firstName = '';
    this.userPin = '';
    this.userList = [];
  }
}
