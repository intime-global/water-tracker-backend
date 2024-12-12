
const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isTypeSpecific = (type) => ['women', 'man',].includes(type);
    if (isTypeSpecific(type)) return type;
};

// const parseFavorit = (boolean) => {
//     const isString = typeof boolean === 'string';
//     if (!isString) return;

//     const isFavourite = boolean.toLowerCase();

//     return isFavourite;
// };
export const parsFilterParams = (query) => {
    const { gender } = query;
    const parsedsTyps = parseType(gender);

    return {
        type: parsedsTyps,
    };
};
