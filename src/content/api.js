// The functions here are for calling the dandelion and google maps api which does the entity
// extraction on the webpage text.

const LOCATION_TYPES = [
    'http://dbpedia.org/ontology/City',
    'http://dbpedia.org/ontology/Settlement',
    'http://dbpedia.org/ontology/PopulatedPlace',
    'http://dbpedia.org/ontology/Place',
    'http://dbpedia.org/ontology/Location',
];

// return results whose "types" are at least one of the LOCATION_TYPES
// NOTE: some results we want don't have a type... don't know what to do there
function filterLocations(response) {
    // eslint-disable-next-line
    return response.annotations.filter(
        annotation => annotation.types.filter(type => LOCATION_TYPES.indexOf(type) !== -1).length !== 0,
    );
}

// remove objects from an array who have the same value
// for a given field, keeping only the first such object
function filterDuplicates(array, field) {
    const distinctObjects = [];
    const distinctValues = [];
    for (let i = 0; i < array.length; i += 1) {
        if (distinctValues.indexOf(array[i][field]) === -1) {
            distinctObjects.push(array[i]);
            distinctValues.push(array[i][field]);
        }
    }
    return distinctObjects;
}

function getCurrentPageUrl() {
    return window.location.href;
}

const PARAMS = '&include=image%2Calternate_labels%2Ctypes%2Cabstract%2Ccategories%2Clod&token=7a037e59dae14528905d167a365da3a5';

// send the webpage Url to the Dandelion API along with the params that tell
// the api what we want to get back. On successful response, return the response,
// otherwise return the status.
function getEntitiesFromWebpage(webpageUrl) {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        const url = `https://api.dandelion.eu/datatxt/nex/v1/?lang=en&url=${encodeURI(
            webpageUrl,
        )}${PARAMS}`;
        Http.open('GET', url);
        Http.onloadend = () => {
            if (Http.status === 200) {
                resolve(Http.responseText);
            } else {
                reject(Error(Http.status));
            }
        };
        // Handle network errors
        Http.onerror = () => {
            reject(Error('Network Error'));
        };
        Http.send();
    });
}

// query Dandelion for all unique locations from the text on the current page
export const getUniqueLocationsFromCurrentPage = () => new Promise(resolve => getEntitiesFromWebpage(getCurrentPageUrl())
    .then(JSON.parse)
    .then(response => resolve(filterDuplicates(filterLocations(response), 'spot')))); // filter the reponse for all entities that are locations then remove duplicate locations... ones that have the same "spot"

const getEntitiesFromText = textData => new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();
    const url = `https://api.dandelion.eu/datatxt/nex/v1/?lang=en&text=${textData}${PARAMS}`;
    Http.open('GET', url);
    Http.onloadend = () => {
        if (Http.status === 200) {
            resolve(Http.responseText);
        } else {
            reject(Error(Http.status));
        }
    };
    // Handle network errors
    Http.onerror = () => {
        reject(Error('Network Error'));
    };
    Http.send();
});

export const getUniqueLocationsFromText = textData => new Promise(resolve => getEntitiesFromText(textData)
    .then(JSON.parse)
    .then(response => resolve(filterDuplicates(filterLocations(response), 'spot')))); // filter the reponse for all entities that are locations then remove duplicate locations... ones that have the same "spot"

// Query the Google "Places" API for the latitude and longitude of the place
function googleGeometryAPIGet(location) {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        Http.responseType = 'json';
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8&input=${encodeURI(
            location,
        )}&inputtype=textquery&fields=geometry`;
        Http.open('GET', url);
        Http.onloadend = () => {
            if (Http.status === 200) {
                resolve(
                    Http.response.candidates.length === 0
                        ? {
                            lat: null,
                            lng: null,
                        }
                        : Http.response.candidates[0].geometry.location,
                );
            } else {
                reject(Error(Http.status));
            }
        };
        // Handle network errors
        Http.onerror = () => {
            reject(Error('Network Error'));
        };
        Http.send();
    });
}

// Given an object that has a "spot" parameter denoting the place to look up,
// query the Google "Places" API to get the lat/lng and then return the object with
// whatever the object had before.
export function addGeometryToObject({ spot, ...rest }) {
    return (
        googleGeometryAPIGet(spot)
            .then(response => ({
                ...rest,
                name: spot,
                lat: response.lat,
                lng: response.lng,
            }))
            // an error will be raised here if there is a Network Error or
            // if the response code from the Google Places API is not a 200
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
                return {
                    ...rest,
                    name: spot,
                    lat: null,
                    lng: null,
                };
            })
    );
}
