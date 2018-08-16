import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';

@Component({
  selector: 'app-tickets-customer',
  templateUrl: './tickets-customer.component.html',
  styleUrls: ['./tickets-customer.component.scss']
})
export class TicketsCustomerComponent implements OnInit {
  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'customer');
  }

  ngOnInit() {}
}
