"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import EventCategorySelect from "@/components/Event/EventCategorySelect";
import SearchCity from "@/components/Location/SearchCity";

const CreateEvent = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [cityId, setCityId] = useState<number | undefined>(undefined);

  const initialValues = {
    name: "",
    description: "",
    thumbnail: "",
    locationDetail: "",
    longitude: "",
    latitude: "",
    startedAt: "",
    endedAt: "",
    startingPrice: "",
    totalCapacity: "",
    totalAvailable: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().max(100).required("Name is required"),
    description: Yup.string()
      .max(2000, "Description must be at most 2000 characters")
      .required("Description is required"),
    startedAt: Yup.date().required("Start date and time is required"),
    endedAt: Yup.date()
      .min(Yup.ref("startedAt"), "End date must be after start date")
      .required("End date and time is required"),
    startingPrice: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Starting price is required"),
    totalCapacity: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Total capacity is required"),
    totalAvailable: Yup.number()
      .min(0, "Must be greater than or equal to 0")
      .required("Total available tickets are required"),
  });

  function convertToSpecificFormat(originalDateString: string): string {
    const date = new Date(originalDateString);

    date.setFullYear(2024, 11, 15);
    date.setHours(9, 0, 0, 0);

    const formattedDate = date.toISOString();

    return formattedDate;
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const eventData = {
        organizerId: 14, // change this on deployment
        name: values.name,
        description: values.description,
        thumbnail: values.thumbnail,
        eventCategoryId: categoryId,
        cityId: cityId,
        locationDetail: values.locationDetail,
        startedAt: convertToSpecificFormat(values.startedAt),
        endedAt: convertToSpecificFormat(values.endedAt),
        startingPrice: values.startingPrice,
        totalCapacity: values.totalCapacity,
        totalAvailable: values.totalAvailable,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`,
        eventData
      );

      if (response.status === 200) {
        window.confirm("Create new event successful !");
        setSubmissionSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Create New Event
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold py-2">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="input-field w-full sm:w-96 text-gray-700 h-8 border-2 border-gray-200 rounded-md p-2"
                    placeholder="Event name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message text-red-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold py-2">
                    Description
                  </label>
                  <Field
                    name="description"
                    as="textarea"
                    rows={4}
                    className="input-field w-full sm:w-96 h-30 text-gray-700 border-2 border-gray-200 rounded-md p-2"
                    placeholder="Event description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message text-red-600"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold py-2">
                    Thumbnail URL
                  </label>
                  <Field
                    name="thumbnail"
                    type="text"
                    className="input-field w-full sm:w-96 text-gray-700 h-8 border-2 border-gray-200 rounded-md p-2"
                    placeholder="https://example.com/image.jpg"
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="div"
                    className="error-message text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <EventCategorySelect
                    categoryId={categoryId}
                    setCategoryId={setCategoryId}
                  />
                </div>

                <div className="mb-4">
                  <SearchCity cityId={cityId} setCityId={setCityId} />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold py-2">
                    Location Details
                  </label>
                  <Field
                    name="locationDetail"
                    as="textarea"
                    rows={2}
                    className="input-field w-full sm:w-96 text-gray-700 h-20 border-2 border-gray-200 rounded-md p-2"
                    placeholder="Detailed address of the event"
                  />
                  <ErrorMessage
                    name="locationDetail"
                    component="div"
                    className="error-message text-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-bold py-2">
                      Start Date & Time
                    </label>
                    <Field
                      name="startedAt"
                      type="datetime-local"
                      className="input-field w-full text-gray-700 border-2 border-gray-200 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="startedAt"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold py-2">
                      End Date & Time
                    </label>
                    <Field
                      name="endedAt"
                      type="datetime-local"
                      className="input-field w-full text-gray-700 border-2 border-gray-200 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="endedAt"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold py-2">
                    Starting Price (Rp)
                  </label>
                  <Field
                    name="startingPrice"
                    type="number"
                    className="input-field w-full sm:w-96 text-gray-700 h-8 border-2 border-gray-200 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="startingPrice"
                    component="div"
                    className="error-message text-red-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div>
                    <label className="block text-gray-700 font-bold py-2">
                      Total Capacity
                    </label>
                    <Field
                      name="totalCapacity"
                      type="number"
                      className="input-field w-full sm:w-96 text-gray-700 h-8 border-2 border-gray-200 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="totalCapacity"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold py-2">
                      Total Available Tickets
                    </label>
                    <Field
                      name="totalAvailable"
                      type="number"
                      className="input-field w-full sm:w-96 text-gray-700 h-8 border-2 border-gray-200 rounded-md p-2"
                    />
                    <ErrorMessage
                      name="totalAvailable"
                      component="div"
                      className="error-message text-red-600"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Create Event
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;
