import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { CompanyService } from '../../../services/company.service';
import { SessionService, UserInfo } from '../../../services/session.service';
import { ConsultantService } from '../../../services/consultant.service';
import { CustomerService } from '../../../services/customer.service';

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
    private sessionService: SessionService,
    private consultantService: ConsultantService,
    private customerService: CustomerService
  ) {
    localStorage.removeItem('userSession');
  }

  ngOnInit() {
    this.controllerMenu.menuSettings(true, true, '', '');
  }
  login() {
    const currentData: UserInfo = {
      type: this.typeOfUser,
      name: this.emailInput,
      password: this.passInput
    };
    localStorage.setItem('userSession', JSON.stringify(currentData));
    // admin
    if (this.typeOfUser === 'company') {
      this.companyService
        .getCompanySession(this.emailInput, this.passInput)
        .subscribe(company => {
          if (company.length > 0) {
            this.router.navigate(['tickets-adm']);
            this.sessionService.setSession(
              company[0]._id,
              company[0]._id,
              this.typeOfUser
            );
            this.sessionService.setUserType(this.typeOfUser);
          } else {
            this.isFind = false;
          }
        });
    }
    // clientes
    if (this.typeOfUser === 'customer') {
      this.customerService
        .getCustomerSession(this.emailInput, this.passInput)
        .subscribe(customer => {
          if (customer.length > 0) {
            this.router.navigate(['tickets-customer']);
            this.sessionService.setSession(
              customer[0]._id,
              customer[0].companyId,
              this.typeOfUser
            );
            this.sessionService.setUserType(this.typeOfUser);
            /* this.sessionService.userInfo.next({
              _id: customer[0]._id,
              name: customer[0].name,
              email: customer[0].email,
              hours: customer[0].totalHours
            }); */
          } else {
            this.isFind = false;
          }
        });
    }
    // consiltores
    if (this.typeOfUser === 'consultant') {
      this.consultantService
        .getConsultantSession(this.emailInput, this.passInput)
        .subscribe(consultant => {
          if (consultant.length > 0) {
            this.router.navigate(['tickets-consultant']);
            this.sessionService.setSession(
              consultant[0]._id,
              consultant[0].companyId,
              this.typeOfUser
            );
            this.sessionService.setUserType(this.typeOfUser);
            /*  this.sessionService.userInfo.next({
              _id: consultant[0]._id,
              name: consultant[0].name,
              lastName: consultant[0].lastName,
              ranking: consultant[0].rankingAverage
            }); */
          } else {
            this.isFind = false;
          }
        });
    }
  }
}
