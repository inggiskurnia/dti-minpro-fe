import axios from "axios";
import { API_URL } from "../constants/url";

// Define the payload structure for registering an event organizer
export interface RegisterOrganizerPayload {
  userId: number;
  name: string;
  cityId: number;
  description: string;
  profilePictureLink: string;
}

// Define the structure of the API response
export interface RegisterOrganizerResponse {
  success: boolean;
  message: string;
}

// Function to get the session token from cookies (only runs on client-side)
function getSessionToken() {
  if (typeof window !== "undefined") {
    console.log("document.cookie:", document.cookie); // Log all cookies to check availability

    // Match the session token from the cookie
    const match = document.cookie.match(
      /(^|;) ?authjs\.session-token=([^;]*)(;|$)/
    );

    if (match) {
      console.log("Session token found:", match[2]); // Log the token if it's found
      return decodeURIComponent(match[2]);
    } else {
      console.log("authjs.session-token not found in cookies.");
    }
  } else {
    console.log("Not in browser environment (server-side).");
  }

  return null; // Return null if no token is found or if it's server-side
}

// Function to register an event organizer
const registerOrganizer = async (
  payload: RegisterOrganizerPayload
): Promise<RegisterOrganizerResponse> => {
  // Get the session token
  const token = getSessionToken();
  console.log("Token retrieved:", token); // Log the retrieved token

  // Check if backend URL is set in environment variables
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("Backend URL is not configured.");
  }

  // If token is not found, throw an error
  if (!token) {
    throw new Error("Authorization token not found. Please log in again.");
  }

  // Try to send the request to register the organizer
  try {
    const response = await axios.post<RegisterOrganizerResponse>(
      `${backendUrl}${API_URL.user.organizer}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response data:", response.data); // Log the response data
    return response.data;
  } catch (error) {
    console.error("Error while registering organizer:", error);
    throw new Error(`Failed to register organizer`);
  }
};

export default registerOrganizer;
