"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";
import {
  useUserVoucher,
  UserVoucherProvider,
} from "@/context/UserVoucherContext";
import UserVoucherSelector from "@/components/Voucher/UserVoucherSelection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";

const Transaction: React.FC = () => {
  const { userId } = useUser();
  const { ticketId, quantity, originalPrice } = useTransaction();
  const { selectedVoucher } = useUserVoucher();
  const [voucherDeduction, setVoucherDeduction] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePurchase = () => {
    console.log("Completing purchase with the following data:", {
      eventTicketId: ticketId,
      totalTicket: quantity,
      originalAmount: originalPrice,
      voucherDeduction,
      totalAmount: totalPrice,
    });
    // redirect("/success");
  };

  if (!ticketId) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex justify-center mx-auto pt-28 pb-28">
        <div className="bg-white shadow-lg w-1/3 p-5">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Transaction Details
          </h1>
          <hr />
          <p className="text-gray-600 mb-4 mt-4">User ID: {userId}</p>
          <p className="text-gray-600 mb-4">Event Ticket ID: {ticketId}</p>
          <p className="text-gray-600 mb-4">Total Tickets: {quantity}</p>
          <p className="text-gray-600 mb-4">
            Original Amount: RP.{originalPrice.toFixed(2)}
          </p>
          <UserVoucherSelector />
          <p className="text-gray-600 mb-4">
            Voucher Deduction: RP.{voucherDeduction?.toFixed(2) || "0.00"}
          </p>
          <p className="text-gray-600 mb-4">
            Total Amount: RP.{totalPrice.toFixed(2)}
          </p>
          <button
            onClick={handlePurchase}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Complete Purchase
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;
