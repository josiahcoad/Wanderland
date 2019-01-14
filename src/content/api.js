// This code gets injected automatically into every page you go onto in Google Chrome.
// The functions here are specifically for calling the dandelion api which does the entity
// extraction on the webpage text.

var LOCATION_TYPES = [
    "http://dbpedia.org/ontology/City",
    "http://dbpedia.org/ontology/Settlement",
    "http://dbpedia.org/ontology/PopulatedPlace",
    "http://dbpedia.org/ontology/Place",
    "http://dbpedia.org/ontology/Location"
];

// return results whose "types" are at least one of the LOCATION_TYPES
// NOTE: some results we want don't have a type... don't know what to do there
function filterLocations(response) {
    return response.annotations.filter(
        annotation =>
        annotation.types.filter(type => LOCATION_TYPES.indexOf(type) !== -1)
        .length !== 0
    );
}

// remove objects from an array who have the same value
// for a given field, keeping only the first such object
function filterDuplicates(array, field) {
    var distinctObjects = [];
    var distinctValues = [];
    for (var i = 0; i < array.length; i++) {
        if (distinctValues.indexOf(array[i][field]) == -1) {
            distinctObjects.push(array[i]);
            distinctValues.push(array[i][field]);
        }
    }
    return distinctObjects;
}

function getCurrentPageUrl() {
    return window.location.href;
}


var PARAMS =
    "&include=image%2Calternate_labels%2Ctypes%2Cabstract%2Ccategories%2Clod&token=7a037e59dae14528905d167a365da3a5";

// send the webpage Url to the Dandelion API along with the params that tell
// the api what we want to get back. On successful response, return the response,
// otherwise return the status.
function getEntitiesFromWebpage(webpageUrl) {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        const url =
            "https://api.dandelion.eu/datatxt/nex/v1/?lang=en&url=" +
            encodeURI(webpageUrl) +
            PARAMS;
        Http.open("GET", url);
        Http.onloadend = () => {
            if (Http.status == 200) {
                resolve(Http.responseText);
            } else {
                reject(Error(Http.status));
            }
        };
        // Handle network errors
        Http.onerror = function() {
            reject(Error("Network Error"));
        };
        Http.send();
    });
}

// query Dandelion for all unique locations from the text on the current page
export function getUniqueLocationsFromCurrentPage() {
    var currentPageUrl = getCurrentPageUrl();
    return new Promise((resolve, reject) => {
        getEntitiesFromWebpage(currentPageUrl)
            .then(JSON.parse)
            .then(
                function(response) {
                    // filter the reponse for all entities that are locations
                    // then remove duplicate locations... ones that have the same "spot"
                    resolve(filterDuplicates(filterLocations(response), "spot"));
                },
                function(error) {
                    alert("error yo");
                    reject(Error(error));
                }
            );
    });
}