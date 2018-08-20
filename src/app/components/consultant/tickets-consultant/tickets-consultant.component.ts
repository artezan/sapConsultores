import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { TableColumsModel } from '../../../models/tableColumns';
import { TicketModel } from '../../../models/ticket.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SessionService } from '../../../services/session.service';
import { TicketService } from '../../../services/ticket.service';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import { ConsultantModel } from '../../../models/consultant.model';
import { ConsultantService } from '../../../services/consultant.service';
import { PostModel } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-tickets-consultant',
  templateUrl: './tickets-consultant.component.html',
  styleUrls: ['./tickets-consultant.component.scss']
})
export class TicketsConsultantComponent implements OnInit, OnDestroy {
  columns: TableColumsModel[];
  rows: TicketModel[] = [];
  averageRanking = 0;
  isLoading = false;
  // resumen
  consultant: ConsultantModel;
  // unsubcribe
  sub;
  sub2;
  postNoSeen: PostModel[] = [];
  //  Rating
  statusCahnge: string;
  ticketToUpdate: TicketModel = {};
  cosultantID;
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private controllerMenu: ControllerMenuService,
    private sessionService: SessionService,
    public ticketService: TicketService,
    public dialog: MatDialog,
    private consultantService: ConsultantService,
    private postService: PostService,
    private socketIoService: SocketIoService
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'consultant');
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        if (params.res === 'editado') {
          this.openSnackBar('Perfil Editado');
        } else {
        }
        this.createTable();
      }
    });
    //  columnas a mostrar
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
        buttonMail: true,
        buttonDetails: true
      }
    ];
    this.createTable();
    this.socketIoService.onNewPost().subscribe(post => {
      if (this.cosultantID) {
        this.consultantService
          .getConsultantById(this.cosultantID)
          .subscribe(c => {
            if (c.tickets) {
              this.checkPost(c.tickets);
            }
          });
      }
    });
  }

  ngOnInit() {}
  private createTable() {
    //  carga loader
    this.isLoading = true;
    // carga id de consultor
    this.sub = this.sessionService.userSession.subscribe(user => {
      if (user.companyId !== undefined) {
        this.cosultantID = user.userId;
        this.getTickets(user.userId);
      }
    });
  }

  getTickets(consultantId) {
    // get consulktant por id para tickets
    this.sub2 = this.consultantService
      .getConsultantById(consultantId)
      .subscribe(c => {
        this.consultant = c;
        if (c.tickets) {
          this.setRows(c.tickets);
          this.checkPost(c.tickets);
        }
      });
  }
  setRows(data: TicketModel[]) {
    const rows = [];
    data.forEach(ticket => {
      let customerName = 'Sin asignar';
      if (ticket.customer) {
        customerName = ticket.customer.name;
      }
      rows.push({
        _id: ticket._id,
        id: ticket._id.substring(0, 10),
        isPay: ticket.isPay,
        cost: ticket.cost,
        companyId: ticket.companyId,
        status: ticket.status,
        timestamp: ticket.timestamp,
        hours: ticket.hours,
        description: ticket.description,
        customer: customerName
      });
    });
    this.rows = rows;
    this.isLoading = false;
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 4000
    });
  }
  openDialog(header, subHeader, body, isform = false): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: header,
        subHeader: subHeader,
        body: body,
        isform: isform,
        isRating: false
      }
    });

    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
      }
    });
    const sub2 = dialogRef.componentInstance.statusChange.subscribe(res => {
      this.statusCahnge = res;
      this.setStatus();
    });
  }
  newTicket() {
    this.router.navigate(['ticket-new-customer']);
  }
  mail(item) {
    this.router.navigate(['ticket-posts', item._id]);
  }
  detail(item: TicketModel) {
    this.ticketToUpdate._id = item._id;
    const header = 'Cambie el estado del Ticket';
    const subHeader = 'Seleccione el estado en el que se encuentre el ticket';
    this.openDialog(header, subHeader, '', true);
  }
  setStatus() {
    this.ticketToUpdate.status = this.statusCahnge;
    this.ticketService.updateTicket(this.ticketToUpdate).subscribe(res => {
      this.openSnackBar('Estatus Modificado');
      this.createTable();
    });
  }
  checkPost(tickets: TicketModel[]) {
    tickets.forEach(ticket => {
      this.postService.getPost(ticket._id).subscribe(posts => {
        const noSeen = posts.filter(
          post => post.seen === false && post.isByCustomer === true
        );
        noSeen.forEach(n => {
          const isFinded = this.postNoSeen.findIndex(
            post => post.customer._id === n.customer._id
          );
          if (isFinded === -1) {
            this.postNoSeen.push(n);
          }
        });
      });
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    /*  this.sub.unsubscribe();
    this.sub2.unsubscribe(); */
  }
}
