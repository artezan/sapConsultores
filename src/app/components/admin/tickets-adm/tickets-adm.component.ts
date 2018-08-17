import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { SessionService } from '../../../services/session.service';
import { TicketService } from '../../../services/ticket.service';
import { Observable } from 'rxjs';
import { TableColumsModel } from '../../../models/tableColumns';
import { ControllerTableService } from '../../shared/general-table/controller-table.service';
import { TicketModel } from '../../../models/ticket.model';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import { PDFGenerator } from '../../../_config/pdf-generator';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import { ExportXLS } from '../../../_config/excel-generator';

@Component({
  selector: 'app-tickets-adm',
  templateUrl: './tickets-adm.component.html',
  styleUrls: ['./tickets-adm.component.scss']
})
export class TicketsAdmComponent implements OnInit {
  sessionId;
  columns: TableColumsModel[];
  rows: TicketModel[];
  totalHours = 0;
  averageRanking = 0;
  totalCost = 0;
  isLoading = false;
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private controllerMenu: ControllerMenuService,
    private sessionService: SessionService,
    public ticketService: TicketService,
    public dialog: MatDialog
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'company');
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
        this.sessionService.userSession.subscribe(user => {
          if (user.companyId) {
            this.getTickets(user.companyId);
          }
        });
      }
    });
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'ID',
        prop: 'id',
        type: 'normal'
      },
      {
        name: 'Fecha',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Cliente',
        prop: 'customer',
        type: 'normal'
      },
      {
        name: 'Consultor',
        prop: 'consultant',
        type: 'normal'
      },
      {
        name: 'Horas',
        prop: 'hours',
        type: 'number',
        w: true
      },
      {
        name: 'Servicio',
        prop: 'description',
        type: 'normal'
      },

      {
        name: 'Ranking',
        prop: 'ranking',
        type: 'ranking'
      },
      {
        name: 'Estado',
        prop: 'status',
        type: 'status'
      },
      {
        name: 'Costo',
        prop: 'cost',
        type: 'money'
      },
      {
        name: 'Pagado',
        prop: 'isPay',
        type: 'boolean'
      },
      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
        buttonDetails: true,
        buttonEdit: true,
        buttonDeleted: true
      }
    ];
    this.createTable();
  }
  private createTable() {
    this.isLoading = true;
    this.sessionService.userSession.subscribe(user => {
      if (user.companyId) {
        this.getTickets(user.companyId);
      }
    });
  }

  getTickets(companyId) {
    this.ticketService.getTicketsByCompanyId(companyId).subscribe(tickets => {
      this.setRows(tickets);
      this.sumary(tickets);
    });
  }
  setRows(data: TicketModel[]) {
    const rows = [];
    data.forEach(ticket => {
      let customer = 'Sin asignar';
      let consultant = 'Sin asignar';
      let customerId;
      let consultantId;
      if (ticket.customer) {
        customer = ticket.customer.name;
        customerId = ticket.customer._id;
      }
      if (ticket.consultant) {
        consultant = ticket.consultant.name;
        consultantId = ticket.consultant._id;
      }
      rows.push({
        _id: ticket._id,
        id: ticket._id.substring(0, 10),
        isPay: ticket.isPay,
        cost: ticket.cost,
        companyId: ticket.companyId,
        status: ticket.status,
        timestamp: ticket.timestamp,
        consultant: consultant,
        consultantId: consultantId,
        ranking: ticket.ranking,
        customer: customer,
        customerId: customerId,
        hours: ticket.hours,
        description: ticket.description
      });
    });

    this.rows = rows;
    this.isLoading = false;
  }
  sumary(data: TicketModel[]) {
    this.totalHours = 0;
    this.averageRanking = 0;
    this.totalCost = 0;
    if (data.length === 0) {
      this.totalHours = 0;
      this.averageRanking = 0;
      this.totalCost = 0;
    } else {
      let trueRanking = 0;
      data.forEach(ticket => {
        if (ticket.hours) {
          this.totalHours += ticket.hours;
        }
        if (ticket.ranking && !isNaN(ticket.ranking)) {
          trueRanking++;
          this.averageRanking += ticket.ranking;
        }
        if (ticket.cost) {
          this.totalCost += ticket.cost;
        }
      });
      if (this.averageRanking > 0) {
        this.averageRanking = this.averageRanking / trueRanking;
      }
    }
  }
  newTicket() {
    this.router.navigate(['tickets-adm-new']);
  }
  edit(item) {
    const ticket: NavigationExtras = {
      queryParams: item
    };
    this.router.navigate(['tickets-adm-new'], ticket);
  }
  deleted(item) {
    const header = 'Borrar Ticket';
    const subHeader = 'Desea borrar ticket: ' + item.id;
    const body =
      '<p>Cliente: <b> ' +
      item.customer +
      '</b></p> ' +
      '<p>Consultor: <b> ' +
      item.consultant +
      '</b></p> ';
    this.openDialog(header, subHeader, body, item);
  }
  details(ticket: TicketModel) {
    this.router.navigate(['ticket-posts', ticket._id]);
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
  openDialog(header, subHeader, body, item?): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: header,
        subHeader: subHeader,
        body: body,
        isform: false
      }
    });

    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
        this.deleteTicketConfirm(item);
      }
    });
  }
  deleteTicketConfirm(item: TicketModel) {
    if (item._id) {
      this.ticketService.deletedTicket(item).subscribe(res => {
        if (res) {
          this.createTable();
          this.openSnackBar('Ticket Borrado');
        }
      });
    }
  }
  pdf() {
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    PDFGenerator(columsForPDF, this.rows, 450, 'Tickets');
  }
  excel() {
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    ExportXLS(this.rows, columsForPDF, 'Tickets');
  }
}
