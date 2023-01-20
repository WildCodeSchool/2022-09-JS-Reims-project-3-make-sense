const dateDisplay = (date) => {
  const dateOfTheComment = new Date(date);
  dateOfTheComment.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateOfNow = new Date();
  const differenceInTime =
    (dateOfNow.getTime() - dateOfTheComment.getTime()) * 0.001;
  const differenceInDays = Math.floor(differenceInTime / 86400);
  const differenceInHours = Math.floor(differenceInTime / 3600);
  const differenceInMinutes = Math.floor(differenceInTime / 60);
  if (differenceInDays > 0) {
    return `${differenceInDays} jours`;
  }
  if (differenceInHours > 0) {
    return `${differenceInHours} heures`;
  }
  if (differenceInMinutes > 0) {
    return `${differenceInMinutes} minutes`;
  }
  return "moins d'une minute";
};

export default dateDisplay;
