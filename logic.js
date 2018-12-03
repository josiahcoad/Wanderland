// ***************** COMMON LOGIC ***************** //

// return results whose "types" are at least one of the LOCATION_TYPES
function filter_locations(response) {
  return response.annotations.filter(
    annotation =>
      annotation.types.filter(type => LOCATION_TYPES.indexOf(type) !== -1)
        .length !== 0
  );
}

// remove objects from an array who have the same value
// for a given field, keeping only the first such object
function filter_duplicates(array, field) {
  var distinct_objects = [];
  var distinct_values = [];
  for (var i = 0; i < array.length; i++) {
    if (distinct_values.indexOf(array[i][field]) == -1) {
      distinct_objects.push(array[i]);
      distinct_values.push(array[i][field]);
    }
  }
  return distinct_objects;
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

function get_webpage_uri() {
  return window.location.href;
}

function get_api_reponse(text) {
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
function get_locations() {
  var text = get_webpage_uri();
  return new Promise((resolve, reject) => {
    get_api_reponse(text)
      .then(JSON.parse)
      .then(
        function(response) {
          resolve(filter_duplicates(filter_locations(response), "spot"));
        },
        function(error) {
          reject(Error(error));
        }
      );
  });
}
