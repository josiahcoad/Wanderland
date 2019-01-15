// this is the js code for the little page that opens when you click on the extension icon
import './popup.css';

const SUCCESS = 'SUCCESS';
const ACTIVATE = 'ACTIVATE';

// Use google's extension api to send an "ACTIVATE" message to the page/tab you're currently on.
// Wait for a reponse and if the reponse is a SUCCESS then set the button with id "activate" to
// show "loaded". Until a response is received, set the button text to "loading".
function sendMessage() {
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: ACTIVATE,
        }, (response) => {
            if (response && response.message === SUCCESS) {
                document.getElementById('activateButton').innerText = 'loaded';
            }
        });
    });
    document.getElementById('activateButton').disabled = true;
    document.getElementById('activateButton').innerText = 'loading';
}

// add an event listener to the button with id "activate"
document.getElementById('activateButton').addEventListener('click', sendMessage);
