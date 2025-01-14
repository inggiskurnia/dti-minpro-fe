import React, { useEffect, useState } from "react";
import { Voucher } from "@/types/voucher";
import { FaGift } from "react-icons/fa";
import { getUserVoucherByVoucherId } from "@/api/getUserVoucher";
import { claimVoucher } from "@/api/claimVoucher";
import { useUser } from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface VoucherItemProps {
  voucher: Voucher;
}

const VoucherItem: React.FC<VoucherItemProps> = ({ voucher }) => {
  const { data: session } = useSession();
  const userId = Number(session?.user.id);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const fetchUserVoucher = async () => {
      try {
        if (userId && voucher) {
          const response = await getUserVoucherByVoucherId({
            userId: userId,
            voucherId: voucher.voucherId,
          });
          if (response.success) {
            setClaimed(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserVoucher();
  }, [claimed]);

  const handleClaim = async () => {
    if (session == null) {
      redirect("/login");
    }
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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col sm:flex-row items-center sm:items-start">
      <FaGift className="text-green-600 mr-4 mb-4 sm:mb-0" size={40} />
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-gray-800 sm:items-center">
          {voucher.name}
        </h2>
        <p className="text-gray-600">{voucher.description}</p>
      </div>
      <button
        onClick={handleClaim}
        className={`font-bold py-2 my-2 px-4 rounded ${claimed ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        disabled={claimed}
      >
        {claimed ? "Claimed" : "Claim"}
      </button>
    </div>
  );
};

export default VoucherItem;
