import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

interface Ticket {
  userId: number;
  ticketId: number;
  ticketName: string;
  ticketDescription: string;
  totalTicket: number;
  eventStartedAt: string;
  eventEndedAt: string;
  eventName: string;
  eventLocationDetail: string;
  purchasedAt: string;
}

interface UserTicketProps {
  ticket: Ticket;
}

const UserTicket: React.FC<UserTicketProps> = ({ ticket }) => {
  const { userId } = useUser();
  const router = useRouter();

  const handleFeedbackClick = () => {
    router.push(`/user/${userId}/feedback`);
  };

  const handleReviewClick = () => {
    router.push(`/user/${userId}/review`);
  };

  return (
    <div key={ticket.ticketId} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
        <FaTicketAlt className="text-blue-500 mr-2" />
        {ticket.ticketName}
      </h2>
      <p className="text-gray-700 mb-2">{ticket.ticketDescription}</p>
      <div className="text-gray-600 mb-4 space-y-2">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Event: <span className="ml-1 font-semibold">{ticket.eventName}</span>
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Starts:{" "}
          <span className="ml-1">
            {new Date(ticket.eventStartedAt).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Ends:{" "}
          <span className="ml-1">
            {new Date(ticket.eventEndedAt).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          Location:{" "}
          <span className="ml-1 font-semibold">
            {ticket.eventLocationDetail}
          </span>
        </p>
      </div>
      <p className="text-gray-600">
        Purchased on:{" "}
        <span className="font-semibold">
          {new Date(ticket.purchasedAt).toLocaleString()}
        </span>
      </p>
      <p className="text-gray-600">
        Total Tickets:{" "}
        <span className="font-semibold">{ticket.totalTicket}</span>
      </p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleFeedbackClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Write Feedback
        </button>
        <button
          onClick={handleReviewClick}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Write Review
        </button>
      </div>
    </div>
  );
};

export default UserTicket;
