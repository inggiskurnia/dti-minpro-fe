import React, { useEffect, useState } from "react";
import { Voucher } from "@/types/voucher";
import { FaGift } from "react-icons/fa";
import { useEvent } from "@/context/EventContext";
import { checkVoucherClaim } from "@/api/getUserVoucher";
import { claimVoucher } from "@/api/claimVoucher";
import { useUser } from "@/context/UserContext";

interface VoucherItemProps {
  voucher: Voucher;
}

const VoucherItem: React.FC<VoucherItemProps> = ({ voucher }) => {
  const { userId } = useUser();
  const { eventId } = useEvent();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    if (claimed) return;
    console.log(userId);

    if (userId && voucher.voucherId) {
      const success = await claimVoucher({
        userId: userId,
        voucherId: voucher.voucherId,
      });
      if (success) {
        setClaimed(true);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
      <FaGift className="text-green-600 mr-4" size={40} />
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800">{voucher.name}</h2>
        <p className="text-gray-600">{voucher.description}</p>
        {/* <p className="text-gray-600">Code: {voucher.code}</p> */}
        {/* <p className="text-gray-600">Amount: ${voucher.amount.toFixed(2)}</p> */}
        {/* <p className="text-gray-600">
          Available: {voucher.totalAvailable}/{voucher.totalCapacity}
        </p> */}
        {/* <p className="text-gray-600">Validity: {voucher.validityPeriod}</p> */}
      </div>
      <button
        onClick={handleClaim}
        className={`font-bold py-2 px-4 rounded ${claimed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        disabled={claimed}
      >
        {claimed ? "Claimed" : "Claim"}
      </button>
    </div>
  );
};

export default VoucherItem;
