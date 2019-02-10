import * as titles from './constants.js';
import { LOOKUP_PLACE, SCAN_PARAGRAPH } from '../extensionMessageTypes';

const CONTEXT_MENU_ID = 'wanderlandContextMenu';
const LOOKUP_PLACE_ID = 'lookupPlaceWanderland';
const SCAN_PARAGRAPH_ID = 'scanParagraphWanderland';

function contextMenuSelectionTextListener(selectionText, message) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        ([firstTab]) => {
            chrome.tabs.sendMessage(firstTab.id, {
                message,
                data: selectionText,
            }); // Handle The Response
        },
    );
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: CONTEXT_MENU_ID,
        title: titles.CONTEXT_MENU_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: LOOKUP_PLACE_ID,
        parentId: CONTEXT_MENU_ID,
        title: titles.LOOKUP_PLACE_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: SCAN_PARAGRAPH_ID,
        parentId: CONTEXT_MENU_ID,
        title: titles.SCAN_PARAGRAPH_TITLE,
        contexts: ['selection'],
    });
});

const idToMessageMap = {
    [LOOKUP_PLACE_ID]: LOOKUP_PLACE,
    [SCAN_PARAGRAPH_ID]: SCAN_PARAGRAPH,
};

chrome.contextMenus.onClicked.addListener(({ menuItemId, selectionText }) => {
    contextMenuSelectionTextListener(selectionText, idToMessageMap[menuItemId]);
});
