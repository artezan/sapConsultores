import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { CompanyService } from '../../../services/company.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passInput: string;
  typeOfUser = 'company';
  isFind = true;

  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService,
    private companyService: CompanyService,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.controllerMenu.menuSettings(true, true, '', '');
  }
  login() {
    if (this.typeOfUser === 'company') {
      this.companyService
        .getCompanySession(this.emailInput, this.passInput)
        .subscribe(company => {
          if (company.length > 0) {
            this.router.navigate(['tickets-adm']);
            this.sessionService.setIdSession(company[0]._id);
            this.sessionService.setUserType(this.typeOfUser);
          } else {
            this.isFind = false;
          }
        });
    }
    if (this.typeOfUser === 'customer') {
      this.router.navigate(['tickets-customer']);
    }
    if (this.typeOfUser === 'consultant') {
      this.router.navigate(['tickets-consultant']);
    }
  }
}
