import React, {
    Component
} from 'react';
import './activateButton.css';

const SUCCESS = 'SUCCESS';
const ACTIVATE = 'ACTIVATE';

class ActivateButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loaded: false,
        };
        this.sendMessage = this.sendMessage.bind(this);
    }

    // Use google's extension api to send an "ACTIVATE" message to the page/tab you're currently on.
    // Wait for a reponse and if the reponse is a SUCCESS then set the button with id "activate" to
    // show "loaded". Until a response is received, set the button text to "loading".
    sendMessage() {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                message: ACTIVATE,
            }, (response) => {
                if (response && response.message === SUCCESS) {
                    this.setState({
                        loading: false,
                        loaded: true,
                    })
                }
            });
        });
        this.setState({ loading: true });
    }

    render() {
        return ( 
            <button 
                className="activateButton"
                onClick={this.sendMessage}
                disabled={this.state.loading || this.state.loaded}
                type="submit"
            >
                {this.state.loaded ? 'Loaded' : (this.state.loading ? 'Loading' : 'See The World')}
            </button>
        );
    }
}

export default ActivateButton;