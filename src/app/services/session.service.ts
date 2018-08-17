import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface UserInfo {
  userId?: string;
  companyId?: string;
  /**
   * company, customer, consultant
   */
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  userSession = new BehaviorSubject<UserInfo>({});
  userType = new BehaviorSubject('');

  constructor() {}
  setSession(userId: string, companyId: string, type: string) {
    this.userSession.next({ companyId: companyId, userId: userId, type: type });
  }
  setUserType(type: string) {
    this.userType.next(type);
  }
}
