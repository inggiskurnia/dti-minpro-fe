import React from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

export interface UserVoucher {
  userVoucherId: number;
  voucherId: number;
  voucherCode: string;
  voucherName: string;
  voucherAmount: number;
  voucherDescription: string;
  voucherType: string;
  expiredAt: Date;
}

interface UserVoucherProps {
  voucher: UserVoucher;
}

const UserVoucher: React.FC<UserVoucherProps> = ({ voucher }) => {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <div
      key={voucher.userVoucherId}
      className="bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2 flex items-center">
        <FaTag className="text-blue-500 mr-2" />
        {voucher.voucherName}
      </h2>
      <p className="text-gray-700 mb-2">{voucher.voucherDescription}</p>
      <p className="text-gray-600 mb-2 font-semibold">
        Amount: ${voucher.voucherAmount.toFixed(2)}
      </p>
      <div className="text-gray-600 mb-4">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-2 text-green-500" />
          Expires on:{" "}
          <span className="ml-1">{formatDate(voucher.expiredAt)}</span>
        </p>
      </div>
      <p className="text-gray-600">
        Voucher Code:{" "}
        <span className="font-semibold">{voucher.voucherCode}</span>
      </p>
    </div>
  );
};

export default UserVoucher;
