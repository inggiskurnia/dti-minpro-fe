export type EventFormValues = {
  name: string;
  description: string;
  thumbnail: string | null; // Allow null values
  eventCategory: string;
  city: string;
  locationDetail: string;
  startedAt: string;
  endedAt: string;
  startingPrice: string;
  totalCapacity: string;
  totalAvailable: string;
};
