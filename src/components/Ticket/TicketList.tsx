import React from "react";
import { Ticket } from "@/types/ticket";
import TicketItem from "./TicketItem";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="px-14">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.ticketId} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
