import axios from "axios";
import { API_URL } from "../constants/url";

// Define the payload structure for registration
export interface RegisterUserPayload {
  fullName: string;
  email: string;
  birthdate: string; // This will be formatted as an OffsetDateTime
  password: string;
  referrerCode?: string; // Optional referrer code field
}

// Define the structure of the API response
export interface RegisterUserResponse {
  success: boolean;
  message: string;
}

// Function to register a user
const registerUser = async (
  payload: RegisterUserPayload
): Promise<RegisterUserResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not configured.");
  }

  // Format the birthdate to include time and timezone (OffsetDateTime)
  const formattedBirthdate = new Date(payload.birthdate).toISOString(); // ISO 8601 format

  // Create a new payload with the formatted birthdate
  const formattedPayload = {
    ...payload,
    birthdate: formattedBirthdate, // Replace birthdate with the formatted one
  };

  // If the referrer code is provided, include it in the payload
  if (payload.referrerCode) {
    formattedPayload.referrerCode = payload.referrerCode;
  }

  const response = await axios.post<RegisterUserResponse>(
    `${backendUrl}${API_URL.user.register}`,
    formattedPayload
  );

  return response.data;
};

export default registerUser;
