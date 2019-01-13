// This code gets injected automatically into every page you go onto in Google Chrome.
// The functions here dynamically build dom elements that are used to insert into the page.

var RESULTSBOX;

// this is the box at the top of the page that the extracts appear in
function makeResultsBox() {
    var RESULTSBOX = document.createElement("div");
    var header = document.createElement("h2");
    RESULTSBOX.appendChild(header);
    return RESULTSBOX;
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
    return getUniqueLocationsFromCurrentPage().then(
        results => {
            if (results.length != 0) {
                results.forEach(result => {
                    searchAndReplaceWithTooltip(document.body, {
                        search: result.spot,
                        link: result.lod.wikipedia,
                        image: result.image.thumbnail,
                        summary: result.abstract
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

// ***************** EXECUTE THIS ON PAGE LOAD ***************** //
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // add a results box to the top of the page
    // add an event listener to wait for a button press of the
    // activate button in the extension.js code.
    if (request.message == "ACTIVATE") {
        // if (document.querySelector("body") != null) {
        //     RESULTSBOX = makeResultsBox();
        //     $("body").prepend(RESULTSBOX);
        // }
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