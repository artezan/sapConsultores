import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../models/customer.model';
import { ControllerMenuService } from '../../shared/general-menu/controller-menu.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { SessionService } from '../../../services/session.service';
import { END_POINT } from '../../../_config/api.end-points';

@Component({
  selector: 'app-conf-customer',
  templateUrl: './conf-customer.component.html',
  styleUrls: ['./conf-customer.component.scss']
})
export class ConfCustomerComponent implements OnInit {
  avatar = '../../../../assets/user-logo.png';
  customer: CustomerModel = {};
  hide = true;
  isNew = true;
  errorToShow = '';
  errorToShowMat = 'Dato obligatorio';
  formData: FormData;
  img;

  constructor(
    private controllerMenu: ControllerMenuService,
    private route: ActivatedRoute,
    private router: Router,
    public customerService: CustomerService,
    public session: SessionService
  ) {
    this.controllerMenu.menuSettings(true, true, '', '');
    session.userSession.subscribe(user => {
      this.customer.companyId = user.companyId;
      this.customer._id = user.userId;
      this.getCustomerInfo(user.userId);
    });
  }

  ngOnInit() {}
  getCustomerInfo(id) {
    this.customerService.getCustomersById(id).subscribe(c => {
      this.customer = c;
      if (c.logo) {
        this.avatar = c.logo;
      }
    });
  }
  editCustomer() {
    this.customer.logo = END_POINT.IP + this.img;
    this.customerService.updateCustomers(this.customer).subscribe(() => {
      this.customerService.addCustomerImg(this.formData).subscribe(res => {
        const toast: NavigationExtras = {
          queryParams: { res: 'editado' }
        };
        this.router.navigate(['tickets-customer'], toast);
      });
    });
  }
  link() {
    const input = document.getElementById('imagen1').click();
  }
  fileChangeEvent(fileInput) {
    const imgToUpload = <File>fileInput.target.files[0];
    const formData = new FormData();
    formData.append('imagen1', imgToUpload);
    this.img = imgToUpload.name;
    this.formData = formData;
    // preview
    const reader = new FileReader();
    reader.onload = r => {
      this.render2(reader.result);
    };
    reader.readAsDataURL(imgToUpload);
  }
  render2(src) {
    this.avatar = src;
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
