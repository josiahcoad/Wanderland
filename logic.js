// ***************** COMMON LOGIC ***************** //

// return results whose "types" are at least one of the LOCATION_TYPES
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

// ***************** API CALLS ***************** //

var LOCATION_TYPES = [
    "http://dbpedia.org/ontology/City",
    "http://dbpedia.org/ontology/Settlement",
    "http://dbpedia.org/ontology/PopulatedPlace",
    "http://dbpedia.org/ontology/Place",
    "http://dbpedia.org/ontology/Location"
];

var PARAMS =
    "&include=image%2Calternate_labels%2Ctypes%2Cabstract%2Ccategories%2Clod&token=7a037e59dae14528905d167a365da3a5";

function getWebpageUri() {
    return window.location.href;
}

function getApiReponse(text) {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        const url =
            "https://api.dandelion.eu/datatxt/nex/v1/?lang=en&url=" +
            encodeURI(text) +
            PARAMS;
        Http.open("GET", url);
        Http.onloadend = e => {
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

// query the api to return all unique locations from the current page
function getLocations() {
    var text = getWebpageUri();
    return new Promise((resolve, reject) => {
        getApiReponse(text)
            .then(JSON.parse)
            .then(
                function(response) {
                    resolve(filterDuplicates(filterLocations(response), "spot"));
                },
                function(error) {
                    reject(Error(error));
                }
            );
    });
}