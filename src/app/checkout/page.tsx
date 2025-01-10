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
import priceFormatter from "@/utils/common/priceFormatter";

const Transaction: React.FC = () => {
  const { userId } = useUser();
  const { ticketId, ticketName, quantity, originalPrice } = useTransaction();
  const { selectedUserVoucher } = useUserVoucher();
  const [voucherDeduction, setVoucherDeduction] = useState<number>(0);
  const [voucherDetail, setVoucherDetail] = useState<Voucher | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [pointsInput, setPointsInput] = useState<number>(0);
  const [pointsInputFormatted, setPointsInputFormatted] = useState<string>("");
  const [pointsDeduction, setPointsDeduction] = useState<number>(0);
  const [pointsError, setPointsError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchVoucherDetail = async () => {
      try {
        if (selectedUserVoucher) {
          const voucher = await getVouchersById(selectedUserVoucher.voucherId);
          setVoucherDetail(voucher);
        }
      } catch (error) {
        console.error("Error fetching voucher detail:", error);
      }
    };

    const fetchTotalPoints = async () => {
      try {
        if (userId) {
          const totalPoints = await getTotalUserPoints(userId);
          setUserPoints(totalPoints);
        }
      } catch (error) {
        console.error("Error fetching total points:", error);
      }
    };

    fetchTotalPoints();
    fetchVoucherDetail();
  }, [selectedUserVoucher, userId]);

  const handlePointsCheck = () => {
    if (pointsInput > userPoints) {
      setPointsError("Insufficient points.");
    } else {
      setPointsError("");
      setPointsDeduction(pointsInput);
    }
  };

  const handleInputPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPointsInput(Number(value));
    setPointsInputFormatted(priceFormatter(Number(value)));
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
            Original Amount: Rp.
            {priceFormatter(originalPrice)}
          </p>
          <UserVoucherSelection />
          <p className="text-gray-600 mb-4">
            Voucher Deduction: Rp.{priceFormatter(voucherDeduction)}
          </p>
          <p className="text-gray-600 text-sm font-bold">
            Current Points: {priceFormatter(userPoints)}
          </p>

          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-grow">
              <label className="block text-gray-700 text-sm mb-2">
                Enter Points:
              </label>
              <input
                type="text"
                value={pointsInputFormatted}
                onChange={handleInputPointsChange}
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
            Points Deduction: Rp.
            {priceFormatter(pointsDeduction)}
          </p>
          <p className="text-gray-600 mb-4">
            Total Amount: Rp.
            {priceFormatter(originalPrice - voucherDeduction - pointsDeduction)}
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
