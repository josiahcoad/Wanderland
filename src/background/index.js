import * as CONSTANTS from './constants.js';
import { LOOKUP_PLACE, SCAN_PARAGRAPH } from '../extensionMessageTypes';

const CONTEXT_MENU_ID = 'wanderlandContextMenu';
const LOOKUP_PLACE_ID = 'lookupPlaceWanderland';
const SCAN_PARAGRAPH_ID = 'scanParagraphWanderland';

function lookupPlaceListener({ selectionText }) {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    },
    ([firstTab]) => {
        chrome.tabs.sendMessage(firstTab.id, {
            message: LOOKUP_PLACE,
            data: selectionText,
        }); // Handle The Response
    });
}

function scanParagraphListener({ selectionText }) {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    },
    ([firstTab]) => {
        chrome.tabs.sendMessage(firstTab.id, {
            message: SCAN_PARAGRAPH,
            data: selectionText,
        }); // Handle The Response
    });
}

const listenerFunctionMap = {
    [LOOKUP_PLACE_ID]: lookupPlaceListener,
    [SCAN_PARAGRAPH_ID]: scanParagraphListener,
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: CONTEXT_MENU_ID,
        title: CONSTANTS.CONTEXT_MENU_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: CONSTANTS.LOOKUP_PLACE_ID,
        parentId: CONTEXT_MENU_ID,
        title: CONSTANTS.LOOKUP_PLACE_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: CONSTANTS.SCAN_PARAGRAPH_ID,
        parentId: CONTEXT_MENU_ID,
        title: CONSTANTS.SCAN_PARAGRAPH_TITLE,
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    listenerFunctionMap[info.menuItemId](info, tab);
});
