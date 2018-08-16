import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';

@Component({
  selector: 'app-tickets-consultant',
  templateUrl: './tickets-consultant.component.html',
  styleUrls: ['./tickets-consultant.component.scss']
})
export class TicketsConsultantComponent implements OnInit {
  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'consultant');
  }

  ngOnInit() {}
}
