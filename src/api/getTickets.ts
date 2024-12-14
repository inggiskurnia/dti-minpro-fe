import { TicketResponse } from "@/types/ticket";

const getTickets = async (eventId: number): Promise<TicketResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/${eventId}/ticket`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }
  return response.json();
};

export default getTickets;
