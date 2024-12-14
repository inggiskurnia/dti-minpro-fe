"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TransactionContextType {
  ticketId: number | null;
  setTicketId: React.Dispatch<React.SetStateAction<number | null>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  originalPrice: number;
  setOriginalPrice: React.Dispatch<React.SetStateAction<number>>;
  ticketName: string | null;
  setTicketName: React.Dispatch<React.SetStateAction<string | null>>;
  ticketDescription: string | null;
  setTicketDescription: React.Dispatch<React.SetStateAction<string | null>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [ticketName, setTicketName] = useState<string | null>(null);
  const [ticketDescription, setTicketDescription] = useState<string | null>(
    null
  );

  return (
    <TransactionContext.Provider
      value={{
        ticketId,
        setTicketId,
        quantity,
        setQuantity,
        originalPrice,
        setOriginalPrice,
        ticketName,
        setTicketName,
        ticketDescription,
        setTicketDescription,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
