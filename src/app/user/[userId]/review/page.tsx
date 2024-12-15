"use client";

import { postReview } from "@/api/postReview";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEventTicket } from "@/context/EventTicketContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const EventReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { eventTicketId } = useEventTicket();
  const { userId } = useUser();
  const router = useRouter();

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleOnClick = async () => {
    const status = await postReview({
      userId: Number(userId),
      eventTicketId: Number(eventTicketId),
      rating: rating,
      description: review,
    });
    if (status === 200) {
      const confirmed = window.confirm("Review submitted successfully!");
      if (confirmed) {
        router.push(`/user/${userId}/tickets`);
      }
    } else {
      window.confirm("Review submission failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow flex justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-xl mx-auto w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Event Review
          </h2>

          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className="cursor-pointer"
                onClick={() => handleStarClick(star)}
              >
                {star <= rating ? (
                  <FaStar className="text-yellow-500 text-3xl" />
                ) : (
                  <FaRegStar className="text-gray-400 text-3xl" />
                )}
              </div>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            rows={4}
            className="w-full p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleOnClick}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              disabled={!review || rating === 0}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventReview;
