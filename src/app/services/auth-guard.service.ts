import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { SessionService, UserInfo } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private sessionSvc: SessionService, private router: Router) {}
  /**
   *
   * @param route contiene la ruta futura que se activará
   * @param state el stado futuro
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    const rol: string = route.data['rol'];
    return this.checkLogin(rol);
  }
  /**
   *
   * @param rol rol viene el user
   */
  checkLogin(rol: string): boolean {
    if (localStorage.getItem('userSession')) {
      const currentUser: UserInfo = JSON.parse(
        localStorage.getItem('userSession')
      );
      if (currentUser.type === rol) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
