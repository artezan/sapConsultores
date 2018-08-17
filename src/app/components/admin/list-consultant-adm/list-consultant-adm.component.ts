import { Component, OnInit } from '@angular/core';
import { TableColumsModel } from '../../../models/tableColumns';
import { ConsultantModel } from '../../../models/consultant.model';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { SessionService } from '../../../services/session.service';
import { ConsultantService } from '../../../services/consultant.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import { PDFGenerator } from '../../../_config/pdf-generator';
import { ExportXLS } from '../../../_config/excel-generator';

@Component({
  selector: 'app-list-consultant-adm',
  templateUrl: './list-consultant-adm.component.html',
  styleUrls: ['./list-consultant-adm.component.scss']
})
export class ListConsultantAdmComponent implements OnInit {
  columns: TableColumsModel[];
  rows: ConsultantModel[];
  isLoading = false;
  averaRanking = 0;
  constructor(
    private controllerMenu: ControllerMenuService,
    private sessionService: SessionService,
    private consultantService: ConsultantService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.controllerMenu.menuSettings(false, false, 'consultants', 'company');
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
        this.createTable();
      }
    });
  }

  ngOnInit() {
    this.columns = [
      {
        name: 'Nombre',
        prop: 'name',
        type: 'normal'
      },
      {
        name: 'Apellido',
        prop: 'lastName',
        type: 'normal'
      },
      {
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Especialidad',
        prop: 'description',
        type: 'normal'
      },
      {
        name: 'Ranking Promedio',
        prop: 'rankingAverage',
        type: 'normal',
        w: true
      },
      {
        name: '# Tickets',
        prop: 'sumTickets',
        type: 'number',
        w: true
      },
      {
        name: 'Acciones',
        prop: 'acction',
        type: 'buttons',
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
        this.getConsultant(user.companyId);
      }
    });
  }

  getConsultant(companyId) {
    this.consultantService.getConsultant(companyId).subscribe(consultant => {
      this.setRows(consultant);
      // this.sumary(consultant);
    });
  }
  setRows(data: ConsultantModel[]) {
    const rows = [];
    data.forEach(c => {
      let numTickets = 0;
      if (c.tickets) {
        numTickets += c.tickets.length;
      }
      rows.push({
        _id: c._id,
        name: c.name,
        lastName: c.lastName,
        timestamp: c.timestamp,
        description: c.description,
        rankingAverage: c.rankingAverage,
        sumTickets: numTickets
      });
    });

    this.rows = rows;

    this.isLoading = false;
  }
  sumary(data: ConsultantModel[]) {
    let initialRanking = 0;
    this.averaRanking = 0;
    if (data.length === 0) {
      this.averaRanking = 0;
    } else {
      data.forEach(customer => {
        if (customer.rankingAverage) {
          initialRanking += customer.rankingAverage;
        }
      });
      this.averaRanking = initialRanking / data.length;
    }
  }
  edit(item: ConsultantModel) {
    this.router.navigate(['new-consultants-adm', item._id]);
  }
  deleted(item: ConsultantModel) {
    const header = 'Borrar Consultor';
    const subHeader = 'Se eliminarán todos los datos';
    const body =
      '<p>Consultor: <b> ' + item.name + ' ' + item.lastName + '</b></p> ';
    this.openDialog(header, subHeader, body, item);
  }
  newConsultant() {
    this.router.navigate(['new-consultants-adm', 'new']);
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
        this.consultantService.deleteCosnultant(item._id).subscribe(() => {
          this.openSnackBar('Consultor Eliminado');
          this.createTable();
        });
      }
    });
  }
  pdf() {
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    PDFGenerator(columsForPDF, this.rows, 450, 'Consultores');
  }
  excel() {
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    ExportXLS(this.rows, columsForPDF, 'Consultores');
  }
}
