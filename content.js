//credit goes to Steven Frank of Cloud to Butt (https://github.com/panicsteve/cloud-to-butt/)

walk(document.body);

function walk(node) {
  // I stole this function from here:
  // http://is.gd/mwZp7E

  var child, next;

  switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3:
      handleText(node);
      break;
  }
}

function handleText(textNode) {
  var v = textNode.nodeValue;

  v = v.replace(/\bpasta\b/g, "caaaaarbs");
  v = v.replace(/\bbread\b/g, "caaaaarbs");
  v = v.replace(/\bBread\b/g, "Caaaaarbs");
  v = v.replace(/\bScones\b/g, "Caaaaarbs");
  v = v.replace(/\bBuns\b/g, "Caaaaarbs");
  v = v.replace(/\bspaghetti\b/g, "caaaaarbs");

  textNode.nodeValue = v;
}

get_locations();

function get_webpage_text() {
  // can extend when i find out how to encode text not in the URI
  return document.body.innerText.substring(0, 1000);
}

const location_types = [
  "http://dbpedia.org/ontology/City",
  "http://dbpedia.org/ontology/Settlement",
  "http://dbpedia.org/ontology/PopulatedPlace",
  "http://dbpedia.org/ontology/Place",
  "http://dbpedia.org/ontology/Location"
];

function get_api_reponse(text) {
  return new Promise((resolve, reject) => {
    const Http = new XMLHttpRequest();
    const params =
      "&include=image%2Calternate_labels%2Ctypes%2Cabstract%2Ccategories%2Clod&token=7a037e59dae14528905d167a365da3a5";
    const url =
      "https://api.dandelion.eu/datatxt/nex/v1/?lang=en&text=" +
      encodeURI(text) +
      params;
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
  var text = get_webpage_text();
  get_api_reponse(text).then(JSON.parse).then(
    function(response) {
      console.log("Success!", response);
    },
    function(error) {
      console.error("Failed!", error);
    }
  );
}

// function annotate_webpage() {
//   get_json_response
// }