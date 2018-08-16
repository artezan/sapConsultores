import { Component, OnInit } from '@angular/core';
import { ConsultantModel } from '../../../models/consultant.model';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { ConsultantService } from '../../../services/consultant.service';
import { SessionService } from '../../../services/session.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-new-consultant-adm',
  templateUrl: './new-consultant-adm.component.html',
  styleUrls: ['./new-consultant-adm.component.scss']
})
export class NewConsultantAdmComponent implements OnInit {
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
    this.controllerMenu.menuSettings(true, true, '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.consultantService.getConsultantById(params['id']).subscribe(c => {
          this.consultant = c;
        });
        this.isNew = false;
      } else {
        this.isNew = true;
      }
    });
    this.session.userIdSession.subscribe(companyId => {
      this.companyId = companyId;
    });
  }
  newConsultant() {
    this.consultant.companyId = this.companyId;
    console.log(this.consultant);
    this.consultantService.addCosnultant(this.consultant).subscribe(t => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Consultor Agregado' }
      };
      this.router.navigate(['list-consultants-adm'], toast);
    });
  }
  editConsultant() {
    this.consultantService.updateCosnultant(this.consultant).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Cosnultor Editado' }
      };
      this.router.navigate(['list-consultants-adm'], toast);
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
