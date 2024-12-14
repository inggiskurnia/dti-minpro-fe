"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface EventContextType {
  eventId: number | null;
  setEventId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [eventId, setEventId] = useState<number | null>(null);

  return (
    <EventContext.Provider value={{ eventId, setEventId }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
