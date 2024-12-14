export const parseDateParams = ({ month, year }) => {
  const parsedMonth = parseMonth(month);
  const parsedYear = parseYear(year);

  return {
    month: parsedMonth,
    year: parsedYear,
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
