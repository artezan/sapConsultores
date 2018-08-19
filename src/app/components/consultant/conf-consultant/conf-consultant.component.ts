import { Component, OnInit } from '@angular/core';
import { ConsultantModel } from '../../../models/consultant.model';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ConsultantService } from '../../../services/consultant.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-conf-consultant',
  templateUrl: './conf-consultant.component.html',
  styleUrls: ['./conf-consultant.component.scss']
})
export class ConfConsultantComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  consultant: ConsultantModel = {};
  constructor(
    private controllerMenu: ControllerMenuService,
    private route: ActivatedRoute,
    private router: Router,
    public consultantService: ConsultantService,
    public session: SessionService
  ) {
    this.controllerMenu.menuSettings(true, true, 'conf', 'consultant');
  }

  ngOnInit() {
    this.session.userSession.subscribe(user => {
      this.companyId = user.companyId;
      this.consultantService.getConsultantById(user.userId).subscribe(c => {
        this.consultant = c;
      });
    });
  }
  editConsultant() {
    this.consultantService.updateCosnultant(this.consultant).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: 'editado' }
      };
      this.router.navigate(['tickets-consultant'], toast);
    });
  }
  getPopMessage(event) {
    const isDisabled = (<HTMLInputElement>document.getElementById('submitUser'))
      .disabled;
    if (isDisabled) {
      this.errorToShow = 'Verificar datos ingresados';
    } else {
      this.errorToShow = '';
    }
  }
  getMatError($event) {
    if ($event.target.validity.valueMissing) {
      this.errorToShowMat = 'Dato obligatorio';
    }
    if ($event.target.validity.patternMismatch) {
      this.errorToShowMat = 'Solo números, letras, guiones y puntos\n';
    }
    if ($event.target.validity.tooShort) {
      this.errorToShowMat = 'Ingrese al menos 4 caracteres\n';
    }
    if ($event.target.validity.tooLong) {
      this.errorToShowMat = 'Máximo 255 caracteres\n';
    }
    if ($event.target.validity.rangeUnderflow) {
      this.errorToShowMat = 'Debe ser mayor a 0\n';
    }
  }
}
