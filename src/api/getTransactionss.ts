import { TransactionResponse } from "@/types/transaction";

const getUserTransactions = async (
  userId: number
): Promise<TransactionResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/user/${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
};

export default getUserTransactions;
