export const dateFormat = (firebaseDate) => {
  const date = firebaseDate?.toDate();

  const day = date?.getDate();
  const year = date?.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date?.getMonth()];

  let hours = date?.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = date?.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let AmOrPm = hours >= 12 ? "PM" : "AM";

  return `${day} ${month} ${year} at ${hours}:${minutes} ${AmOrPm}`;
};
