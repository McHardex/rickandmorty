const formatDate = (date: string) => {
  const dateString = new Date(date);
  return `${dateString.getFullYear()}-${
    dateString.getMonth() + 1
  }-${dateString.getDay()}`;
};

export default formatDate;
