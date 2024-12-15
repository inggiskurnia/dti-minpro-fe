import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserTicketList from "@/components/UserTicket/UserTicketList";
import { FC } from "react";

const UserTickets: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h2 className="text-gray-700 text-3xl font-bold text-center pt-24">
        User Tickets
      </h2>
      <div className="flex-grow flex justify-center">
        <UserTicketList />
      </div>
      <Footer />
    </div>
  );
};

export default UserTickets;
