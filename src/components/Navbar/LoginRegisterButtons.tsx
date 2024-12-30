import Link from "next/link";
import React from "react";

const LoginRegisterButtons: React.FC = () => {
  return (
    <div className="flex space-x-4 bg-[#1A2B4A] p-4 rounded-lg">
      <Link href="/register" passHref>
        <button
          type="button"
          className="border border-[#FFFFFF] text-[#FFFFFF] px-6 py-2 rounded-lg hover:bg-[#1E3A8A] transition duration-300"
        >
          Register
        </button>
      </Link>

      <Link href="/login" passHref>
        <button
          type="button"
          className="bg-[#2563EB] text-[#FFFFFF] px-6 py-2 rounded-lg hover:bg-[#1E40AF] transition duration-300"
        >
          Login
        </button>
      </Link>
    </div>
  );
};

export default LoginRegisterButtons;
