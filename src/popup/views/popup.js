/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
    Col, Grid, Row, ListGroup,
} from 'react-bootstrap';
import uuid from 'uuid';
import PopupMap from './popupMap';
import PopupNavbar from './navbar';
import { removeWhere } from '../../utils';
import './resultsList.css';

function ListItem({ children, onClick }) {
    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
            className="list-group-item list-item"
            onClick={(ev) => {
                if (ev.target.tagName === 'LI') {
                    onClick();
                }
            }}
        >
            {children}
        </li>
    );
}

const PopupMapBox = ({ placesScraped }) => (
    <div style={{ height: '400px' }}>
        {placesScraped.length === 0 ? (
            <div className="map-absent-box" />
        ) : (
            <PopupMap placesScraped={placesScraped} />
        )}
    </div>
);

const ResultsList = ({ places, setPlaces, setSelectedPlace }) => (
    <div className="results-list">
        <ListGroup>
            {places.map(place => (
                <ListItem key={uuid.v4()} onClick={() => setSelectedPlace(place)}>
                    <button
                        type="button"
                        className="icon-button"
                        onClick={() => setPlaces(removeWhere(places, 'name', place.name))}
                    >
                        <span className="glyphicon glyphicon-remove" />
                    </button>
                    {' '}
                    {place.name}
                </ListItem>
            ))}
        </ListGroup>
    </div>
);

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
            <Grid>
                <Row>
                    <PopupNavbar
                        setPlaces={this.setLastScrapedPlaces}
                        selectedPlace={this.state.selectedPlace}
                        setLastPlacesScraped={this.setLastPlacesScraped}
                    />
                </Row>
                {this.state.placesScraped.length !== 0 && (
                    <>
                        <Row>
                            <Col xs={8}>
                                <PopupMapBox placesScraped={this.state.placesScraped} />
                            </Col>
                            <Col xs={4}>
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
        );
    }
}

export default Popup;
