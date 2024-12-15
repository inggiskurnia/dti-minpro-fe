"use client";

import React, { useEffect, useState } from "react";
import { useTransaction } from "@/context/TransactionContext";
import { useUserVoucher } from "@/context/UserVoucherContext";
import UserVoucherSelection from "@/components/Voucher/UserVoucherSelection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { getVouchersById } from "@/api/getVouchers";
import { Voucher } from "@/types/voucher";
import { getTotalUserPoints } from "@/api/getUserPoints";
import { createTransaction } from "@/api/createTransaction";
import { useRouter } from "next/navigation";

const Transaction: React.FC = () => {
  const { userId } = useUser();
  const { ticketId, ticketName, quantity, originalPrice } = useTransaction();
  const { selectedUserVoucher } = useUserVoucher();
  const [voucherDeduction, setVoucherDeduction] = useState(0);
  const [voucherDetail, setVoucherDetail] = useState<Voucher | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsInput, setPointsInput] = useState(0);
  const [pointsDeduction, setPointsDeduction] = useState(0);
  const [pointsError, setPointsError] = useState("");

  const router = useRouter();

  const getVoucherDetail = async (voucherId: number) => {
    try {
      const voucher = await getVouchersById(voucherId);
      return voucher;
    } catch (error) {
      console.error("Error fetching voucher details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchVoucherDetail = async () => {
      if (selectedUserVoucher) {
        const voucher = await getVoucherDetail(selectedUserVoucher.voucherId);
        setVoucherDetail(voucher);
      }
    };

    fetchVoucherDetail();
  }, [selectedUserVoucher]);

  const fetchTotalPoints = async () => {
    if (userId) {
      const totalPoints = await getTotalUserPoints(userId);
      setUserPoints(totalPoints);
    }
  };

  useEffect(() => {
    if (voucherDetail) {
      const deduction = voucherDetail.amount;
      setVoucherDeduction(deduction);
    }
  }, [voucherDetail, originalPrice]);

  const handlePointsCheck = () => {
    fetchTotalPoints();
    if (pointsInput > userPoints) {
      setPointsError("Insufficient points.");
    } else {
      setPointsError("");
      setPointsDeduction(pointsInput);
    }
  };

  const handlePurchase = async () => {
    if (userId === null || ticketId === null) {
      console.error("User ID or Ticket ID is null.");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to complete this purchase?"
    );
    if (!confirmed) {
      return;
    }
    const transactionData = {
      userId: userId,
      eventTicketId: ticketId,
      totalTicket: quantity,
      originalAmount: originalPrice,
      userVoucherId: selectedUserVoucher?.userVoucherId,
      voucherId: selectedUserVoucher?.voucherId,
      voucherDeduction: voucherDeduction,
      pointsDeduction: pointsDeduction,
      totalAmount: originalPrice - voucherDeduction - pointsDeduction,
    };
    try {
      console.log(transactionData);
      const response = await createTransaction(transactionData);

      if (response.success) {
        const confirmed = window.confirm("Transaction successful !");
        if (!confirmed) {
          router.push(`/user/${userId}/transactions`);
          return;
        }
      }
    } catch (error) {
      window.Error("Error completing transaction");
    }
  };

  if (!ticketId) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex justify-center mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg w-full max-w-2xl p-8">
          <h1 className="text-2xl text-center font-bold mb-4 text-gray-700">
            Transaction Details
          </h1>
          <hr className="mb-4" />
          <p className="text-gray-600 mb-4">Event Ticket: {ticketName}</p>
          <p className="text-gray-600 mb-4">Total Tickets: {quantity}</p>
          <p className="text-gray-600 mb-4">
            Original Amount: RP.{originalPrice.toFixed(2)}
          </p>
          <UserVoucherSelection />
          <p className="text-gray-600 mb-4">
            Voucher Deduction: RP.{voucherDeduction.toFixed(2)}
          </p>
          <p className="text-gray-600 text-sm font-bold">
            Current Points: {userPoints}
          </p>

          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-grow">
              <label className="block text-gray-700 text-sm mb-2">
                Enter Points:
              </label>
              <input
                type="number"
                value={isNaN(pointsInput) ? "" : pointsInput}
                onChange={(e) => setPointsInput(parseInt(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              onClick={handlePointsCheck}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 sm:mt-0"
            >
              Use Points
            </button>
          </div>
          {pointsError && (
            <p className="text-red-500 text-xs italic">{pointsError}</p>
          )}
          <p className="text-gray-600 mb-4">
            Points Deduction: RP.{pointsDeduction.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">
            Total Amount: RP.
            {originalPrice - voucherDeduction - pointsDeduction}
          </p>
          <div className="flex justify-center mt-10">
            <button
              onClick={handlePurchase}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Complete Purchase
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;
