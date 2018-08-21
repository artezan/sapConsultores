import { ConfConsultantComponent } from './components/consultant/conf-consultant/conf-consultant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { TicketsAdmComponent } from './components/admin/tickets-adm/tickets-adm.component';
import { TicketsCustomerComponent } from './components/customer/tickets-customer/tickets-customer.component';
import { TicketsConsultantComponent } from './components/consultant/tickets-consultant/tickets-consultant.component';
import { TicketNewAdmComponent } from './components/admin/ticket-new-adm/ticket-new-adm.component';
import { GeneralTicketPostComponent } from './components/shared/general-ticket-post/general-ticket-post.component';
import { ListCustomerAdmComponent } from './components/admin/list-customer-adm/list-customer-adm.component';
import { NewCustomerAdmComponent } from './components/admin/new-customer-adm/new-customer-adm.component';
import { NewConsultantAdmComponent } from './components/admin/new-consultant-adm/new-consultant-adm.component';
import { ListConsultantAdmComponent } from './components/admin/list-consultant-adm/list-consultant-adm.component';
import { TicketNewCustomerComponent } from './components/customer/ticket-new-customer/ticket-new-customer.component';
import { ConfCustomerComponent } from './components/customer/conf-customer/conf-customer.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // Rutas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'tickets-adm',
    component: TicketsAdmComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  {
    path: 'tickets-customer',
    component: TicketsCustomerComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'customer' }
  },
  {
    path: 'tickets-consultant',
    component: TicketsConsultantComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'consultant' }
  },
  {
    path: 'tickets-adm-new',
    component: TicketNewAdmComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  { path: 'ticket-posts/:id', component: GeneralTicketPostComponent },
  {
    path: 'list-customers-adm',
    component: ListCustomerAdmComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  {
    path: 'new-customers-adm/:id',
    component: NewCustomerAdmComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  {
    path: 'list-consultants-adm',
    component: ListConsultantAdmComponent,

    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  {
    path: 'new-consultants-adm/:id',
    component: NewConsultantAdmComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'company' }
  },
  {
    path: 'ticket-new-customer',
    component: TicketNewCustomerComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'customer' }
  },
  {
    path: 'conf-customer',
    component: ConfCustomerComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'customer' }
  },
  {
    path: 'conf-consultant',
    component: ConfConsultantComponent,
    canActivate: [AuthGuardService],
    data: { rol: 'consultant' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
