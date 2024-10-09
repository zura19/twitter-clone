const getMonthAndYear = (dateString) => {
  const date = new Date(dateString);

  const month = date.toLocaleString("default", { month: "long" }); // Get full month name
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export default getMonthAndYear;
