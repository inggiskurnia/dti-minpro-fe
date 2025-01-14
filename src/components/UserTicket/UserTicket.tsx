import { useEventTicket } from "@/context/EventTicketContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const router = useRouter();
  const { setEventTicketId } = useEventTicket();
  const [enableFeedbackReview, setEnableFeedbackReview] =
    useState<boolean>(false);

  useEffect(() => {
    if (new Date(ticket.eventStartedAt) < new Date()) {
      setEnableFeedbackReview(true);
    }
    setEventTicketId(ticket.eventTicketId);
  }, [ticket]);

  const handleFeedbackClick = () => {
    if (enableFeedbackReview) {
      router.push(`/event/feedback`);
    }
  };

  const handleReviewClick = () => {
    if (enableFeedbackReview) {
      router.push(`/event/review`);
    }
  };

  return (
    <div
      key={ticket.userTicketId}
      className="bg-white shadow-xl rounded-lg p-8 space-y-4 mb-4 lg:mb-0 flex-col "
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
        <FaTicketAlt className="text-blue-500 mr-2" />
        {ticket.eventTicketName}
      </h2>
      <p className="text-gray-700 mb-2">{ticket.eventTicketDescription}</p>
      <div className="text-gray-600 mb-4 lg:mb-0 lg:ml-6 space-y-3 lg:space-y-0 lg:space-x-3 lg:flex lg:flex-wrap">
        <p className="flex items-center lg:w-1/2">
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
        <p className="flex items-center">
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
          className="bg-blue-500 px-4 py-2  text-white rounded-lg disabled:opacity-50"
          disabled={!enableFeedbackReview}
        >
          Write Feedback
        </button>
        <button
          onClick={handleReviewClick}
          className="bg-green-500 px-4 py-2  text-white rounded-lg disabled:opacity-50"
          disabled={!enableFeedbackReview}
        >
          Write Review
        </button>
      </div>
    </div>
  );
};

export default UserTicket;
