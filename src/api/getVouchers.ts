import axios from "axios";
import { VoucherResponse } from "@/types/voucher";

const getVouchers = async (eventId: number): Promise<VoucherResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/voucher/event/${eventId}`
  );
  return response.data;
};

export { getVouchers };
