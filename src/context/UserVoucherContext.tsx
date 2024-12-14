"use client";

import { UserVoucher, Voucher } from "@/types/voucher";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserVoucherContextType {
  selectedVoucher: UserVoucher | null;
  setSelectedVoucher: React.Dispatch<React.SetStateAction<UserVoucher | null>>;
}

const UserVoucherContext = createContext<UserVoucherContextType | undefined>(
  undefined
);

interface UserVoucherProviderProps {
  children: ReactNode;
}

export const UserVoucherProvider: React.FC<UserVoucherProviderProps> = ({
  children,
}) => {
  const [selectedVoucher, setSelectedVoucher] = useState<UserVoucher | null>(
    null
  );

  return (
    <UserVoucherContext.Provider
      value={{ selectedVoucher, setSelectedVoucher }}
    >
      {children}
    </UserVoucherContext.Provider>
  );
};

export const useUserVoucher = () => {
  const context = useContext(UserVoucherContext);
  if (!context) {
    throw new Error("useVoucher must be used within a VoucherProvider");
  }
  return context;
};
