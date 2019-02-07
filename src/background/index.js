import { TEXT_SCAN } from '../extensionMessageTypes';
import { sendMessageToCurrentTab } from '../googleMessaging';

const listenerFunctionMap = {
    selectionWanderland: sendMessageToCurrentTab,
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'selectionWanderland',
        title: 'Lookup Place',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((data) => {
    listenerFunctionMap[data.menuItemId](TEXT_SCAN, data.selectionText);
});
