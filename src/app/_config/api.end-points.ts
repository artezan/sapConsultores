const ip = 'http://31.220.52.51:3000/';
const apiUrl = ip + 'api/v1/';

const company = 'companies/';
const ticketsByCompanyID = 'tickets/bycompanyid/';
const ticketsNew = 'tickets/newticket/';
const ticketsChange = 'tickets/changeticket/';
const ticketById = 'tickets/byticketid/';
const putTicket = 'tickets/';
const customerByCompanyId = 'customers/bycompanyid/';
const customer = 'customers/';
const uploadImg = 'uploadImg/';
const customerSession = 'bycustomerpassword/';
const customerByCustomerId = 'customers/bycustomerid/';
const consultantByCompanyId = 'consultants/bycompanyid/';
const customerByConsultantId = 'consultants/byconsultantid/';
const consultant = 'consultants/';
const consultantSession = 'byconsultantpassword/';
const post = 'posts/';
const postByTicketId = 'byticketid/';

export const END_POINT = {
  IP: ip,
  COMPANY: apiUrl + company,
  // tickets
  GET_TICKETS_BY_COMPANY_ID: apiUrl + ticketsByCompanyID,
  GET_TICKETS_BY_ID: apiUrl + ticketById,
  POST_TICKET_NEW: apiUrl + ticketsNew,
  POST_TICKET_CHANGE: apiUrl + ticketsChange,
  PUT_TICKET_UPDATE: apiUrl + putTicket,
  DELETE_TICKET: apiUrl + putTicket,
  // customer
  GET_CUSTOMER_BY_COMPANY_ID: apiUrl + customerByCompanyId,
  GET_CUSTOMER_BY_ID: apiUrl + customerByCustomerId,
  POST_CUSTOMER_NEW: apiUrl + customer,
  PUT_CUSTOMER: apiUrl + customer,
  DELETE_CUSTOMER: apiUrl + customer,
  GET_CUSTOMER_SESSION: apiUrl + customer + customerSession,
  POST_IMG_CUSTOMER: apiUrl + customer + uploadImg,
  // consultant
  GET_CONSULTANT_BY_COMPANY_ID: apiUrl + consultantByCompanyId,
  POST_CONSULTANT_NEW: apiUrl + consultant,
  PUT_CONSULTANT: apiUrl + consultant,
  GET_CONSULTANT_BY_ID: apiUrl + customerByConsultantId,
  DELETE_CONSULTANT: apiUrl + consultant,
  GET_CONSULTANT_SESSION: apiUrl + consultant + consultantSession,

  // post
  GET_POST_BY_TICKET_ID: apiUrl + post + postByTicketId,
  POST_NEW_POST: apiUrl + post
};
