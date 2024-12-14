"use client";

import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import { getEvents } from "@/api/getEvents";
import EventCategorySelect from "./EventCategorySelect";
import SearchCity from "@/components/Location/SearchCity";

interface Event {
  eventId: number;
  organizerId: number;
  organizer: string;
  organizerProfile: string;
  name: string;
  thumbnail: string;
  startingPrice: number;
  startedAt: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [cityId, setCityId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 12;

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await getEvents(limit, currentPage, categoryId, cityId);
        setEvents(data.content);
        setTotalPages(data.totalPages);
        setFirstPage(data.firstPage);
        setLastPage(data.lastPage);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setTotalPages(0);
        setFirstPage(false);
        setLastPage(false);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [currentPage, categoryId, cityId]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-eventureBgWhite container mx-auto px-4 py-8">
      <div className="mb-4 flex gap-4">
        <EventCategorySelect
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
        <SearchCity cityId={cityId} setCityId={setCityId} />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {events.map((event) => (
                <EventCard
                  key={event.eventId}
                  eventId={event.eventId}
                  thumbnail={event.thumbnail}
                  eventName={event.name}
                  price={
                    event.startingPrice ? `$${event.startingPrice}` : "Free"
                  }
                  date={new Date(event.startedAt).toDateString()}
                  organizer={event.organizer}
                  organizerPicture={
                    event.organizerProfile ||
                    "https://example.com/default-organizer.jpg"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-700">No events found</div>
          )}
        </>
      )}

      <div className="mt-8 flex items-center justify-center gap-10">
        <div className="flex justify-center" style={{ width: "100px" }}>
          {!firstPage && (
            <button
              className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
              onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
          )}
        </div>
        <span className="text-gray-700">
          {currentPage + 1} / {totalPages}
        </span>
        <div className="flex justify-center" style={{ width: "100px" }}>
          {!lastPage && (
            <button
              className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300"
              onClick={() =>
                currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
