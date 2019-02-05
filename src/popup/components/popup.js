// Root Component for the Popup that appears when you click the extension icon
// in the chrome browser.
import React, { Component } from 'react';
import Loader from './loader';
import PopupNavbar from './navbar';
import ResultsPage from './results/resultsPage';
import FeedbackForm from './feedbackForm';
import AboutTeam from './aboutUs/aboutPage';
import './popup.css';
import { PAGE_SCAN, PAGE_SCAN_SUCCESS, PAGE_SCAN_FAILED } from '../../extensionMessageTypes';

const pages = {
    FEEDBACK: 'FEEDBACK',
    RESULTS: 'RESULTS',
    ABOUT_US: 'ABOUTUS',
};

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: [],
            selectedPlace: {},
            loading: false,
            reloadNeeded: false,
            currentPage: pages.RESULTS,
        };
        this.setSelectedPlace = this.setSelectedPlace.bind(this);
        this.setPage = this.setPage.bind(this);
        this.sendMessageToScrapePage = this.sendMessageToScrapePage.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    componentDidMount() {
        chrome.storage.local.get(['lastPlacesScraped'], (result) => {
            if (result.lastPlacesScraped !== undefined && result.lastPlacesScraped !== null) {
                this.setState({ placesScraped: result.lastPlacesScraped });
            }
        });
    }

    setSelectedPlace(place) {
        this.setState({ selectedPlace: place });
    }

    setPage(currentPage) {
        this.setState({ currentPage });
    }

    // Use google's extension api to send an "PAGE_SCAN" to the page/tab you're currently on.
    // Wait for a reponse and if the reponse is a "SUCCESS" then set the button with id "activate"
    // to show "loaded". Until a response is received, set the button text to "loading".
    sendMessageToScrapePage() {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { message: PAGE_SCAN }, (response) => {
                    if (!response) {
                        this.setState({
                            loading: false,
                            reloadNeeded: true,
                        });
                    } else if (response.message === PAGE_SCAN_SUCCESS) {
                        const { placesScraped } = response;
                        this.setState({
                            loading: false,
                            placesScraped,
                        });
                        chrome.storage.local.set({ lastPlacesScraped: placesScraped });
                    } else if (response.message === PAGE_SCAN_FAILED) {
                        // eslint-disable-next-line no-console
                        console.log('Error returned from content scripts!');
                    } else {
                        // eslint-disable-next-line no-console
                        console.log(`Unknown message ${response} from content scripts!`);
                    }
                });
            },
        );
        this.setState({ loading: true });
    }

    renderPage() {
        const resultsPageProps = {
            setLastPlacesScraped: this.setLastPlacesScraped,
            setSelectedPlace: this.setSelectedPlace,
            onActivate: this.sendMessageToScrapePage,
            placesScraped: this.state.placesScraped,
            selectedPlace: this.state.selectedPlace,
            loading: this.state.loading,
            reloadNeeded: this.state.reloadNeeded,
        };

        switch (this.state.currentPage) {
            case pages.FEEDBACK:
                return <FeedbackForm />;
            case pages.ABOUT_US:
                return <AboutTeam />;
            default:
                // case RESULTS:
                return <ResultsPage {...resultsPageProps} />;
        }
    }

    render() {
        return (
            <>
                <div className={this.state.loading ? 'popup-loading' : ''}>
                    <PopupNavbar setPage={this.setPage} currentPage={this.state.currentPage} />
                    {this.renderPage()}
                </div>
                {this.state.loading && <Loader />}
            </>
        );
    }
}

export default Popup;
