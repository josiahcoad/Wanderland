import { LOOKUP_PLACE, SCAN_PARAGRAPH } from '../extensionMessageTypes';

function lookupPlaceListener({ selectionText }) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: LOOKUP_PLACE,
                data: selectionText,
            }); // Handle The Response
        },
    );
}

function scanParagraphListener({ selectionText }) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: SCAN_PARAGRAPH,
                data: selectionText,
            }); // Handle The Response
        },
    );
}

const listenerFunctionMap = {
    lookupPlaceWanderland: lookupPlaceListener,
    scanParagraphWanderland: scanParagraphListener,
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'wanderlandContextMenu',
        title: 'Wanderland',
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: 'lookupPlaceWanderland',
        parentId: 'wanderlandContextMenu',
        title: 'Lookup Place',
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: 'scanParagraphWanderland',
        parentId: 'wanderlandContextMenu',
        title: 'Scan Paragraph',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    listenerFunctionMap[info.menuItemId](info, tab);
});
