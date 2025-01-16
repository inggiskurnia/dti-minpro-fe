"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventList from "@/components/Event/EventList";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const { setUserId } = useUser();

  useEffect(() => {
    console.log(axios.defaults.baseURL);
    setUserId(Number(session?.user.id));
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow pt-16">
          <EventList />
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
