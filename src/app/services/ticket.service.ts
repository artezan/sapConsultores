import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TicketModel } from '../models/ticket.model';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getTicketsByCompanyId(companyId: string): Observable<TicketModel[]> {
    return this.http
      .get(END_POINT.GET_TICKETS_BY_COMPANY_ID + companyId)
      .pipe(map((data: any) => data.data));
  }
  public getTicketsById(ticketId: string): Observable<TicketModel> {
    return this.http
      .get(END_POINT.GET_TICKETS_BY_ID + ticketId)
      .pipe(map((data: any) => data.data));
  }
  public addTicket(ticket: TicketModel): Observable<TicketModel[]> {
    return this.http
      .post(END_POINT.POST_TICKET_NEW, ticket)
      .pipe(map((data: any) => data.data));
  }
  public changeTicket(
    ticketId: string,
    newCustomerId?,
    oldCustomerId?,
    newConsultantId?,
    oldConsultantId?
  ): Observable<boolean> {
    const body = {};
    if (oldCustomerId && newCustomerId !== oldCustomerId) {
      body['newCustomerId'] = newCustomerId;
      body['oldCustomerId'] = oldCustomerId;
    }
    if (oldConsultantId && newConsultantId !== oldConsultantId) {
      body['newConsultantId'] = newConsultantId;
      body['oldConsultantId'] = oldConsultantId;
    }
    console.log(body);
    return this.http
      .post(END_POINT.POST_TICKET_CHANGE + ticketId, body)
      .pipe(map((data: any) => data.data));
  }
  public updateTicket(ticket: TicketModel): Observable<boolean> {
    return this.http
      .put(END_POINT.PUT_TICKET_UPDATE + ticket._id, ticket)
      .pipe(map((data: any) => data.data));
  }
  public deletedTicket(ticket: TicketModel): Observable<boolean> {
    return this.http
      .delete(END_POINT.DELETE_TICKET + ticket._id)
      .pipe(map((data: any) => data.data));
  }
}
