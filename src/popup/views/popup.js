import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import PopupMap from './popupMap';
import PopupNavbar from './navbar';
import ResultsList from './resultsList';

// const PopupMapBox = ({ placesScraped }) => (
//     <div style={{ height: '400px' }}>
//         {placesScraped.length !== 0 && <PopupMap placesScraped={placesScraped} />}
//     </div>
// );

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: [],
            selectedPlace: {},
        };
        this.setLastPlacesScraped = this.setLastPlacesScraped.bind(this);
        this.setSelectedPlace = this.setSelectedPlace.bind(this);
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

    render() {
        return (
            <>
                <PopupNavbar
                    setPlaces={this.setLastScrapedPlaces}
                    selectedPlace={this.state.selectedPlace}
                    setLastPlacesScraped={this.setLastPlacesScraped}
                />
                <Grid>
                    {this.state.placesScraped.length !== 0 && (
                        <>
                            <Row>
                                <Col xs={7}>
                                    {this.state.placesScraped.length !== 0 && (
                                        <PopupMap placesScraped={this.state.placesScraped} />
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
            </>
        );
    }
}

export default Popup;
