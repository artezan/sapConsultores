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

const routes: Routes = [
  // Rutas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tickets-adm', component: TicketsAdmComponent },
  { path: 'tickets-customer', component: TicketsCustomerComponent },
  { path: 'tickets-consultant', component: TicketsConsultantComponent },
  { path: 'tickets-adm-new', component: TicketNewAdmComponent },
  { path: 'ticket-posts/:id', component: GeneralTicketPostComponent },
  { path: 'list-customers-adm', component: ListCustomerAdmComponent },
  { path: 'new-customers-adm/:id', component: NewCustomerAdmComponent },
  { path: 'list-consultants-adm', component: ListConsultantAdmComponent },
  { path: 'new-consultants-adm/:id', component: NewConsultantAdmComponent },
  { path: 'ticket-new-customer', component: TicketNewCustomerComponent },
  { path: 'conf-customer', component: ConfCustomerComponent },
  { path: 'conf-consultant', component: ConfConsultantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
