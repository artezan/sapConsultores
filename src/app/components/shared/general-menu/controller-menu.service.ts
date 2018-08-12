import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
interface MenuSettings {
  hideMenu: boolean;
  hideExit: boolean;
  selectSection: string;
  typeUser: string;
}

@Injectable({
  providedIn: 'root'
})
export class ControllerMenuService {
  public menuSettings$ = new BehaviorSubject<MenuSettings>({
    hideMenu: true,
    hideExit: true,
    selectSection: '',
    typeUser: ''
  });

  constructor() {}
  /**
   *
   * @param hideMenu ocultar menu
   * @param hideExit ocultar salir
   * @param selectSection seleccionar seccion
   * @param typeUser typo de usuario
   */
  menuSettings(
    hideMenu: boolean,
    hideExit: boolean,
    selectSection: string,
    typeUser: string
  ) {
    this.menuSettings$.next({
      hideMenu: hideMenu,
      hideExit: hideExit,
      selectSection: selectSection,
      typeUser
    });
  }
}
