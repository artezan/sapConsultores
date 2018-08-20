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
  public addPost(post: PostModel): Observable<PostModel[]> {
    return this.http
      .post(END_POINT.POST_NEW_POST, post)
      .pipe(map((data: any) => data.data));
  }
  public updatePost(post: PostModel): Observable<boolean> {
    return this.http
      .put(END_POINT.PUT_UPDATE_POST + post._id, post)
      .pipe(map((data: any) => data.data));
  }
}
