"use client";

import React from "react";
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div
        className={`grid gap-6 ${
          tickets.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {tickets.map((ticket) => (
          <UserTicket key={ticket.userTicketId} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default UserTicketList;
