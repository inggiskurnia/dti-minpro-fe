export interface Transaction {
  transactionId: number;
  invoiceNumber: string;
  userId: number;
  eventTicketId: number;
  eventTicketName: string;
  totalTicket: number;
  originalAmount: number;
  voucherDeduction: number;
  pointsDeduction: number;
  totalAmount: number;
  createdAt: string;
}

export interface TransactionResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: Transaction[];
}
