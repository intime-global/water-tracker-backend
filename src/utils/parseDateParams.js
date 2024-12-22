export const parseDateParams = ({ month, year, day }) => {
  const parsedMonth = parseMonth(month);
  const parsedYear = parseYear(year);
  const parsedDay = parseDay(day);

  return {
    month: parsedMonth,
    year: parsedYear,
    day: parsedDay,
  };
};

function parseMonth(month) {
  if (typeof month !== 'string') return;

  if (month < 1) return;
  if (month > 12) return;

  return month;
}

function parseYear(year) {
  if (typeof year !== 'string') return;

  if (year.length !== 4) return;

  return year;
}

function parseDay(day) {
  if (typeof day !== 'string') return;

  if (day > 31 || day < 0) return;

  return day;
}
