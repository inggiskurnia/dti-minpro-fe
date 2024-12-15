import axios from "axios";

interface UserTicket {
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

interface UserTicketResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: UserTicket[];
}

export const getUserTicket = async (userId: number): Promise<UserTicket[]> => {
  try {
    const response = await axios.get<UserTicketResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}/ticket`
    );

    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch tickets"
      );
    } else {
      throw new Error(
        error.message || "An unexpected error occurred while fetching tickets"
      );
    }
  }
};
