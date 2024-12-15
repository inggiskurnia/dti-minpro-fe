import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserVoucherList from "@/components/UserVoucher/UserVoucherList";
import { FC } from "react";

const UserVouchers: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-24 pb-20 space-y-5">
        <h2 className="text-gray-700 text-3xl font-bold text-center">
          User Vouchers
        </h2>
        <p className="text-gray-500 text-center">
          Claimed voucher by user that can be used in transaction
        </p>
        <div className="flex justify-center">
          <UserVoucherList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserVouchers;
