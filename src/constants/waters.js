const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

export const CURRENT_DATE = {
  CURRENT_YEAR: currentYear.toString(),
  CURRENT_MONTH: (currentMonth + 1).toString(),
};
