import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userIdSession = new BehaviorSubject('');
  userType = new BehaviorSubject('');

  constructor() {}
  setIdSession(id: string) {
    this.userIdSession.next(id);
  }
  setUserType(type: string) {
    this.userType.next(type);
  }
}
