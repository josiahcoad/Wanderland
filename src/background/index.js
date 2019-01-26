listenerFunctionMap = {
    selectionSTW : selectionTextListener
}

function selectionTextListener(info, tab){
    selectionText = info.selectionText;
    console.log(selectionText);
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "selectionSTW",
        title: "See The World",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    listenerFunctionMap[info.menuItemId](info, tab);
})