// Content code gets injected automatically into every page you go onto in Google Chrome.
import { getUniqueLocationsFromCurrentPage, addGeometryToObject } from './api.js';
import { createTooltips } from './createTooltips.js';
import * as message from '../extensionMessageTypes';

function createTooltipsForPage() {
    return getUniqueLocationsFromCurrentPage()
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((results) => {
            if (results.length > 0) {
                createTooltips(results);
            } else {
                alert("Sorry we couldn't find any results for this page.");
            }
            return results;
        });
}

const placeAbsent = (places, name) => places.find(place => place.name === name) === undefined;

function updateStorageWithNewPlace(newPlace) {
    chrome.storage.local.get(['lastPlacesScraped'], ({ lastPlacesScraped }) => {
        if (Array.isArray(lastPlacesScraped) && placeAbsent(lastPlacesScraped, newPlace)) {
            chrome.storage.local.set({
                lastPlacesScraped: lastPlacesScraped.concat(newPlace),
            });
        }
    });
}

const emptyObject = {
    lod: {
        wikipedia: '',
    },
    abstract: '',
    image: {
        thumbnail: '',
    },
};

function createTooltipsForSinglePlace(textData) {
    return addGeometryToObject({ spot: textData })
        .then(result => ({ ...emptyObject, ...result }))
        .then((result) => {
            if (result.lat && result.lng) {
                createTooltips([result]);
                updateStorageWithNewPlace(result);
            } else {
                alert("Sorry we couldn't find any results for this selection.");
            }
        });
}

// ***************** EXECUTE THIS ON PAGE LOAD ***************** //
// eslint-disable-next-line no-console
console.log('Activating Wanderland');

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    // add a results box to the top of the page
    // add an event listener to wait for a button press of the
    // activate button in the extension.js code.
    if (request.message === message.PAGE_SCAN) {
        createTooltipsForPage()
            .then(results => sendResponse({
                message: message.PAGE_SCAN_SUCCESS,
                placesScraped: results,
            }))
            .catch(() => sendResponse({
                message: message.PAGE_SCAN_FAILED,
                placesScraped: [],
            }));
    } else if (request.message === message.TEXT_SCAN) {
        createTooltipsForSinglePlace(request.data);
    }
    return true;
});
