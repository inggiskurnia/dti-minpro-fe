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
        <div className="pt-24 pb-20 w-[50%] space-y-5">
          <h2 className="text-gray-700 text-3xl text-center">
            Transaction List
          </h2>
          <div className="flex-grow flex justify-center">
            <TransactionList></TransactionList>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default TransactionPage;
