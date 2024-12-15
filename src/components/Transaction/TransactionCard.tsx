"use client";

import React from "react";
import { Transaction } from "@/types/transaction";
import { FaTicketAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { MdConfirmationNumber } from "react-icons/md";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  return (
    <div className="bg-white shadow-xl rounded-lg px-10 py-6 mb-6">
      <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
        <MdConfirmationNumber className="text-blue-500 mr-2" />
        Invoice Number: {transaction.invoiceNumber}
      </h3>
      <hr></hr>
      <div className="py-3 text-gray-700 space-y-1">
        <p className="flex items-center">
          <FaTicketAlt className="text-green-500 mr-2" />
          <span>Event Ticket:</span>
          <span className="ml-1">{transaction.eventTicketName}</span>
        </p>
        <p className="flex items-center">
          <FaTicketAlt className="text-green-500 mr-2" />
          <span>Total Tickets:</span>
          <span className="ml-1 font-semibold">{transaction.totalTicket}</span>
        </p>
        <p className="flex items-center">
          <FaMoneyBillWave className="text-yellow-500 mr-2" />
          <span>Original Amount:</span>
          <span className="ml-1 font-semibold">
            RP.{transaction.originalAmount.toFixed(2)}
          </span>
        </p>
        <p className="flex items-center">
          <RiCoupon3Fill className="text-red-500 mr-2" />
          <span>Voucher Deduction:</span>
          <span className="ml-1 font-semibold">
            RP.{transaction.voucherDeduction.toFixed(2)}
          </span>
        </p>
        <p className="flex items-center">
          <RiCoupon3Fill className="text-red-500 mr-2" />
          <span>Points Deduction:</span>
          <span className="ml-1 font-semibold">
            RP.{transaction.pointsDeduction.toFixed(2)}
          </span>
        </p>
        <p className="flex items-center">
          <FaMoneyBillWave className="text-yellow-500 mr-2" />
          <span>Total Amount:</span>
          <span className="ml-1 font-semibold">
            RP.{transaction.totalAmount.toFixed(2)}
          </span>
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="text-blue-500 mr-2" />
          <span>Transaction Date:</span>
          <span className="ml-1 font-semibold">
            {new Date(transaction.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
