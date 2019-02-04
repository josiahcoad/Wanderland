import React, { Component } from 'react';
import Loader from './loader';
import PopupNavbar from './navbar';
import ResultsPage from './resultsPage';
import FeedbackForm from './feedbackForm';
import './popup.css';

const SUCCESS = 'SUCCESS';
const ACTIVATE = 'ACTIVATE';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: [],
            selectedPlace: {},
            loading: false,
            error: false,
            showFeedbackForm: false,
        };
        this.setLastPlacesScraped = this.setLastPlacesScraped.bind(this);
        this.setSelectedPlace = this.setSelectedPlace.bind(this);
        this.sendMessageToScrapePage = this.sendMessageToScrapePage.bind(this);
        this.toggleShowFeedbackForm = this.toggleShowFeedbackForm.bind(this);
    }

    componentDidMount() {
        chrome.storage.local.get(['lastPlacesScraped'], (result) => {
            if (result.lastPlacesScraped !== undefined && result.lastPlacesScraped !== null) {
                this.setState({ placesScraped: result.lastPlacesScraped });
            }
        });
    }

    setLastPlacesScraped(places) {
        this.setState({ placesScraped: places });
        chrome.storage.local.set({ lastPlacesScraped: places });
    }

    setSelectedPlace(place) {
        this.setState({ selectedPlace: place });
    }

    toggleShowFeedbackForm() {
        this.setState(prevState => ({
            showFeedbackForm: !prevState.showFeedbackForm,
        }));
    }

    // Use google's extension api to send an "ACTIVATE" message to the page/tab you're currently on.
    // Wait for a reponse and if the reponse is a SUCCESS then set the button with id "activate" to
    // show "loaded". Until a response is received, set the button text to "loading".
    sendMessageToScrapePage() {
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
                        });
                        this.setLastPlacesScraped(response.placesScraped);
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
        return (
            <>
                <div className={this.state.loading ? 'popup-loading' : ''}>
                    <PopupNavbar
                        onActivate={this.sendMessageToScrapePage}
                        loading={this.state.loading}
                        error={this.state.error}
                        toggleShowFeedbackForm={this.toggleShowFeedbackForm}
                        showFeedbackForm={this.state.showFeedbackForm}
                    />
                    {this.state.showFeedbackForm ? (
                        <FeedbackForm />
                    ) : (
                        <ResultsPage
                            placesScraped={this.state.placesScraped}
                            setLastPlacesScraped={this.setLastPlacesScraped}
                            setSelectedPlace={this.setSelectedPlace}
                            selectedPlace={this.state.selectedPlace}
                        />
                    )}
                </div>
                {this.state.loading && <Loader />}
            </>
        );
    }
}

export default Popup;
