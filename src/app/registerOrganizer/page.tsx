"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import registerOrganizer, {
  RegisterOrganizerPayload,
  RegisterOrganizerResponse,
} from "@/api/registerOrganizer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";

const RegisterOrganizerPage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: session } = useSession();

  // Validation schema: only validate name for now
  const validationSchema = Yup.object({
    name: Yup.string().required("Organizer name is required"),
  });

  // Mutation for registering the event organizer
  const mutation = useMutation<RegisterOrganizerResponse, Error, RegisterOrganizerPayload>({
    mutationFn: registerOrganizer,
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message || "Organizer registration successful!");
        setTimeout(() => {
          router.push("/");
        }, 1000); // Redirect after success
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      setSubmitError(error?.message || "An error occurred during registration.");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (values: { name: string }) => {
    // Ensure user session exists
    if (!session?.user?.id) {
      setSubmitError("User session not found. Please log in.");
      return;
    }

    // Convert session.user.id to a number if it's a string
    const userId = Number(session.user.id);

    // If userId conversion fails, handle the error
    if (isNaN(userId)) {
      setSubmitError("Invalid user ID.");
      return;
    }

    // Construct the payload with name and user ID
    const payload: RegisterOrganizerPayload = {
      name: values.name, // Name from form
      userId: userId, // User ID from session
    };

    setIsSubmitting(true);
    setSubmitError(null); // Reset any previous errors
    mutation.mutate(payload);
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
            <h2 className="mt-6 text-lg font-semibold text-gray-700 text-center">
              Become a Trusted Event Organizer
            </h2>
            <p className="text-sm text-gray-600 text-center mt-2">
              Join us and start creating amazing experiences for your audiences.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Register as Event Organizer
            </h2>
            <Formik
              initialValues={{
                name: "", // Only name field is initialized
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  {/* Only show the "name" field */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium">
                      Organizer Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter organizer name"
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <ErrorMessage
                      name="name"
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
                    {isSubmitting ? "Registering..." : "Register Organizer"}
                  </button>
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

export default RegisterOrganizerPage;
