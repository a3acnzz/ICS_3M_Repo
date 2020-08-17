import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-corp-hw-sw',
  templateUrl: './corp-hw-sw.component.html',
  styleUrls: ['./corp-hw-sw.component.css']
})
export class CorpHwSwComponent implements OnInit {

  constructor(private router: Router) {
    if (this.router.url === '/corp-hw-sw-erfe-app') {
      this.router.navigate(['/corp-hw-sw-erfe-app/home-page']);
    }
  }

  ngOnInit() {
  }

}
