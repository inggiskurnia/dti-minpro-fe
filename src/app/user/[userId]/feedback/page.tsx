"use client";

import { postFeedback } from "@/api/postFeedback";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEventTicket } from "@/context/EventTicketContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EventFeedback = () => {
  const { userId } = useUser();
  const [feedback, setFeedback] = useState("");
  const { eventTicketId } = useEventTicket();
  const router = useRouter();

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleOnClick = async () => {
    const status = await postFeedback({
      userId: Number(userId),
      eventTicketId: Number(eventTicketId),
      feedback: feedback,
    });
    if (status === 200) {
      const confirmed = window.confirm("Write feedback successful!");
      if (confirmed) {
        router.push(`/user/${userId}/tickets`);
      }
    } else {
      window.confirm("Write feedback failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
            Event Feedback
          </h2>

          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Provide your feedback here..."
            rows={6}
            className="w-full p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleOnClick}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none disabled:opacity-50"
              disabled={!feedback}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventFeedback;
