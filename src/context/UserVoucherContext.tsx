"use client";

import { UserVoucher, Voucher } from "@/types/voucher";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserVoucherContextType {
  selectedUserVoucher: UserVoucher | null;
  setSelectedUserVoucher: React.Dispatch<
    React.SetStateAction<UserVoucher | null>
  >;
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
  const [selectedUserVoucher, setSelectedUserVoucher] =
    useState<UserVoucher | null>(null);
  return (
    <UserVoucherContext.Provider
      value={{
        selectedUserVoucher: selectedUserVoucher,
        setSelectedUserVoucher: setSelectedUserVoucher,
      }}
    >
      {children}
    </UserVoucherContext.Provider>
  );
};

export const useUserVoucher = () => {
  const context = useContext(UserVoucherContext);
  if (!context) {
    throw new Error("useUserVoucher must be used within a UserVoucherProvider");
  }
  return context;
};
