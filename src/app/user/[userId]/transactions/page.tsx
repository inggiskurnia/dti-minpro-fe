"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TransactionList from "@/components/Transaction/TransactionList";
import { FC } from "react";

const TransactionPage: FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center">
        <div className="flex-grow pt-24 pb-20 w-[50%] space-y-5">
          <h2 className="text-gray-700 text-3xl font-bold text-center">
            Transaction List
          </h2>
          <p className="text-gray-500 text-center">
            Transaction history made by user
          </p>
          <div className="flex justify-center">
            <TransactionList></TransactionList>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default TransactionPage;
