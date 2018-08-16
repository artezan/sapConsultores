import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getCompanySession(name: string, password): Observable<CompanyModel[]> {
    const concatSession = btoa(name + ':' + password);
    return this.http
      .get<CompanyModel[]>(END_POINT.COMPANY + concatSession)
      .pipe(map((data: any) => data.data));
  }
}
