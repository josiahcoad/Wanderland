// ***************** LOGIC ***************** //

function filter_locations(response) {
  return response.annotations.filter(
    annotation =>
      annotation.types.filter(type => LOCATION_TYPES.indexOf(type) !== -1)
        .length !== 0
  );
}

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

function get_locations() {
  var text = get_webpage_uri();
  return new Promise((resolve, reject) => {
    get_api_reponse(text)
      .then(JSON.parse)
      .then(
        function(response) {
          // filter the response for only entities which are locations
          // and then remove any duplicates from that list.
          resolve(filter_duplicates(filter_locations(response), "spot"));
        },
        function(error) {
          reject(Error(error));
        }
      );
  });
}
