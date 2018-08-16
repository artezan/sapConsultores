import { CustomerModel } from './customer.model';
import { ConsultantModel } from './consultant.model';
import { TicketModel } from './ticket.model';

export interface PostModel {
  timestamp?: string;
  title?: string;
  content?: string;
  ticket?: TicketModel;
  customer?: CustomerModel;
  consultant?: ConsultantModel;
  isByCustomer?: boolean;
}
