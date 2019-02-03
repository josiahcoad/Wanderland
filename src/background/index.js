function selectionTextListener(info, tab) {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: 'CREATE_TOOLTIPS',
                data: info.selectionText,
            }, (response) => {}); // Handle The Response
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