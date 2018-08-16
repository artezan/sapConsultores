import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumsModel } from '../../../models/tableColumns';

@Injectable({
  providedIn: 'root'
})
export class ControllerTableService {
  columns$ = new BehaviorSubject<TableColumsModel[]>([]);
  data$ = new BehaviorSubject<any[]>([]);

  constructor() {}
  public setColumns(columns: TableColumsModel[]) {
    this.columns$.next(columns);
  }
  public setData(data: any[]) {
    this.data$.next(data);
  }
}
