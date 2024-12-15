import { GetTotalUserPointsResponse } from "@/types/points";
import axios from "axios";

export const getTotalUserPoints = async (userId: number): Promise<number> => {
  try {
    const response = await axios.get<GetTotalUserPointsResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}/points/total`
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      console.error(`Error: ${response.data.message}`);
      return 0;
    }
  } catch (error) {
    console.error("Error checking user points:", error);
    return 0;
  }
};
