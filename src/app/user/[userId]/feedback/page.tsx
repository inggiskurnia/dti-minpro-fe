"use client";

import { useState } from "react";

const EventFeedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Event Feedback</h2>

      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Provide your feedback here..."
        rows={6}
        className="w-full p-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-4 flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          disabled={!feedback}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default EventFeedback;
