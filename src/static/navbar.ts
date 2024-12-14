// import synconaLogo from "@/assets/synconia-logo.svg";

interface Navbar {
  menu: string;
  submenu: MenuData[];
}

interface MenuData {
  title: string;
  link: string;
}

// export const LogoImage = synconaLogo;

export const NavbarData: Navbar[] = [
  {
    menu: "Profile",
    submenu: [
      {
        title: "Profile",
        link: "/profile",
      },
      {
        title: "Tickets",
        link: "/ticket",
      },
      {
        title: "Transactions",
        link: "/transactions",
      },
      {
        title: "Voucher",
        link: "/voucher",
      },
      {
        title: "Points",
        link: "/points",
      },
    ],
  },
];
