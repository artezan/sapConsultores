import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { POST } from './posts';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';
import { TicketModel } from '../../../models/ticket.model';
import { Observable } from 'rxjs';
import { ControllerMenuService } from '../general-menu/controller-menu.service';
import { SessionService } from '../../../services/session.service';
import { PDFGenerator } from '../../../_config/pdf-generator';
import { TableColumsModel } from '../../../models/tableColumns';
import { PostModel } from '../../../models/post.model';
import { SocketIoService } from '../../../services/socket-io.service';
import { MatAccordion } from '@angular/material';
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

@Component({
  selector: 'app-general-ticket-post',
  templateUrl: './general-ticket-post.component.html',
  styleUrls: ['./general-ticket-post.component.scss']
})
export class GeneralTicketPostComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion)
  accordion: MatAccordion;
  posts: PostModel[] = [];
  name = 'Angular';
  ticketId: string;
  isLoaded = false;
  ticketObj: TicketModel;
  userType: string;
  rows;
  columns: TableColumsModel[];
  postToSend: PostModel = {};
  userId;
  closeAll: boolean;
  sub;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private controllerMenu: ControllerMenuService,
    private session: SessionService,
    private socketIoService: SocketIoService
  ) {
    session.userSession.subscribe(user => {
      this.userId = user.userId;
      this.userType = user.type;
      this.controllerMenu.menuSettings(false, false, 'tickets', user.type);
    });
    this.createPosts();
    // realtime
    this.sub = socketIoService.onNewPost().subscribe(newPost => {
      this.createPosts();
    });
  }
  private createPosts() {
    this.route.params.subscribe(params => (this.ticketId = params['id']));
    this.postService.getPost(this.ticketId).subscribe(posts => {
      this.posts = posts;
      this.seenPost(posts);
      this.ticketService.getTicketsById(this.ticketId).subscribe(t => {
        this.ticketObj = t;
        this.isLoaded = true;
      });
    });
  }
  seenPost(posts: PostModel[]) {
    posts.forEach(post => {
      if (this.userType === 'customer' && !post.isByCustomer && !post.seen) {
        post.seen = true;
        this.updatePost(post);
      } else if (
        this.userType === 'consultant' &&
        post.isByCustomer &&
        !post.seen
      ) {
        post.seen = true;
        this.updatePost(post);
      }
    });
  }
  updatePost(post: PostModel) {
    this.postService.updatePost(post).subscribe(p => console.log(p));
  }

  geDay(datePost): number {
    const day = new Date(datePost).getDate();
    return day;
  }
  geMonth(datePost): string {
    const month = MONTHS[new Date(datePost).getMonth()];
    return month;
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'Fecha Comentario',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Usuario',
        prop: 'user',
        type: 'normal'
      },
      {
        name: 'Comentario',
        prop: 'content',
        type: 'normal'
      }
    ];
  }
  pdf() {
    const rows = [];
    const subHeader =
      'ID del Ticket: ' + this.posts[0].ticket._id.substring(0, 10);
    const subHeader2 = 'Estado del Ticket: ' + this.posts[0].ticket.status;
    this.posts.forEach((post: PostModel) => {
      let user;
      let content = post.content;
      if (post.isByCustomer === true) {
        user = post.customer.name;
      } else {
        user = post.consultant.name;
      }
      if (post.title) {
        content = post.title + ': ' + content;
      }
      // generar row para pdf
      rows.push({
        timestamp: post.timestamp,
        user: user,
        content: content
      });
    });
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    PDFGenerator(columsForPDF, rows, 450, 'Historial', subHeader, subHeader2);
  }
  newPost(title, contenet) {
    this.postToSend.title = title;
    this.postToSend.content = contenet;
    this.postToSend.ticketId = this.ticketId;
    if (this.userType === 'customer') {
      this.postToSend.isByCustomer = true;
      this.postToSend.customerId = this.userId;
    } else {
      this.postToSend.isByCustomer = false;
      this.postToSend.consultantId = this.userId;
    }
    this.postService.addPost(this.postToSend).subscribe(() => {
      this.createPosts();
    });
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    //  'implements OnDestroy' to the class.
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
