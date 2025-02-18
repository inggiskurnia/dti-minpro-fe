"use client";

import { useState } from "react";
import { FC } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import SearchEvent from "../Event/SearchEvent";

interface MenuData {
  title: string;
  link: string;
}

const Navbar: FC = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState<boolean>(false);

  const navbarData: MenuData[] = [
    { title: "Tickets", link: `/user/tickets` },
    { title: "Transactions", link: `/user/transactions` },
    { title: "Voucher", link: `/user/vouchers` },
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
      <SearchEvent />

      {!session && (
        <div className="flex">
          <Link href="/login">
            <button className="ml-4 rounded-md px-2 md:px-4 py-2 text-white hover:bg-gray-700">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="ml-2 rounded-md border border-white px-2 md:px-4 py-2 text-white hover:bg-gray-700">
              Register
            </button>
          </Link>
        </div>
      )}

      {/* Desktop view */}
      {session && (
        <div
          className="relative hidden w-full justify-center px-10 md:flex md:w-64"
          onMouseEnter={toggleSubMenu}
          onMouseLeave={toggleSubMenu}
        >
          <button className="py-2">
            <FaUserCircle size={32} />
          </button>
          {isSubmenuOpen && (
            <div className="absolute top-12 z-10 flex py-4 w-full items-center rounded bg-white shadow-lg">
              <div className="w-full rounded-lg">
                {navbarData.map((submenu, index) => (
                  <Link href={submenu.link} key={index}>
                    <div className="mx-4 my-2 cursor-pointer rounded-lg px-8 py-2 text-gray-600 hover:bg-gray-200">
                      {submenu.title}
                    </div>
                  </Link>
                ))}
                <div
                  onClick={handleLogout}
                  className="mx-4 my-2 cursor-pointer rounded-lg px-8 py-2 text-gray-600 hover:bg-gray-200"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile view */}
      {session && (
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>
      )}
      <div
        className={`absolute left-0 top-16 w-full bg-white py-8 text-eventureMainBg shadow-lg transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <>
          <div className="flex flex-col gap-5">
            {navbarData.map((submenu, index) => (
              <Link href={submenu.link} key={index}>
                <button className="px-8 text-left text-lg text-gray-600">
                  {submenu.title}
                </button>
              </Link>
            ))}
            <div
              onClick={handleLogout}
              className="px-8 text-left text-lg text-gray-600"
            >
              Logout
            </div>
          </div>
        </>
      </div>
    </header>
  );
};

export default Navbar;
