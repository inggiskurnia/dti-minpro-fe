import {
  GetUserVouchersResponse,
  UserVoucher,
  VoucherClaimResponse,
} from "@/types/voucher";
import axios from "axios";

export const getUserVouchers = async (
  userId: number
): Promise<UserVoucher[]> => {
  const response = await axios.get<GetUserVouchersResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}/voucher`
  );
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message);
};

interface CheckVoucherClaimParams {
  userId: number;
  voucherId: number;
}

export const checkVoucherClaim = async ({
  userId,
  voucherId,
}: CheckVoucherClaimParams): Promise<boolean> => {
  try {
    const response = await axios.get<VoucherClaimResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}/voucher`
    );

    if (response.data.success) {
      const claimedVouchers = response.data.data;
      return claimedVouchers.some((voucher) => voucher.voucherId === voucherId);
    } else {
      console.error(`Error: ${response.data.message}`);
      return false;
    }
  } catch (error) {
    console.error("Error checking voucher claim status:", error);
    return false;
  }
};
