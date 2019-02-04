// Content code gets injected automatically into every page you go onto in Google Chrome.
import {
    getUniqueLocationsFromCurrentPage,
    addGeometryToObject,
    getUniqueLocationsFromText,
} from './api.js';
import { createTooltips } from './tooltip.js';

function activatePage() {
    return getUniqueLocationsFromCurrentPage()
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((results) => {
            createTooltips(results);
        })
        .catch(error => alert(`Error! ${error}`));
}

function processRawTextForTooltips(textData) {
    return new Promise((resolve, reject) => {
        addGeometryToObject({ spot: textData })
            .then((results) => {
                const resultForTooltip = { // Fill with dummy data
                    ...results,
                    lod: {
                        wikipedia: '',
                    },
                    abstract: '',
                    image: {
                        thumbnail: '',
                    },
                };
                resolve(createTooltips([resultForTooltip]));
            })
            .catch((error) => {
                reject(Error(error));
            });
    });
}

function updateCacheWithNewPlaces(newPlaces) {
    chrome.storage.local.get(['lastPlacesScraped'], (storageResults) => {
        let finalResults = newPlaces;
        const previouslyScrapedPlaces = storageResults.lastPlacesScraped;
        if ((previouslyScrapedPlaces !== []) && (previouslyScrapedPlaces !== undefined)) {
            finalResults = previouslyScrapedPlaces.concat(newPlaces);
        }
        chrome.storage.local.set({ lastPlacesScraped: finalResults });
    });
}

function createTooltipsForText(textData) {
    return getUniqueLocationsFromText(textData)
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((results) => {
            const toolTipResults = createTooltips(results);

            if ((!toolTipResults) || (toolTipResults === [])) {
                processRawTextForTooltips(textData)
                    .then((rawTextResults) => {
                        updateCacheWithNewPlaces(rawTextResults);
                    })
                    .catch((error) => {
                        alert(error);
                        return [];
                    });
            } else {
                updateCacheWithNewPlaces(toolTipResults);
            }
        })
        .catch((error) => {
            alert(error);
            return [];
        });
}

// ***************** EXECUTE THIS ON PAGE LOAD ***************** //
// eslint-disable-next-line no-console
console.log('Activating Wanderland');

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    // add a results box to the top of the page
    // add an event listener to wait for a button press of the
    // activate button in the extension.js code.
    if (request.message === 'ACTIVATE') {
        activatePage()
            .then(results => sendResponse({
                message: 'SUCCESS',
                placesScraped: results,
            }))
            .catch(() => sendResponse({
                message: 'FAILED',
                placesScraped: [],
            }));
    } else if (request.message === 'CREATE_TOOLTIPS') {
        const textData = request.data;
        createTooltipsForText(textData)
            .catch((error) => {
                alert(error);
            });
    }
    return true;
});
