import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passInput: string;

  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService
  ) {}

  ngOnInit() {
    this.controllerMenu.menuSettings(true, true, '', '');
  }
  login() {
    this.router.navigate(['tickets-adm']);
  }
}
