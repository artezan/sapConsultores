import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SessionService, UserInfo } from '../services/session.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  /**
   * Se agrega en automatico a cada HttpRequest, ver appmodules
   * @param request peticion de http client
   * @param next envia el request modificado
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser: UserInfo = JSON.parse(
      localStorage.getItem('userSession')
    );
    // con BehavorSubjet
    /* const user = this.injector.get(SessionService).userSession;
    console.log(user.value); */
    if (currentUser) {
      const concatSession = btoa(currentUser.name + ':' + currentUser.password);
      request = request.clone({
        setHeaders: {
          authorization: concatSession,
          user: currentUser.type
        }
      });
    }
    return (
      next
        .handle(request)
        // Errores de API
        .pipe(
          catchError(err => {
            localStorage.removeItem('userSession');
            this.router.navigate(['login']);
            return throwError(err);
          })
        )
    );
  }
}
