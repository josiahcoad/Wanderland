// ********* extension code **********
// this is the js code for the mini-page that opens when you click on the extension icon

const SUCCESS = "SUCCESS";

// Use google's extension api to send an "ACTIVATE" message to the page/tab you're currently on.
// Wait for a reponse and if the reponse is a SUCCESS then set the button with id "activate" to
// show "loaded". Until a response is received, set the button text to "loading".
function sendMessage() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: "ACTIVATE"
        }, function(response) {
            if (response && response.message == SUCCESS) {
                $("#activate").text("loaded");
            }
        });
    });
    $("#activate").prop("disabled", true);
    $("#activate").text("loading");
}

// add an event listener to the button with id "activate"
$("#activate").click(sendMessage);