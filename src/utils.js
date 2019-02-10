// common use functions

export const removeWhere = (array, key, value) => array.filter(item => item[key] !== value);

export const removeDuplicatesWith = (a, b, prop) => a.filter(x => !b.find(y => x[prop] === y[prop]));
