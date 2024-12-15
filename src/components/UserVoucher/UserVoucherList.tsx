"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserVouchers } from "@/api/getUserVoucher";
import UserVoucher from "@/components/UserVoucher/UserVoucher";
import { useUser } from "@/context/UserContext";

const UserVoucherList: React.FC = () => {
  const { userId } = useUser();

  const {
    data: vouchers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userVouchers", userId],
    queryFn: () => getUserVouchers(Number(userId)),
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading vouchers...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!vouchers || vouchers.length === 0) {
    return <div>No vouchers found.</div>;
  }

  return (
    <div>
      <h1>Your Vouchers</h1>
      <div
        className={`grid gap-6 ${
          vouchers.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {vouchers.map((voucher) => (
          <UserVoucher key={voucher.userVoucherId} voucher={voucher} />
        ))}
      </div>
    </div>
  );
};

export default UserVoucherList;
