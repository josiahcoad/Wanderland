// Content code gets injected automatically into every page you go onto in Google Chrome.
import { getUniqueLocationsFromCurrentPage, getUniqueLocationsFromText, addGeometryToObject } from './api.js';
import { createTooltips } from './createTooltips.js';
import * as message from '../extensionMessageTypes';
import { showErrorToast, showNotificationToast } from '../toasts.js';
import { removeDuplicatesWith } from '../utils.js';

function scanPage() {
    return getUniqueLocationsFromCurrentPage()
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((results) => {
            if (results.length > 0) {
                createTooltips(results);
            } else {
                showErrorToast("Sorry we couldn't find any results for this page.");
            }
            return results;
        });
}

function removeDuplicatePlaces(placesAlreadyScraped, newPlaces) {
    const filteredPlaces = newPlaces.filter((curNewPlace) => {
        const curPlaceName = curNewPlace.name;
        return placesAlreadyScraped.find(place => place.name === curPlaceName) === undefined;
    });

    return filteredPlaces;
}

function updateStorageWithNewPlaces(newPlaces) {
    chrome.storage.local.get(['lastPlacesScraped'], ({ lastPlacesScraped }) => {
        const existing = Array.isArray(lastPlacesScraped) ? lastPlacesScraped : [];
        chrome.storage.local.set({
            lastPlacesScraped: (removeDuplicatesWith(existing, newPlaces, 'name')).concat(existing),
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
                createTooltips([result]);
                updateStorageWithNewPlaces([result]);
            } else {
                showErrorToast('Sorry we couldn\'t find any results for the selected place :(');
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
                showErrorToast('Sorry we couldn\'t find any results for the selection :(');
                showErrorToast('Try selecting just the location and use "Lookup Place" for better results');
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
        showNotificationToast('We\'re looking it up, just a second!');
        scanSinglePlace(request.data);
    } else if (request.message === message.SCAN_PARAGRAPH) {
        showNotificationToast('Scanning your selection, thanks for waiting!');
        scanParagraph(request.data);
    }
    return true;
});
