import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../../models/ticket.model';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { ConsultantService } from '../../../services/consultant.service';
import { SessionService } from '../../../services/session.service';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-new-customer',
  templateUrl: './ticket-new-customer.component.html',
  styleUrls: ['./ticket-new-customer.component.scss']
})
export class TicketNewCustomerComponent implements OnInit {
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  ticket: TicketModel = {};
  constructor(
    private controllerMenu: ControllerMenuService,
    private route: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService,
    public consultantService: ConsultantService,
    public session: SessionService,
    public ticketService: TicketService
  ) {
    this.controllerMenu.menuSettings(true, true, '', '');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        /* let consultantId;
        let customerId;
        let isPay;
        if (params.consultantId) {
          consultantId = params.consultantId;
          this.oldConsultantId = params.consultantId;
        }
        if (params.customerId) {
          customerId = params.customerId;
          this.oldCustomerId = params.customerId;
        }
        if (params.isPay.toString() === 'false') {
          isPay = false;
        } else {
          isPay = true;
        }
        // convertir estan en sting
        this.ticket = {
          cost: +params.cost,
          hours: +params.hours,
          description: params.description,
          customerId: customerId,
          consultantId: consultantId,
          isPay: isPay,
          status: params.status,
          _id: params._id
        };
        this.isNew = false; */
      } else {
        this.isNew = true;
      }
    });
    this.session.userSession.subscribe(user => {
      this.companyId = user.companyId;
      this.ticket.customerId = user.userId;
    });
  }
  newTicket() {
    this.ticket.companyId = this.companyId;
    this.ticket.hours = 0;
    this.ticketService.addTicket(this.ticket).subscribe(t => {
      const toast: NavigationExtras = {
        queryParams: { res: 'nuevo' }
      };
      this.router.navigate(['tickets-customer'], toast);
    });
  } /*
  editTicket() {
    if (
      this.oldConsultantId !== this.ticket.consultantId ||
      this.oldCustomerId !== this.ticket.customerId
    ) {
      this.ticketService
        .changeTicket(
          this.ticket._id,
          this.ticket.customerId,
          this.oldCustomerId,
          this.ticket.consultantId,
          this.oldConsultantId
        )
        .subscribe(res => {
          this.editNewTicket();
        });
    } else {
      this.editNewTicket();
    }
    // put para asignar
  }
  editNewTicket() {
    if (!this.oldConsultantId) {
      this.ticket.consultant = <any>this.ticket.consultantId;
    }
    if (!this.oldCustomerId) {
      this.ticket.customer = <any>this.ticket.customerId;
    }
    delete this.ticket.consultantId;
    delete this.ticket.customerId;
    this.ticketService.updateTicket(this.ticket).subscribe(res => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Ticket Editado' }
      };
      this.router.navigate(['tickets-adm'], toast);
    });
  } */
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
}
