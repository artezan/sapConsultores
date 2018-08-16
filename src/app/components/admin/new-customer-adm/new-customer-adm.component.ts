import { Component, OnInit } from '@angular/core';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerModel } from '../../../models/customer.model';

@Component({
  selector: 'app-new-customer-adm',
  templateUrl: './new-customer-adm.component.html',
  styleUrls: ['./new-customer-adm.component.scss']
})
export class NewCustomerAdmComponent implements OnInit {
  hide = true;
  companyId: string;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  customer: CustomerModel = {};
  constructor(
    private controllerMenu: ControllerMenuService,
    private route: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService,
    public session: SessionService
  ) {
    this.controllerMenu.menuSettings(true, true, '', '');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] !== 'new') {
        this.customerService.getCustomersById(params['id']).subscribe(c => {
          this.customer = c;
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
  newCustomer() {
    this.customer.companyId = this.companyId;
    console.log(this.customer);
    this.customerService.addCustomers(this.customer).subscribe(t => {
      const toast: NavigationExtras = {
        queryParams: { res: 'Nuevo Cliente Agregado' }
      };
      this.router.navigate(['list-customers-adm'], toast);
    });
  }
  editCustomer() {
    this.customerService.updateCustomers(this.customer).subscribe(() => {
      const toast: NavigationExtras = {
        queryParams: { res: ' Cliente Editado' }
      };
      this.router.navigate(['list-customers-adm'], toast);
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
