export const useChartData = (useFormatDate, currCity) => {
  const currentCityHourly = currCity.hourly?.slice(0, 8);
  const hours = currentCityHourly?.map(
    (hour) =>
      useFormatDate(hour.dt - 10800 + currCity.timezoneOffset).time
  );
  const degrees = currentCityHourly?.map((hour) => Math.floor(hour.temp));

  return {
    hours,
    degrees,
  };
};
