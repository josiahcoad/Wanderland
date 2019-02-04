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
            return results;
        })
        .catch(error => alert(`Error! ${error}`));
}

function singlePlaceLookup(textData) {
    return new Promise((resolve, reject) => {
        addGeometryToObject({ spot: textData })
            .then((results) => {
                const singlePlaceResult = {
                    // Fill with dummy data
                    ...results,
                    lod: {
                        wikipedia: '',
                    },
                    abstract: '',
                    image: {
                        thumbnail: '',
                    },
                };
                if (singlePlaceResult.lat && singlePlaceResult.lgn) {
                    createTooltips([singlePlaceResult]);
                    resolve([singlePlaceResult]);
                }
                resolve([]);
            })
            .catch((error) => {
                reject(Error(error));
            });
    });
}

function createTooltipsForText(textData) {
    return getUniqueLocationsFromText(textData)
        .then(results => Promise.all(results.map(addGeometryToObject)))
        .then((extractedResults) => {
            createTooltips(extractedResults);
            singlePlaceLookup(textData)
                .then((singlePlaceResult) => {
                    let chosenResults = extractedResults;
                    if (extractedResults === [] || !extractedResults) {
                        chosenResults = singlePlaceResult;
                    }
                    chrome.storage.local.get(['lastPlacesScraped'], (storageResults) => {
                        if (
                            storageResults.lastPlacesScraped !== []
                            && storageResults.lastPlacesScraped !== undefined
                        ) {
                            const updated = storageResults.lastPlacesScraped.concat(chosenResults);
                            chrome.storage.local.set({ lastPlacesScraped: updated });
                        }
                    });
                })
                .catch((error) => {
                    alert(error);
                    return [];
                });
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
        createTooltipsForText(textData).catch((error) => {
            alert(error);
        });
    }
    return true;
});
