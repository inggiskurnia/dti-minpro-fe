import axios from "axios";

interface ReviewParams {
  userId: number;
  eventTicketId: number;
  rating: number;
  description: string;
}

export const postReview = async ({
  userId,
  eventTicketId,
  rating,
  description,
}: ReviewParams): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/ticket/${eventTicketId}/review/user/${userId}`,
      { rating: rating, description: description }
    );
    console.log(eventTicketId, userId);
    return response.status;
  } catch (error) {
    console.log(" Error post feedback", error);
    return false;
  }
};
