import Link from "next/link";
import { FC } from "react";

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
      <div className="m-4 max-w-sm overflow-hidden rounded bg-white shadow-lg">
        <div className="relative h-56 w-full">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={thumbnail}
            alt={eventName}
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold text-black">{eventName}</div>
          <p className="text-base text-gray-700">{price}</p>
          <p className="text-base text-gray-700">{formattedDate}</p>
          <hr className="my-2 border-gray-300" />
          <div className="flex items-center">
            <img
              src={organizerPicture}
              alt={organizer}
              className="mr-2 h-8 w-8 rounded-full"
            />
            <p className="text-base text-gray-700">{organizer}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
