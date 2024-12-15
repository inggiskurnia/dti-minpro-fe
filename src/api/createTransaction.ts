import axios from "axios";

interface TransactionData {
  userId: number;
  eventTicketId: number;
  totalTicket: number;
  originalAmount: number;
  voucherDeduction: number;
  pointsDeduction: number;
  totalAmount: number;
}

export const createTransaction = async (transactionData: TransactionData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};
