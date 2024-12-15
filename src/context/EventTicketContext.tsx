"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventTicketContextType {
  eventTicketId: number | null;
  setEventTicketId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EventTicketContext = createContext<EventTicketContextType | undefined>(
  undefined
);

interface EventTicketProviderProps {
  children: ReactNode;
}

export const EventTicketProvider: React.FC<EventTicketProviderProps> = ({
  children,
}) => {
  const [eventTicketId, setEventTicketId] = useState<number | null>(null);

  return (
    <EventTicketContext.Provider value={{ eventTicketId, setEventTicketId }}>
      {children}
    </EventTicketContext.Provider>
  );
};

export const useEventTicket = () => {
  const context = useContext(EventTicketContext);
  if (!context) {
    throw new Error(
      "useEventTicket must be used within an EventTicketProvider"
    );
  }
  return context;
};
