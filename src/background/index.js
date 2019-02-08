import {
    CONTEXT_MENU_TITLE,
    LOOKUP_PLACE_TITLE,
    SCAN_PARAGRAPH_TITLE,
    CONTEXT_MENU_ID,
    LOOKUP_PLACE_ID,
    SCAN_PARAGRAPH_ID,
} from './constants.js';
import { LOOKUP_PLACE, SCAN_PARAGRAPH } from '../extensionMessageTypes';

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
        title: CONTEXT_MENU_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: LOOKUP_PLACE_ID,
        parentId: CONTEXT_MENU_ID,
        title: LOOKUP_PLACE_TITLE,
        contexts: ['selection'],
    });
    chrome.contextMenus.create({
        id: SCAN_PARAGRAPH_ID,
        parentId: CONTEXT_MENU_ID,
        title: SCAN_PARAGRAPH_TITLE,
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    listenerFunctionMap[info.menuItemId](info, tab);
});
