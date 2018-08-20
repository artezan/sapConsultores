import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  AfterContentChecked
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { TableColumsModel } from '../../../models/tableColumns';
import { TicketModel } from '../../../models/ticket.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SessionService, UserInfo } from '../../../services/session.service';
import { TicketService } from '../../../services/ticket.service';
import { Observable } from 'rxjs';
import { CustomerModel } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer.service';
import { ConsultantService } from '../../../services/consultant.service';
import { ConsultantModel } from '../../../models/consultant.model';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import { PostService } from '../../../services/post.service';
import { PostModel } from '../../../models/post.model';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-tickets-customer',
  templateUrl: './tickets-customer.component.html',
  styleUrls: ['./tickets-customer.component.scss']
})
export class TicketsCustomerComponent implements OnInit, OnDestroy {
  columns: TableColumsModel[];
  rows: TicketModel[] = [];
  averageRanking = 0;
  isLoading = false;
  // resumen
  customer: CustomerModel;
  // unsubcribe
  sub;
  sub2;
  //  Rating
  ratingSet: number;
  ticketToUpdate: TicketModel = {};
  postNoSeen: PostModel[] = [];
  customerId: string;
  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private controllerMenu: ControllerMenuService,
    private sessionService: SessionService,
    public ticketService: TicketService,
    public dialog: MatDialog,
    private customerService: CustomerService,
    private postService: PostService,
    private socketIoService: SocketIoService
  ) {
    this.controllerMenu.menuSettings(false, false, 'tickets', 'customer');
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        if (params.res === 'editado') {
          this.openSnackBar('Perfil Editado');
        } else {
          const body = '<p> En breve se le asignará horas y un consultor </p>';
          this.openDialog('Ticket', 'Se ha generado un ticket nuevo', body);
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
        buttonMail: true,
        buttonRating: true
      }
    ];
    this.createTable();
    this.socketIoService.onNewPost().subscribe(post => {
      if (this.customerId) {
        this.customerService.getCustomersById(this.customerId).subscribe(c => {
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
    // carga id de usuario
    this.sub = this.sessionService.userSession.subscribe(user => {
      if (user.companyId !== undefined && user.type === 'customer') {
        this.customerId = user.userId;
        this.getTickets(user.userId);
      }
    });
  }

  getTickets(customerId) {
    // get customer por id para tickets
    this.sub2 = this.customerService
      .getCustomersById(customerId)
      .subscribe(c => {
        this.customer = c;
        if (c.tickets) {
          this.setRows(c.tickets);
          this.checkPost(c.tickets);
        }
      });
  }
  setRows(data: TicketModel[]) {
    const rows = [];
    data.forEach(async ticket => {
      let consultantName = 'Sin asignar';
      if (ticket.consultant) {
        consultantName = ticket.consultant.name;
      }
      rows.push({
        _id: ticket._id,
        id: ticket._id.substring(0, 10),
        isPay: ticket.isPay,
        cost: ticket.cost,
        companyId: ticket.companyId,
        status: ticket.status,
        timestamp: ticket.timestamp,
        ranking: ticket.ranking,
        hours: ticket.hours,
        description: ticket.description,
        consultant: consultantName
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
  openDialog(header, subHeader, body, isRating = false): void {
    const dialogRef = this.dialog.open(GeneralAlertComponent, {
      maxWidth: '50%',
      minWidth: '20%',
      data: {
        header: header,
        subHeader: subHeader,
        body: body,
        isform: false,
        isRating: isRating
      }
    });

    const sub = dialogRef.componentInstance.buttons.subscribe(res => {
      if (res === 'ok') {
      }
    });
    const sub2 = dialogRef.componentInstance.ratingResult.subscribe(res => {
      if (res) {
        this.ratingSet = res.rating;
        this.setRating();
      }
    });
  }
  newTicket() {
    this.router.navigate(['ticket-new-customer']);
  }
  /**
   * VER posts
   * @param item ticket
   */
  mail(item: TicketModel) {
    this.router.navigate(['ticket-posts', item._id]);
  }
  rating(item: TicketModel) {
    this.ticketToUpdate._id = item._id;
    const header = 'Califique su servicio';
    const subHeader = 'Puede poner de 1 a 5 estrellas';
    this.openDialog(header, subHeader, '', true);
  }
  setRating() {
    this.ticketToUpdate.ranking = this.ratingSet;
    this.ticketService.updateTicket(this.ticketToUpdate).subscribe(res => {
      this.openSnackBar('Gracias por su calificación');
      this.createTable();
    });
  }
  checkPost(tickets: TicketModel[]) {
    tickets.forEach(ticket => {
      this.postService.getPost(ticket._id).subscribe(posts => {
        const noSeen = posts.filter(
          post => post.seen === false && post.isByCustomer === false
        );
        noSeen.forEach(n => {
          const isFinded = this.postNoSeen.findIndex(
            post => post.consultant._id === n.consultant._id
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
