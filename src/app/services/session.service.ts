import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface UserInfo {
  userId?: string;
  companyId?: string;
  /**
   * company, customer, consultant
   */
  type?: string;
  name?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  userSession = new BehaviorSubject<UserInfo>({});
  userType = new BehaviorSubject('');

  constructor() {}
  setSession(userId: string, companyId: string, type: string) {
    this.userSession.next({ companyId: companyId, userId: userId, type: type });
  }
  setUserType(type: string) {
    this.userType.next(type);
  }
  public deleteLocalStore(): Promise<any> {
    return new Promise((resolve, reject) => {
      // ve si hay un usuario en el localstore
      const currentUser: UserInfo = JSON.parse(
        localStorage.getItem('userSession')
      );
      if (currentUser) {
        localStorage.removeItem('userSession');
      }
      return resolve(true);
    });
  }
}
