var RESULTSBOX, SPINNER;

// this is the box at the top of the page that the extracts appear in
function makeResultsBox() {
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
function createExtract(result) {
  var extract = document.createElement("div");
  extract.className = "extract";
  var abstract = document.createElement("div");
  abstract.classList.add("abstract");
  abstract.innerText = result.abstract.substring(0, 15) + "...";
  var image = document.createElement("img");
  image.className = "resultImg";
  image.src = result.image.thumbnail;
  var wikiLink = document.createElement("a");
  wikiLink.title = result.spot + " wikipedia";
  var linkText = document.createTextNode(result.spot + " wikipedia");
  wikiLink.appendChild(linkText);
  wikiLink.href = result.lod.wikipedia;
  extract.appendChild(image);
  extract.appendChild(wikiLink);
  extract.appendChild(abstract);
  return extract;
}

// create a list of a result summary html nodes
function createExtracts(results) {
  var extracts = document.createElement("div");
  extracts.className = "extracts";
  results.map(createExtract).forEach(x => extracts.appendChild(x));
  return extracts;
}

// ***************** EXECUTE THIS ON LOAD ***************** //
if (document.querySelector("body") != null) {
  RESULTSBOX = makeResultsBox();
  document.body.prepend(RESULTSBOX);
  SPINNER = RESULTSBOX.querySelector(".spinner");
  getLocations().then(
    results => {
      SPINNER.style.display = "none";
      if (results.length != 0) {
        RESULTSBOX.querySelector("h2").innerText =
          "Here are the locations mentioned on the page.";
        RESULTSBOX.appendChild(createExtracts(results));
      } else {
        RESULTSBOX.querySelector("h2").innerText =
          "Sorry we couldn't find any results for this page.";
      }
    },
    error => {
      alert("Error! " + error);
    }
  );
}
