import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TableColumsModel } from '../../../models/tableColumns';
import { ControllerTableService } from './controller-table.service';
import { TicketModel } from '../../../models/ticket.model';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit, OnChanges {
  months = [
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
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  @Input()
  showFilterByStatus = true;
  @Input()
  columns: TableColumsModel[];
  @Input()
  rows: any[];
  @Output()
  editButton = new EventEmitter<Array<any>>();
  @Output()
  deletedButton = new EventEmitter<Array<any>>();
  @Output()
  detailsButton = new EventEmitter<Array<any>>();
  @Output()
  mailButton = new EventEmitter<Array<any>>();
  @Output()
  ratingButton = new EventEmitter<Array<any>>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  realData;

  constructor() {
    // Assign the data to the data source for the table to render
  }

  ngOnInit() {
    // TICKETS.map(item => item.timestamp);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.columns) {
      if (changes.columns.currentValue) {
        this.displayedColumns = changes.columns.currentValue.map(
          colum => colum.prop
        );
      }
    }
    if (changes.rows) {
      if (changes.rows.currentValue) {
        this.dataSource = new MatTableDataSource(changes.rows.currentValue);
        this.realData = changes.rows.currentValue;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filterByDay(day: number) {
    this.dataSource = new MatTableDataSource(this.realData);
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getDate() === +day
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (!day) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByYear(year: number) {
    this.dataSource = new MatTableDataSource(this.realData);
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getFullYear() === +year
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (!year) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByMonth(month: number) {
    this.dataSource = new MatTableDataSource(this.realData);
    const dayFinded = this.dataSource.data.filter(
      item => new Date(item.timestamp).getMonth() === +month
    );
    this.dataSource = new MatTableDataSource(dayFinded);
    if (isNaN(month)) {
      this.dataSource = new MatTableDataSource(this.realData);
    }
  }
  filterByState(status) {
    if (!status) {
      this.dataSource = new MatTableDataSource(this.realData);
    } else {
      this.dataSource = new MatTableDataSource(this.realData);
      const stateFinded = this.dataSource.data.filter(
        item => item.status.toLowerCase() === status.toLowerCase()
      );
      this.dataSource = new MatTableDataSource(stateFinded);
    }
  }
  formatDates(dateInput: Date): string {
    const day: string = new Date(dateInput).getDate().toString();
    const month: string = (new Date(dateInput).getMonth() + 1).toString();
    const year: string = new Date(dateInput).getFullYear().toString();
    const date = day + '/' + month + '/' + year;
    return date;
  }
  getArray(numberItems: number): number[] {
    return Array(numberItems).fill(1);
  }
  onSelect(item) {
    console.log(item);
  }
  deletedItem(item) {
    this.deletedButton.emit(item);
  }
  mailItem(item) {
    this.mailButton.emit(item);
  }
  ratingItem(item) {
    this.ratingButton.emit(item);
  }
  editItem(item) {
    this.editButton.emit(item);
  }
  detailsItem(item) {
    this.detailsButton.emit(item);
  }
}
