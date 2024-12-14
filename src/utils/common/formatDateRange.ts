const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
  } as const;

  const startTimeString = startDate.toLocaleTimeString("en-US", optionsTime);
  const endTimeString = endDate.toLocaleTimeString("en-US", optionsTime);

  const startMonthDay = startDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
  const endMonthDay = endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const formattedDateRange = `${startMonthDay} - ${endMonthDay} ${endDate.getFullYear()}`;
  const formattedTimeRange = `${startTimeString} - ${endTimeString}`;

  return { formattedDateRange, formattedTimeRange };
};
export default formatDateRange;
