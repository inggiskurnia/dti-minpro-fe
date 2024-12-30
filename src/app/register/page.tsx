"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import registerUser, { RegisterUserPayload, RegisterUserResponse } from "@/api/registerUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Manual loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    birthdate: Yup.date()
      .required("Birthdate is required")
      .max(new Date(), "Birthdate cannot be in the future"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Password confirmation is required"),
    referrerCode: Yup.string().nullable(), // Optional field for referrer code
  });

  // Mutation for registering the user
  const mutation = useMutation<RegisterUserResponse, Error, RegisterUserPayload>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message || "Registration successful!");
        setTimeout(() => {
          router.push("/login");
        }, 1000); // Delay to allow user to read the success message
      } else {
        alert(data.message || "Registration failed! Please try again.");
      }
      setIsSubmitting(false); // Set loading state to false
    },
    onError: (error: any) => {
      setSubmitError(error.message || "An error occurred during registration.");
      setIsSubmitting(false); // Set loading state to false
    },
  });

  const handleSubmit = (values: RegisterUserPayload) => {
    setIsSubmitting(true); // Set loading state to true when the form is submitting
    setSubmitError(null); // Clear any previous errors
    mutation.mutate(values); // Use mutate from useMutation
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl w-full mx-4 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left Side */}
          <div className="flex flex-col justify-center items-center bg-blue-100 p-8">
            <img
              src="https://assets.loket.com/web/assets/img/auth.svg"
              alt="Illustration"
              className="w-full h-auto"
            />
            <h2 className="mt-6 text-lg font-semibold text-gray-700 text-center"> {/* Added text-center here */}
              Never miss out on your favorite events
            </h2>
            <p className="text-sm text-gray-600 text-center mt-2"> {/* Added text-center here */}
              Join us and experience the ease of managing and attending events with Loket.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Create Your EVENTURE Account
            </h2>
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                birthdate: "",
                password: "",
                confirmPassword: "",
                referrerCode: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  {/* Full Name */}
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-medium">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Enter your full name"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Birthdate */}
                  <div className="mb-4">
                    <label htmlFor="birthdate" className="block text-gray-700 font-medium">
                      Birthdate
                    </label>
                    <Field
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <ErrorMessage
                      name="birthdate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Referrer Code */}
                  <div className="mb-4">
                    <label htmlFor="referrerCode" className="block text-gray-700 font-medium">
                      Referrer Code (Optional)
                    </label>
                    <Field
                      type="text"
                      name="referrerCode"
                      id="referrerCode"
                      placeholder="Enter a referrer code if you have one"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <ErrorMessage
                      name="referrerCode"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-gray-700 font-medium">
                      Password
                    </label>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-4 relative">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
                      Confirm Password
                    </label>
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-8 text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Error message */}
                  {submitError && (
                    <div className="text-red-500 text-sm mt-4">{submitError}</div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md focus:outline-none"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                  <p className="text-center text-gray-600 text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                      Log in
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
