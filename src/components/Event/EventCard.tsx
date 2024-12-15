import Link from "next/link";
import { FC } from "react";
import { FaRegCalendarAlt, FaTicketAlt, FaUserCircle } from "react-icons/fa"; // Import icons

interface EventCardProps {
  eventId: number;
  thumbnail: string;
  eventName: string;
  price: string;
  date: string;
  organizer: string;
  organizerPicture: string;
}

const EventCard: FC<EventCardProps> = ({
  eventId,
  thumbnail,
  eventName,
  price,
  date,
  organizer,
  organizerPicture,
}) => {
  const formattedDate = `${new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "2-digit",
  })}`;

  return (
    <Link href={`/event/${eventId}`}>
      <div className="m-4 max-w-sm overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <div className="relative h-56 w-full">
          <img
            className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
            src={thumbnail}
            alt={eventName}
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 text-2xl font-semibold text-black">
            {eventName}
          </div>
          <div className="flex items-center space-x-2">
            <FaTicketAlt className="text-gray-600" />
            <p className="text-lg font-medium text-gray-800">{price}</p>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <FaRegCalendarAlt className="text-gray-600" />
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex items-center space-x-3">
            <img
              src={organizerPicture}
              alt={organizer}
              className="h-10 w-10 rounded-full border-2 border-gray-300"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-700">{organizer}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
