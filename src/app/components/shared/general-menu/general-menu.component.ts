import { Component, ViewChild } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ControllerMenuService } from './controller-menu.service';
import { Router, NavigationExtras } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { CustomerService } from '../../../services/customer.service';
import { ConsultantService } from '../../../services/consultant.service';

@Component({
  selector: 'app-general-menu',
  templateUrl: './general-menu.component.html',
  styleUrls: ['./general-menu.component.css']
})
export class GeneralMenuComponent {
  @ViewChild('drawer')
  drawer;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  isHide;
  openMenu: boolean;
  isHideExit: boolean;
  menuSelect = '';
  typeUser = '';
  name;
  avatar = '../../../../assets/user-logo.png';
  email;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public controllerMenu: ControllerMenuService,
    private router: Router,
    private sessionService: SessionService,
    private customerService: CustomerService,
    private consultantService: ConsultantService
  ) {
    this.controllerMenu.menuSettings$.subscribe(data => {
      this.isHide = data.hideMenu;
      this.isHideExit = data.hideExit;
      this.menuSelect = data.selectSection;
      this.typeUser = data.typeUser;
      if (data.typeUser !== 'company') {
        this.getInfoUser();
      }
      this.isHandset$.subscribe(isHan => {
        if (isHan || this.isHide) {
          this.openMenu = false;
        } else {
          this.openMenu = true;
        }
      });
    });
  }
  logout() {
    localStorage.removeItem('userSession');
    this.sessionService.setSession(undefined, undefined, undefined);
    this.router.navigate(['login']);
  }
  close() {
    this.isHandset$.subscribe(han => {
      if (han) {
        this.drawer.close();
      }
    });
  }
  getInfoUser() {
    this.sessionService.userSession.subscribe(user => {
      if (user.type === 'customer' && user.companyId) {
        this.customerService
          .getCustomersById(user.userId)
          .subscribe(customer => {
            if (customer.logo) {
              this.avatar = customer.logo;
            }
            this.name = customer.name;
            this.email = customer.email;
          });
      } else if (user.type === 'consultant' && user.companyId) {
        this.consultantService
          .getConsultantById(user.userId)
          .subscribe(consultant => {
            this.name = consultant.name;
          });
      }
    });
  }
}
