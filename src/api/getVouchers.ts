import axios from "axios";
import { Voucher, VoucherResponse } from "@/types/voucher";

export const getVouchersByEventId = async (
  eventId: number
): Promise<VoucherResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/voucher/event/${eventId}`
  );
  return response.data;
};

export const getVouchersById = async (voucherId: number): Promise<Voucher> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/voucher/${voucherId}`
  );
  return response.data.data;
};
