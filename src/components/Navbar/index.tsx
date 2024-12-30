"use client";

import { useEffect, useState } from "react";
import { FC } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import SearchEvent from "../Event/SearchEvent";
import { useUser } from "@/context/UserContext";

interface MenuData {
  title: string;
  link: string;
}

const Navbar: FC = () => {
  const { data: session } = useSession(); // Session for login status
  const { userId } = useUser();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState<boolean>(false);
  const [eventId, setEventId] = useState<number | undefined>(undefined);

  const navbarData: MenuData[] = [
    { title: "Tickets", link: `/user/${userId}/tickets` },
    { title: "Transactions", link: `/user/${userId}/transactions` },
    { title: "Voucher", link: `/user/${userId}/vouchers` },
    { title: "Create New Event", link: `/event/create` },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  const toggleSubMenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed z-50 flex w-full items-center justify-between bg-eventureMainBg px-8 py-4 transition-transform duration-300 md:px-56 md:py-2">
      <div className="flex gap-8 items-center justify-end">
        <Link href="/">
          <div className="text-3xl">Eventure</div>
        </Link>
        <SearchEvent eventId={eventId} setEventId={setEventId} />
      </div>

      <div className="pl-2">
        {session ? (
          <div
            className="relative hidden w-full justify-center px-10 md:flex md:w-64"
            onMouseEnter={toggleSubMenu}
            onMouseLeave={toggleSubMenu}
          >
            <button className="py-2">
              <FaUserCircle size={32} />
            </button>
            {isSubmenuOpen && (
              <div className="absolute top-12 z-10 flex h-72 w-full items-center rounded bg-white shadow-lg">
                <div className="w-full rounded-lg">
                  {session?.user.roles.includes("USER") && (
                    <Link href="/registerOrganizer">
                      <button className="cursor-pointer px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 mb-2">
                        Register as Organizer
                      </button>
                    </Link>
                  )}
                  {navbarData.map((submenu, index) => (
                    <Link href={submenu.link} key={index}>
                      <div className="mx-4 my-2 cursor-pointer rounded-lg px-8 py-2 text-gray-600 hover:bg-gray-200">
                        {submenu.title}
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login">
              <button className="ml-4 rounded-md px-4 py-2 text-white hover:bg-gray-700">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="ml-2 rounded-md border border-white px-4 py-2 text-white hover:bg-gray-700">
                Register
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="md:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      <div
        className={`absolute left-0 top-16 w-full bg-white py-8 text-eventureMainBg shadow-lg transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {session ? (
          <>
            {session?.user.roles.includes("USER") && (
              <Link href="/registerOrganizer">
                <button className="mx-8 text-center text-blue-500 hover:bg-gray-100 mb-2">
                  Register as Organizer
                </button>
              </Link>
            )}
            {isMobileMenuOpen && (
              <div className="flex flex-col gap-5">
                {navbarData.map((submenu, index) => (
                  <Link href={submenu.link} key={index}>
                    <button className="px-8 text-left text-lg">
                      {submenu.title}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="mx-8 text-left text-lg">Login</button>
            </Link>
            <Link href="/register">
              <button className="mx-8 text-left text-lg">Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
