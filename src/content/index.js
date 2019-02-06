// Content code gets injected automatically into every page you go onto in Google Chrome.
import { getUniqueLocationsFromCurrentPage, getUniqueLocationsFromText, addGeometryToObject } from './api.js';
import { createTooltips } from './createTooltips.js';
import * as message from '../extensionMessageTypes';

function scanPage() {
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

function removeDuplicatePlaces(placesAlreadyScraped, newPlaces) {
    const filteredPlaces = newPlaces.filter((curNewPlace) => {
        const curPlaceName = curNewPlace.name;
        return placesAlreadyScraped.find(place => place.name === curPlaceName) === undefined;
    });

    return filteredPlaces;
}

function updateStorageWithNewPlaces(newPlaces) {
    chrome.storage.local.get(['lastPlacesScraped'], ({ lastPlacesScraped }) => {
        const filteredPlaces = removeDuplicatePlaces(lastPlacesScraped, newPlaces);
        let updatedPlaces = filteredPlaces;
        if (Array.isArray(lastPlacesScraped)) {
            updatedPlaces = filteredPlaces.concat(lastPlacesScraped);
        }
        chrome.storage.local.set({
            lastPlacesScraped: updatedPlaces,
        });
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

function scanSinglePlace(textData) {
    return addGeometryToObject({ spot: textData })
        .then(result => ({ ...emptyObject, ...result }))
        .then((result) => {
            if (result.lat && result.lng) {
                console.log(result);
                createTooltips([result]);
                updateStorageWithNewPlaces([result]);
            } else {
                alert("Sorry we couldn't find any results for this selection.");
            }
        });
}

function scanParagraph(textData) {
    return getUniqueLocationsFromText(textData)
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((results) => {
            if (results.length > 0) {
                createTooltips(results);
                updateStorageWithNewPlaces(results);
            } else {
                alert("Sorry we couldn't find any results for this page.");
            }
            return results;
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
        scanPage()
            .then(results => sendResponse({
                message: message.PAGE_SCAN_SUCCESS,
                placesScraped: results,
            }))
            .catch(() => sendResponse({
                message: message.PAGE_SCAN_FAILED,
                placesScraped: [],
            }));
    } else if (request.message === message.LOOKUP_PLACE) {
        scanSinglePlace(request.data);
    } else if (request.message === message.SCAN_PARAGRAPH) {
        scanParagraph(request.data);
    }
    return true;
});
