"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";
import {
  useUserVoucher,
  UserVoucherProvider,
} from "@/context/UserVoucherContext";
import UserVoucherSelection from "@/components/Voucher/UserVoucherSelection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { getVouchersById } from "@/api/getVouchers";
import { Voucher } from "@/types/voucher";

const Transaction: React.FC = () => {
  const { userId } = useUser();
  const { ticketId, ticketName, quantity, originalPrice } = useTransaction();
  const { selectedUserVoucher } = useUserVoucher();
  const [voucherDeduction, setVoucherDeduction] = useState(0);
  const [totalPrice, setTotalPrice] = useState(originalPrice);
  const [voucherDetail, setVoucherDetail] = useState<Voucher | null>(null);
  const [userPoints, setUserPoints] = useState(500); // Example points, ideally fetched from backend
  const [pointsInput, setPointsInput] = useState(0);
  const [pointsDeduction, setPointsDeduction] = useState(0);
  const [pointsError, setPointsError] = useState("");

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

  useEffect(() => {
    if (voucherDetail) {
      const deduction = voucherDetail.amount;
      setVoucherDeduction(deduction);
      setTotalPrice(originalPrice - deduction);
    }
  }, [voucherDetail, originalPrice]);

  const handlePointsCheck = () => {
    if (pointsInput > userPoints) {
      setPointsError("Insufficient points.");
    } else {
      setPointsError("");
      setPointsDeduction(pointsInput);
      setTotalPrice((prevPrice) => prevPrice - pointsInput);
    }
  };

  const handlePurchase = () => {
    console.log("Completing purchase with the following data:", {
      userId: userId,
      eventTicketId: ticketId,
      totalTicket: quantity,
      originalAmount: originalPrice,
      voucherDeduction: voucherDeduction,
      pointsDeduction: pointsDeduction,
      totalAmount: totalPrice,
    });
    // redirect("/success");
  };

  if (!ticketId) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex justify-center mx-auto pt-28 pb-20">
        <div className="bg-white shadow-lg w-1/3 p-8">
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

          <div className="mb-4 flex gap-10">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Points:
            </label>
            <input
              type="number"
              value={pointsInput}
              onChange={(e) => setPointsInput(parseInt(e.target.value))}
              className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={handlePointsCheck}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Check Points
            </button>
            {pointsError && (
              <p className="text-red-500 text-xs italic">{pointsError}</p>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            Points Deduction: RP.{pointsDeduction.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-4">
            Total Amount: RP.{totalPrice.toFixed(2)}
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
