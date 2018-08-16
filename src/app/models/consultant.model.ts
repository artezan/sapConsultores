import { TicketModel } from './ticket.model';

export interface ConsultantModel {
  name?: string;
  lastName?: string;
  tickets?: TicketModel[];
  rankingAverage?: number;
  password?: string;
  timestamp?: string;
  description?: string;
  companyId?: string;
  _id?: string;
  id?: string;
}
