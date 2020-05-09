import { Component, OnInit } from '@angular/core';
import {ShowHeaderService} from '../../service/component/show-header.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(public showHeaderFlagService: ShowHeaderService, private router: Router, private route: ActivatedRoute){
    this.showHeaderFlagService.psHeaderFlagValue = false; //ng if --if true display
    this.showHeaderFlagService.headerFlagValue = false; //hidden --if true will  not display
    this.showHeaderFlagService.corpHeaderFlagValue = true;
  }

  ngOnInit() {
  }

}
