var RESULTSBOX, SPINNER;

// this is the box at the top of the page that the extracts appear in
function makeRESULTSBOX() {
  var RESULTSBOX = document.createElement("div");
  RESULTSBOX.id = "RESULTSBOX";
  var spinner = document.createElement("div");
  spinner.classList += "spinner";
  spinner.innerHTML =
    '<div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div>';

  RESULTSBOX.innerHTML = "<h2>Getting some cool things for you...</h2>";
  RESULTSBOX.classList += " rec-group ";
  RESULTSBOX.appendChild(spinner);
  return RESULTSBOX;
}

// create a summary of a result with an img, abstract and wiki link
function create_extract(result) {
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

// create a list of a result summary html nodes
function create_extracts(results) {
  var extracts = document.createElement("div");
  extracts.className = "extracts";
  results.map(create_extract).forEach(x => extracts.appendChild(x));
  return extracts;
}

// ***************** EXECUTE THIS ON LOAD ***************** //
if (document.querySelector("body") != null) {
  RESULTSBOX = makeRESULTSBOX();
  document.body.prepend(RESULTSBOX);
  SPINNER = RESULTSBOX.querySelector(".spinner");
  get_locations().then(
    results => {
      SPINNER.style.display = "none";
      if (results.length != 0) {
        RESULTSBOX.querySelector("h2").innerText =
          "Here are the locations mentioned on the page.";
        RESULTSBOX.appendChild(create_extracts(results));
      } else {
        RESULTSBOX.querySelector("h2").innerText =
          "Sorry we couldn't find any results for this page.";
      }
    },
    error => {
      allert("Error! " + error);
    }
  );
}
