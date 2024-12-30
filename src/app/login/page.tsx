"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const LoginPage: FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession(); // Get session data and status
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(data);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      
      console.log(result);
      
      if (!result?.ok) {
        router.push(`/login?error=${encodeURIComponent(result?.error || "unknown")}`);
        setError(result?.error || "An unexpected error occurred. Please try again.");
      } else {
        // Trigger a re-fetch of the session after login
        router.replace("/");  // This will reload the page to check the session again
        alert("Login success!");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Debugging session
  console.log("Session data:", session);
  console.log("Session status:", status);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section - Can be a welcome image or promotional content */}
        <div className="flex flex-col justify-center items-center bg-blue-100 p-8">
          <img
            src="https://assets.loket.com/web/assets/img/auth.svg"
            alt="Illustration"
            className="w-full h-auto"
          />
          <h2 className="mt-6 text-lg font-semibold text-gray-700 text-center">
            Never miss out on your favorite events
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Join us and experience the ease of managing and attending events with Loket.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="border border-gray-300 p-2 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="font-medium text-gray-700">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} 
                {...register("password")}
                className="border border-gray-300 p-2 rounded text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" // Adjusted placeholder color for visibility
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            {error && <span className="text-red-500">{error}</span>}
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
