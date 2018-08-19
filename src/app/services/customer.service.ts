import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  public getCustomers(companyId: string): Observable<CustomerModel[]> {
    return this.http
      .get(END_POINT.GET_CUSTOMER_BY_COMPANY_ID + companyId)
      .pipe(map((data: any) => data.data));
  }
  public getCustomersById(customerId: string): Observable<CustomerModel> {
    return this.http
      .get(END_POINT.GET_CUSTOMER_BY_ID + customerId)
      .pipe(map((data: any) => data.data));
  }
  public addCustomers(customer: CustomerModel): Observable<CustomerModel[]> {
    return this.http
      .post(END_POINT.POST_CUSTOMER_NEW, customer)
      .pipe(map((data: any) => data.data));
  }
  public updateCustomers(customer: CustomerModel): Observable<CustomerModel[]> {
    return this.http
      .put(END_POINT.PUT_CUSTOMER + customer._id, customer)
      .pipe(map((data: any) => data.data));
  }
  public deletedCustomers(customerId: string): Observable<Boolean> {
    return this.http
      .delete(END_POINT.DELETE_CUSTOMER + customerId)
      .pipe(map((data: any) => data.data));
  }
  public getCustomerSession(
    name: string,
    password
  ): Observable<CustomerModel[]> {
    const concatSession = btoa(name + ':' + password);
    return this.http
      .get(END_POINT.GET_CUSTOMER_SESSION + concatSession)
      .pipe(map((data: any) => data.data));
  }
  public addCustomerImg(formData: FormData): Observable<boolean> {
    return this.http
      .post(END_POINT.POST_IMG_CUSTOMER, formData)
      .pipe(map((data: any) => data.data));
  }
}
