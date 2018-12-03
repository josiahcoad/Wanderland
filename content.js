get_locations();

// ***************** LOGIC ***************** //

function filter_locations(response) {
  return response.annotations.filter(
    annotation =>
      annotation.types.filter(type => LOCATION_TYPES.indexOf(type) !== -1)
        .length !== 0
  );
}

// ***************** API CALLS ***************** //

const LOCATION_TYPES = [
  "http://dbpedia.org/ontology/City",
  "http://dbpedia.org/ontology/Settlement",
  "http://dbpedia.org/ontology/PopulatedPlace",
  "http://dbpedia.org/ontology/Place",
  "http://dbpedia.org/ontology/Location"
];

const PARAMS =
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
  get_api_reponse(text)
    .then(JSON.parse)
    .then(
      function(response) {
        var locations = filter_locations(response);
        console.log("Success!", locations);
      },
      function(error) {
        console.error("Failed!", error);
      }
    );
}

// ***************** HTML PAGE MANAGMENT ***************** //
function insertAfter(self, node) {
  if (!self.parentNode) {
    return false;
  }

  if (self.previousSibling != null) {
    self.parentNode.insertBefore(node, self.previousSibling);
  } else {
    self.parentNode.appendChild(node);
  }
}

function insertBefore(self, node) {
  if (!self.parentNode) {
    return false;
  }

  if (self.nextSibling != null) {
    self.parentNode.insertAfter(node, self.nextSibling);
  } else {
    self.parentNode.appendChild(node);
  }
}

function insertInside(self, node) {
  if (!self.parentNode) {
    return false;
  }
  if (self.nextSibling != null) {
    self.parentNode.appendChild(node);
  }
}
