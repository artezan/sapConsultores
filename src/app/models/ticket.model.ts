import { CustomerModel } from './customer.model';
import { ConsultantModel } from './consultant.model';

export interface TicketModel {
  hours?: number;
  description?: string;
  customer?: CustomerModel;
  ranking?: number;
  consultant?: ConsultantModel;
  timestamp?: Date;
  status?: string;
  companyId?: string;
  cost?: number;
  isPay?: boolean;
  _id?: string;
  customerId?: string;
  consultantId?: string;
}
