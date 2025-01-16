"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventList from "@/components/Event/EventList";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const { setUserId } = useUser();

  useEffect(() => {
    setUserId(Number(session?.user.id));
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow pt-16">
          <div>{process.env.NEXT_PUBLIC_BACKEND_URL}</div>
          <EventList />
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
