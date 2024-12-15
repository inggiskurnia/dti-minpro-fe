"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserTicket } from "@/api/getUserTicket";
import UserTicket from "@/components/UserTicket/UserTicket";
import { useUser } from "@/context/UserContext";

const UserTicketList: React.FC = () => {
  const { userId } = useUser();

  const {
    data: tickets,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userTickets", userId],
    queryFn: () => getUserTicket(Number(userId)),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading tickets...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!tickets || tickets.length === 0) {
    return <div>No tickets found.</div>;
  }

  return (
    <div>
      <h1>Your Tickets</h1>
      {tickets.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No tickets found.</div>
      ) : (
        <div
          className={`grid gap-6 ${
            tickets.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {tickets.map((ticket) => (
            <UserTicket key={ticket.userTicketId} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTicketList;
