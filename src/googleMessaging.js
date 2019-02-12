// Use google's extension api to send an "PAGE_SCAN" to the page/tab you're currently on.
// Wait for a reponse and if the reponse is a "SUCCESS" then set the button with id "activate"
// to show "loaded". Until a response is received, set the button text to "loading".

// eslint-disable-next-line max-len
export const sendMessageToCurrentTab = (message, data) => new Promise((resolve, reject) => chrome.tabs.query(
    {
        active: true,
        currentWindow: true,
    },
    ([currentTab]) => {
        chrome.tabs.sendMessage(currentTab.id, { message, data }, (response) => {
            if (response) {
                resolve(response);
            } else {
                reject(response);
            }
        });
    },
));
