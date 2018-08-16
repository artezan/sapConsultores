import { Component, OnInit } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { CustomerService } from '../../../services/customer.service';
import { TableColumsModel } from '../../../models/tableColumns';
import { CustomerModel } from '../../../models/customer.model';
import { SessionService } from '../../../services/session.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GeneralAlertComponent } from '../../shared/general-alert/general-alert.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PDFGenerator } from '../../../_config/pdf-generator';
import { ExportXLS } from '../../../_config/excel-generator';

@Component({
  selector: 'app-list-customer-adm',
  templateUrl: './list-customer-adm.component.html',
  styleUrls: ['./list-customer-adm.component.scss']
})
export class ListCustomerAdmComponent implements OnInit {
  columns: TableColumsModel[];
  rows: CustomerModel[];
  isLoading = false;
  totalHours = 0;
  averageHours = 0;
  constructor(
    private controllerMenu: ControllerMenuService,
    private sessionService: SessionService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.controllerMenu.menuSettings(false, false, 'customers', 'company');
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        this.openSnackBar(params.res.toString());
        /* this.sessionService.userIdSession.subscribe(sessionId => {
          if (sessionId) {
            this.getCustomers(sessionId);
          }
        }); */
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
        name: 'Fecha Alta',
        prop: 'timestamp',
        type: 'date'
      },
      {
        name: 'Correo',
        prop: 'email',
        type: 'normal'
      },
      {
        name: 'Teléfono',
        prop: 'phone',
        type: 'normal'
      },
      {
        name: 'Área',
        prop: 'workArea',
        type: 'normal'
      },
      {
        name: 'Horas',
        prop: 'totalHours',
        type: 'normal',
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
    this.sessionService.userIdSession.subscribe(sessionId => {
      if (sessionId) {
        this.getCustomers(sessionId);
      }
    });
  }

  getCustomers(companyId) {
    this.customerService.getCustomers(companyId).subscribe(customers => {
      console.log(customers);
      this.setRows(customers);
      this.sumary(customers);
    });
  }
  setRows(data: CustomerModel[]) {
    console.log(data);
    const rows = [];
    data.forEach(ticket => {
      rows.push({
        _id: ticket._id,
        name: ticket.name,
        email: ticket.email,
        logo: ticket.logo,
        password: ticket.password,
        phone: ticket.phone,
        timestamp: ticket.timestamp,
        totalHours: ticket.totalHours,
        workArea: ticket.workArea
      });
    });

    this.rows = rows;

    this.isLoading = false;
  }
  sumary(data: CustomerModel[]) {
    this.totalHours = 0;
    this.averageHours = 0;
    if (data.length === 0) {
      this.totalHours = 0;
      this.averageHours = 0;
    } else {
      data.forEach(customer => {
        if (customer.totalHours) {
          this.totalHours += customer.totalHours;
        }
      });
      this.averageHours = this.totalHours / data.length;
    }
  }
  edit(item: CustomerModel) {
    this.router.navigate(['new-customers-adm', item._id]);
  }
  deleted(item: CustomerModel) {
    const header = 'Borrar Cliente';
    const subHeader = 'Se eliminarán todos los datos';
    const body = '<p>Cliente: <b> ' + item.name + '</b></p> ';
    this.openDialog(header, subHeader, body, item);
  }
  newCustomer() {
    this.router.navigate(['new-customers-adm', 'new']);
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
        this.customerService.deletedCustomers(item._id).subscribe(() => {
          this.openSnackBar('Cliente Eliminado');
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
    PDFGenerator(columsForPDF, this.rows, 450, 'Clientes');
  }
  excel() {
    const columsForPDF = [];
    this.columns.forEach(column => {
      if (column.type !== 'buttons') {
        columsForPDF.push(column);
      }
    });
    ExportXLS(this.rows, columsForPDF, 'Clientes');
  }
}
