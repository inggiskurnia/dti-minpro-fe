import axios from "axios";
import { ApiResponse } from "@/types/response";

interface EventSearch {
  eventId: number;
  organizerId: number;
  organizer: string;
  organizerProfile: string;
  name: string;
  thumbnail: string;
  startingPrice: number;
  startedAt: string;
}

interface Event {
  eventId: number;
  eventName: string;
}

interface PaginationInfo<T> {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  content: T[];
  lastPage: boolean;
  firstPage: boolean;
}

export const getEvents = async (
  limit: number,
  page: number,
  eventCategoryId?: number,
  cityId?: number
): Promise<PaginationInfo<EventSearch>> => {
  const response = await axios.get<ApiResponse<PaginationInfo<EventSearch>>>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,
    {
      params: {
        limit,
        page,
        eventCategoryId,
        cityId,
      },
    }
  );
  return response.data.data;
};

export const getEventsByName = async (query: string): Promise<Event[]> => {
  try {
    const response = await axios.get<ApiResponse<Event[]>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/search-by-name`,
      {
        params: {
          query,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events by name:", error);
    return [];
  }
};

export interface GetEventResponseDTO {
  eventId: number;
  organizerName: string;
  organizerProfilePicture: string;
  name: string;
  description: string;
  thumbnail: string;
  eventCategoryName: string;
  cityName: string;
  locationDetail: string;
  longitude: number;
  latitude: number;
  startedAt: string;
  endedAt: string;
  startingPrice: number;
  totalCapacity: number;
  totalAvailable: number;
}

export const getEventById = async (
  id: number
): Promise<GetEventResponseDTO> => {
  try {
    const response = await axios.get<ApiResponse<GetEventResponseDTO>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};
