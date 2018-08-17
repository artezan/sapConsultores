import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultantModel } from '../models/consultant.model';
import { Observable } from 'rxjs';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  constructor(private http: HttpClient) {}
  public getConsultant(companyId): Observable<ConsultantModel[]> {
    return this.http
      .get(END_POINT.GET_CONSULTANT_BY_COMPANY_ID + companyId)
      .pipe(map((data: any) => data.data));
  }
  public getConsultantById(consultantId: string): Observable<ConsultantModel> {
    return this.http
      .get(END_POINT.GET_CONSULTANT_BY_ID + consultantId)
      .pipe(map((data: any) => data.data));
  }
  public addCosnultant(
    consultant: ConsultantModel
  ): Observable<ConsultantModel[]> {
    return this.http
      .post(END_POINT.POST_CONSULTANT_NEW, consultant)
      .pipe(map((data: any) => data.data));
  }
  public updateCosnultant(
    consultant: ConsultantModel
  ): Observable<ConsultantModel[]> {
    return this.http
      .put(END_POINT.PUT_CONSULTANT + consultant._id, consultant)
      .pipe(map((data: any) => data.data));
  }
  public deleteCosnultant(consultantId: string): Observable<Boolean> {
    return this.http
      .delete(END_POINT.DELETE_CONSULTANT + consultantId)
      .pipe(map((data: any) => data.data));
  }
  public getConsultantSession(
    name: string,
    password
  ): Observable<ConsultantModel[]> {
    const concatSession = btoa(name + ':' + password);
    return this.http
      .get(END_POINT.GET_CONSULTANT_SESSION + concatSession)
      .pipe(map((data: any) => data.data));
  }
}
