import React, { Component } from 'react';
import './activateButton.css';

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

class ActivateButton extends Component {
    render() {
        return (
            <button className="activateButton" onClick={sendMessage}>See The World</button>
        );
    }
}

export default ActivateButton;