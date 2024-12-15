"use client";

import React from "react";
import { getUserVouchers } from "@/api/getUserVoucher";
import { useUserVoucher } from "@/context/UserVoucherContext";
import { useUser } from "@/context/UserContext";
import { UserVoucher, Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

const UserVoucherSelection: React.FC = () => {
  const { userId } = useUser();
  const { selectedUserVoucher, setSelectedUserVoucher } = useUserVoucher();

  const {
    data: userVoucherResponse,
    error: userVoucherError,
    isLoading: userVoucherLoading,
  } = useQuery<UserVoucher[], Error>({
    queryKey: ["userVoucher", userId],
    queryFn: () => {
      if (userId !== null) {
        return getUserVouchers(userId);
      }
      return Promise.reject("User ID is not available");
    },
    enabled: userId !== null,
  });

  if (userVoucherLoading) return <div>Loading vouchers...</div>;
  if (userVoucherError)
    return <div>Error loading vouchers: {userVoucherError.message}</div>;
  if (!userVoucherResponse) return <div>No vouchers available.</div>;

  return (
    <div className="mb-4">
      <h2 className="font-bold text-gray-700 mb-2">Available Vouchers</h2>
      <ul className="list-disc ml-5">
        {userVoucherResponse.map((userVoucher) => (
          <li key={userVoucher.voucherId} className="mb-2">
            <button
              onClick={() => setSelectedUserVoucher(userVoucher)}
              className={`py-1 px-4 rounded ${selectedUserVoucher?.voucherId === userVoucher.voucherId ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {userVoucher.voucherName} - Code: {userVoucher.voucherCode}
            </button>
            <p>{userVoucher.voucherDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserVoucherSelection;
