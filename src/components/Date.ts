export const getTodayDate = () => {
  const dateObj = new Date();
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();

  let monthStr;
  let dayStr;
  if (month < 10) {
    monthStr = "0" + month;
  } else {
    monthStr = month;
  }
  if (day < 10) {
    dayStr = "0" + day;
  } else {
    dayStr = day;
  }
  let dateString = year + "-" + monthStr + "-" + dayStr;
  return dateString;
};
