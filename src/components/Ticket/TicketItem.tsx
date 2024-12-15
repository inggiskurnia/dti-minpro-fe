import React, { useState } from "react";
import { Ticket } from "@/types/ticket";
import { FaTicketAlt } from "react-icons/fa";
import { redirect } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

interface TicketItemProps {
  ticket: Ticket;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  const [quantity, setQuantity] = useState(0);
  const {
    setTicketId,
    setQuantity: setTxQuantity,
    setOriginalPrice,
    setTicketName,
    setTicketDescription,
  } = useTransaction();

  const increaseQuantity = () => {
    if (quantity < ticket.totalAvailable) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleRedirect = () => {
    setTicketId(ticket.ticketId);
    setTxQuantity(quantity);
    setOriginalPrice(ticket.price);
    setTicketName(ticket.ticketName);
    setTicketDescription(ticket.description);

    redirect("/checkout");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      <FaTicketAlt className="text-blue-600 mr-4" size={40} />
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{ticket.ticketName}</h2>
        <p className="text-gray-600">{ticket.description}</p>
        <p className="text-gray-600">Price: RP.{ticket.price.toFixed(2)}</p>
        <p className="text-gray-600">Available: {ticket.totalAvailable}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={decreaseQuantity}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          +
        </button>
        <button
          onClick={handleRedirect}
          className={`ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${quantity === 0 ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={quantity === 0}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
