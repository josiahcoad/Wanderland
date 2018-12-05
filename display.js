var RESULTSBOX;

// this is the box at the top of the page that the extracts appear in
function makeResultsBox() {
    var RESULTSBOX = document.createElement("div");
    var header = document.createElement("h2");
    RESULTSBOX.appendChild(header);
    return RESULTSBOX;
}

// create a icon that shows the user results are loading
function createSpinner() {
    var spinner = document.createElement("div");
    spinner.classList += "spinner";
    spinner.innerHTML =
        '<div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div>';
    return spinner;
}

// create a summary of a result with an img, summary and wiki link
function createExtract(result) {
    var extract = document.createElement("div");
    extract.className = "extract";
    var summary = document.createElement("div");
    summary.classList.add("summary");
    summary.innerText = result.abstract.substring(0, 15) + "...";
    var image = document.createElement("img");
    image.className = "resultImg";
    image.src = result.image.thumbnail;
    var wikiLink = document.createElement("a");
    wikiLink.title = result.spot;
    var linkText = document.createTextNode(result.spot);
    wikiLink.appendChild(linkText);
    wikiLink.href = result.lod.wikipedia;
    extract.appendChild(image);
    extract.appendChild(wikiLink);
    extract.appendChild(summary);
    return extract;
}

// create a list of a result summary html nodes
function createExtracts(results) {
    var extracts = document.createElement("div");
    extracts.className = "extracts";
    results.map(createExtract).forEach(x => extracts.appendChild(x));
    return extracts;
}

function activatePage() {
    var spinner = createSpinner();
    RESULTSBOX.appendChild(spinner);
    return getLocations().then(
        results => {
            spinner.style.display = "none";
            if (results.length != 0) {
                results.forEach(x => {
                    searchAndReplaceWithTooltip(document.body, {
                                            search: x.spot,
                                            link: x.lod.wikipedia,
                                            image: x.image.thumbnail,
                                            summary: x.abstract
                   });
                });
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

// ***************** EXECUTE THIS ON LOAD ***************** //
if (document.querySelector("body") != null) {
    RESULTSBOX = makeResultsBox();
    $("body").prepend(RESULTSBOX);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "ACTIVATE") {
        activatePage().then(
            () => sendResponse({
                message: "SUCCESS"
            }),
            () => sendResponse({
                message: "FAILED"
            })
        );
    }
    return true;
});
