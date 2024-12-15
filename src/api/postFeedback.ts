import axios from "axios";

interface FeedbackParams {
  userId: number;
  eventTicketId: number;
  feedback: string;
}

export const postFeedback = async ({
  userId,
  eventTicketId,
  feedback,
}: FeedbackParams): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/ticket/${eventTicketId}/feedback/user/${userId}`,
      { feedback: feedback }
    );
    return response.status;
  } catch (error) {
    console.log(" Error post feedback", error);
    return false;
  }
};
