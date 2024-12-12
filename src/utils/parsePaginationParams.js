
const parseNumber = (number, defaultValue) => {
    const isString = typeof number === 'string';
    if (!isString) return defaultValue;

    const parsedisNumber = parseInt(number);
    if (Number.isNaN(parsedisNumber)) {
        return defaultValue;
    }
    return parsedisNumber;
};

export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};
