// common use functions

export const removeWhere = (array, key, value) => array.filter(item => item[key] !== value);

export const isEmpty = (obj) => {
    /**
    isEmpty(""), // true
    isEmpty(33), // true (arguably could be a TypeError)
    isEmpty([]), // true
    isEmpty({}), // true
    isEmpty({length: 0, custom_property: []}), // true

    isEmpty("Hello"), // false
    isEmpty([1,2,3]), // false
    isEmpty({test: 1}), // false
    isEmpty({length: 3, custom_property: [1,2,3]}) // false
     */
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== 'object') return true;

    // Otherwise, does it have any properties of its own?
    if (Object.getOwnPropertyNames(obj).length > 0) return false;

    return true;
};
