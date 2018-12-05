const SUCCESS = "SUCCESS";

function sendMessage() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            message: "ACTIVATE"
        }, function (response) {
            if (response && response.message == SUCCESS) {
                $("#activate").text("loaded");
            }
        });
    });
    $("#activate").prop("disabled", true);
    $("#activate").text("loading");
}

$("#activate").click(sendMessage);