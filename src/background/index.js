function selectionTextListener(info) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: 'TEXT_SCAN',
                data: info.selectionText,
            }); // Handle The Response
        },
    );
}

const listenerFunctionMap = {
    selectionWanderland: selectionTextListener,
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'selectionWanderland',
        title: 'Wanderland',
        contexts: ['selection'],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    listenerFunctionMap[info.menuItemId](info, tab);
});
