import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { END_POINT } from '../_config/api.end-points';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: SocketIOClient.Socket; // The client instance of socket.io

  constructor() {
    // start listen
    this.socket = io(END_POINT.IP);
  }
  /**
   * evento llamado en los post post
   */
  public onNewPost(): Observable<PostModel> {
    return new Observable<PostModel>(observer => {
      this.socket.on('NEW_POST', (newPost: PostModel) =>
        observer.next(newPost)
      );
    });
  }
}
