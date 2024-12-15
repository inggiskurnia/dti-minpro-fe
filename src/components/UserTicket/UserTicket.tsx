import { useEventTicket } from "@/context/EventTicketContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";

export interface UserTicket {
  userTicketId: number;
  userId: number;
  eventTicketId: number;
  eventTicketName: string;
  eventTicketDescription: string;
  totalTicket: number;
  eventId: number;
  eventStartedAt: Date;
  eventEndedAt: Date;
  eventName: string;
  eventLocationDetail: string;
  purchasedAt: Date;
}

interface UserTicketProps {
  ticket: UserTicket;
}

const UserTicket: React.FC<UserTicketProps> = ({ ticket }) => {
  const { userId } = useUser();
  const router = useRouter();
  const { setEventTicketId } = useEventTicket();

  useEffect(() => {
    setEventTicketId(ticket.eventTicketId);
  }, [ticket.eventTicketId]);

  const handleFeedbackClick = () => {
    router.push(`/user/${userId}/feedback`);
  };

  const handleReviewClick = () => {
    router.push(`/user/${userId}/review`);
  };

  return (
    <div
      key={ticket.userTicketId}
      className="bg-white shadow-xl rounded-lg p-6 mb-4 lg:mb-0 flex flex-col lg:flex-row lg:items-center"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
        <FaTicketAlt className="text-blue-500 mr-2" />
        {ticket.eventTicketName}
      </h2>
      <p className="text-gray-700 mb-2">{ticket.eventTicketDescription}</p>
      <div className="text-gray-600 mb-4 lg:mb-0 lg:ml-6 space-y-2 lg:space-y-0 lg:space-x-2 lg:flex lg:flex-wrap">
        <p className="flex items-center lg:w-1/2">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Event: <span className="ml-1 font-semibold">{ticket.eventName}</span>
        </p>
        <p className="flex items-center lg:w-1/2">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Starts:{" "}
          <span className="ml-1">
            {new Date(ticket.eventStartedAt).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center lg:w-1/2">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Ends:{" "}
          <span className="ml-1">
            {new Date(ticket.eventEndedAt).toLocaleString()}
          </span>
        </p>
        <p className="flex items-center lg:w-1/2">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          Location:{" "}
          <span className="ml-1 font-semibold">
            {ticket.eventLocationDetail}
          </span>
        </p>
      </div>
      <p className="text-gray-600 lg:ml-6">
        Purchased on:{" "}
        <span className="font-semibold">
          {new Date(ticket.purchasedAt).toLocaleString()}
        </span>
      </p>
      <p className="text-gray-600 lg:ml-6">
        Total Tickets:{" "}
        <span className="font-semibold">{ticket.totalTicket}</span>
      </p>

      <div className="mt-4 lg:mt-0 lg:ml-auto flex gap-4">
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
