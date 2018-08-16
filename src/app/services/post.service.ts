import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { END_POINT } from '../_config/api.end-points';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}
  getPost(ticketId: string): Observable<PostModel[]> {
    return this.http
      .get(END_POINT.GET_POST_BY_TICKET_ID + ticketId)
      .pipe(map((data: any) => data.data));
  }
}