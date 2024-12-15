import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserTicketList from "@/components/UserTicket/UserTicketList";
import { FC } from "react";

const UserTickets: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-24 pb-20">
        <h2 className="text-gray-700 text-3xl font-bold text-center">
          User Tickets
        </h2>
        <p className="text-gray-500 text-center">
          Claimed ticket by user that can be used in transaction
        </p>
        <div className="flex justify-center pt-5">
          <UserTicketList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTickets;
