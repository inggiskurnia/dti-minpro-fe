"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getEventsByName } from "@/api/getEvents";
import { useDebounce } from "@/hooks/useDebounce";
import { FaSearch } from "react-icons/fa";

interface SearchEventProps {
  eventId: number | undefined;
  setEventId: (eventId: number | undefined) => void;
}

interface Event {
  eventId: number;
  eventName: string;
}

const SearchEvent: React.FC<SearchEventProps> = ({ eventId, setEventId }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventQuery, setEventQuery] = useState<string>("");
  const debouncedEventQuery = useDebounce(eventQuery, 500);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getEventsByName(debouncedEventQuery);
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };
    if (debouncedEventQuery) {
      loadEvents();
    }
  }, [debouncedEventQuery]);

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdownVisible(false);
    }, 200);
  };

  const handleEventClick = (id: number) => {
    setEventId(id);
    setDropdownVisible(false);
    router.push(`/event/${id}`);
  };

  const handleSearchIconClick = () => {
    setShowInput(true);
    inputRef.current?.focus();
  };

  return (
    <div
      className={`relative ${showInput ? "w-full" : "w-auto md:w-auto"} transition-all duration-500`}
    >
      <div className="hidden md:block w-full">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search Event"
          value={eventQuery}
          onChange={(e) => setEventQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full md:w-96 rounded bg-eventureMainBg2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500"
        />
      </div>
      <div className="block md:hidden">
        {showInput ? (
          <input
            type="text"
            ref={inputRef}
            placeholder="Search Event"
            value={eventQuery}
            onChange={(e) => setEventQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full rounded bg-eventureMainBg2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500"
          />
        ) : (
          <FaSearch
            className="cursor-pointer"
            onClick={handleSearchIconClick}
            size={20}
          />
        )}
      </div>
      {dropdownVisible && eventQuery && (
        <div className="absolute left-0 top-full z-20 mt-1 max-h-40 w-full md:w-96 overflow-y-auto border border-gray-300 bg-white">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.eventId}
                onMouseDown={() => handleEventClick(event.eventId)}
                className="block p-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {event.eventName}
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-700">No events found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchEvent;
