var RECBOX, SPINNER;

function makeRecbox() {
  var recbox = document.createElement("div");
  recbox.id = "recbox";
  var spinner = document.createElement("div");
  spinner.classList += "recspinner";
  spinner.innerHTML =
    '<div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div>';

  recbox.innerHTML = "<h2>Getting some cool things for you...</h2>";
  recbox.classList += " rec-group ";
  recbox.appendChild(spinner);
  return recbox;
}

function displayWarning(message) {
  RECBOX.innerHTML = "<h2>" + message + "</h2>";
  RECBOX.classList += " warning ";
}

function displayError(message) {
  RECBOX.innerHTML = "<h2>" + message + "</h2>";
  RECBOX.classList += " error ";
}

function insertAtBodyTop(node) {
  document.body.prepend(node);
}

function create_extract(result) {
  // create thumbnails of entity
  var extract = document.createElement("div");
  extract.className = "extract";
  var abstract = document.createElement("div");
  abstract.classList.add("abstract");
  abstract.innerText = result.abstract.substring(0, 15) + "...";
  var image = document.createElement("img");
  image.className = "result_img";
  image.src = result.image.thumbnail;
  var wikilink = document.createElement("a");
  wikilink.title = result.spot + " wikipedia";
  var link_text = document.createTextNode(result.spot + " wikipedia");
  wikilink.appendChild(link_text);
  wikilink.href = result.lod.wikipedia;
  extract.appendChild(image);
  extract.appendChild(wikilink);
  extract.appendChild(abstract);
  return extract;
}

function create_extracts(results) {
  var extracts = document.createElement("div");
  extracts.className = "extracts";
  results.map(create_extract).forEach(x => extracts.appendChild(x));
  return extracts;
}

// ***************** EXECUTE THIS ON LOAD ***************** //
if (document.querySelector("body") != null) {
  RECBOX = makeRecbox();
  insertAtBodyTop(RECBOX);
  SPINNER = RECBOX.querySelector(".recspinner");
  get_locations().then(
    results => {
      SPINNER.style.display = "none";
      if (results.length != 0) {
        RECBOX.querySelector("h2").innerText =
          "Here are the locations mentioned on the page.";
        RECBOX.appendChild(create_extracts(results));        
      } else {
        RECBOX.querySelector("h2").innerText =
          "Sorry we couldn't find any results for this page.";
      }
      console.log(results);
    },
    error => {
      console.log("Error! " + error);
    }
  );
}
