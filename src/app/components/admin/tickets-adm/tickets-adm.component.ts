import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';

@Component({
  selector: 'app-tickets-adm',
  templateUrl: './tickets-adm.component.html',
  styleUrls: ['./tickets-adm.component.scss']
})
export class TicketsAdmComponent implements OnInit {
  constructor(
    private router: Router,
    private controllerMenu: ControllerMenuService
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'Administrador');
  }

  ngOnInit() {}
}
