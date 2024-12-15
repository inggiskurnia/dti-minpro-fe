"use client";

import { TransactionResponse } from "@/types/transaction";
import TransactionCard from "@/components/Transaction/TransactionCard";
import getUserTransactions from "@/api/getTransactionss";
import { useUser } from "@/context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const TransactionList: React.FC = () => {
  const { userId } = useParams();

  const {
    data: transactionResponse,
    error: transactionError,
    isLoading: transactionLoading,
  } = useQuery<TransactionResponse, Error>({
    queryKey: ["transaction", userId],
    queryFn: () => getUserTransactions(Number(userId)),
    enabled: !!userId,
  });

  if (transactionLoading) return <div>Loading transactions...</div>;
  if (transactionError) return <div>{transactionError.message}</div>;

  return (
    <>
      <div>
        <h1>Your Tickets</h1>
        {transactionResponse?.data.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No tickets found.
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              transactionResponse?.data.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {transactionResponse?.data.map((transaction) => (
              <TransactionCard
                key={transaction.transactionId}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionList;
