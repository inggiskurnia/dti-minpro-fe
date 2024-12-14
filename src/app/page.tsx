import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EventList from "@/components/Event/EventList";

export default function Home() {
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
