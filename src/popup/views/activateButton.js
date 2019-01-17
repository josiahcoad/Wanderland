import React, { Component } from 'react';
import './activateButton.css';
import { Button, LinearProgress } from '@material-ui/core';

const SUCCESS = 'SUCCESS';
const ACTIVATE = 'ACTIVATE';

class ActivateButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loaded: false,
            error: false,
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.getLoadingStatusText = this.getLoadingStatusText.bind(this);
    }

    getLoadingStatusText() {
        if (this.state.error) return 'Error';
        if (this.state.loaded) return 'Loaded';
        return 'Activate';
    }

    // Use google's extension api to send an "ACTIVATE" message to the page/tab you're currently on.
    // Wait for a reponse and if the reponse is a SUCCESS then set the button with id "activate" to
    // show "loaded". Until a response is received, set the button text to "loading".
    sendMessage() {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: ACTIVATE }, (response) => {
                    if (response && response.message === SUCCESS) {
                        this.setState({
                            loading: false,
                            loaded: true,
                        });
                        this.props.setPlacesScraped(response.placesScraped);
                    } else {
                        this.setState({
                            loading: false,
                            error: true,
                        });
                    }
                });
            },
        );
        this.setState({ loading: true });
    }

    render() {
        return this.state.loading ? (
            <LinearProgress />
        ) : (
            <Button className="activateButton" onClick={this.sendMessage} color="primary">
                {this.getLoadingStatusText()}
            </Button>
        );
    }
}

export default ActivateButton;
