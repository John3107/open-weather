export const useFormatDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours ? hours : 12;

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  const timeString =
    hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
  
  const dateString = `${month} ${day}, ${year}`;

  return { date: dateString, time: timeString };
};