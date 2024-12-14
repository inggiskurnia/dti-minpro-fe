import axios from "axios";

interface ClaimVoucherParams {
  voucherId: number;
  userId: number;
}

export const claimVoucher = async ({
  voucherId,
  userId,
}: ClaimVoucherParams): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/voucher`,
      {
        userId: userId,
        voucherId: voucherId,
      }
    );

    console.log("Voucher claimed successfully", response.data);
    return true;
  } catch (error) {
    console.error("Error claiming voucher:", error);
    return false;
  }
};
