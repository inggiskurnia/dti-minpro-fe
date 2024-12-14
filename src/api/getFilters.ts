import axios from "axios";

export const getEventCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/category`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching event categories:", error);
    throw error;
  }
};

export const getCities = async (query: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/geo/city`,
      {
        params: { query },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
