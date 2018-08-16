import { TicketModel } from './ticket.model';

export interface CustomerModel {
  timestamp?: string;
  logo?: string;
  name?: any;
  adress?: string;
  tickets?: TicketModel[];
  totalHours?: number;
  phone?: number;
  password?: string;
  email?: string;
  workArea?: string;
  companyId?: string;
  _id?: string;
  id?: string;
}
