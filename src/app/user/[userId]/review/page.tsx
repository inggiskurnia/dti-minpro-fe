"use client";

import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const EventReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Event Review</h2>

      <div className="flex items-center mb-4">
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
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          disabled={!review || rating === 0}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default EventReview;
