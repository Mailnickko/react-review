import titleize from "titleize";

export const rentalType = isShared => {
  return isShared ? "Shared" : "Entire";
};

export const toUpperCase = val => {
  return val ? titleize(val) : "";
};
