export type Ticket = {
  ticketId: number;
  ticketName: string;
  price: number;
  totalAvailable: number;
  description: string;
};

export type TicketResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: Ticket[];
};
