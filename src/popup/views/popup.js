import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Loader from './loader';
import PopupMap from './popupMap';
import PopupNavbar from './navbar';
import ResultsList from './resultsList';
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
        };
        this.setLastPlacesScraped = this.setLastPlacesScraped.bind(this);
        this.setSelectedPlace = this.setSelectedPlace.bind(this);
        this.sendMessageToScrapePage = this.sendMessageToScrapePage.bind(this);
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
                    />
                    <Grid>
                        {this.state.placesScraped.length !== 0 && (
                            <>
                                <Row>
                                    <Col xs={7}>
                                        {this.state.placesScraped.length !== 0 && (
                                            <PopupMap
                                                placesScraped={this.state.placesScraped}
                                                selectedPlace={this.state.selectedPlace}
                                                setLastPlacesScraped={this.setLastPlacesScraped}
                                            />
                                        )}
                                    </Col>
                                    <Col xs={4} xsOffset={1}>
                                        <ResultsList
                                            places={this.state.placesScraped}
                                            setPlaces={this.setLastPlacesScraped}
                                            setSelectedPlace={this.setSelectedPlace}
                                        />
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Grid>
                </div>
                {this.state.loading && <Loader />}
            </>
        );
    }
}

export default Popup;
