import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import PopupMap from './popupMap';
import ResultsList from './resultsList';
import './popup.css';

export default ({
    placesScraped, setLastPlacesScraped, setSelectedPlace, selectedPlace,
}) => (
    <Grid>
        {placesScraped.length !== 0 && (
            <>
                <Row>
                    <Col xs={7}>
                        {placesScraped.length !== 0 && (
                            <PopupMap
                                placesScraped={placesScraped}
                                selectedPlace={selectedPlace}
                                setSelectedPlace={setSelectedPlace}
                                setLastPlacesScraped={setLastPlacesScraped}
                            />
                        )}
                    </Col>
                    <Col xs={4} xsOffset={1}>
                        <ResultsList
                            places={placesScraped}
                            setPlaces={setLastPlacesScraped}
                            setSelectedPlace={setSelectedPlace}
                            selectedPlace={selectedPlace}
                        />
                    </Col>
                </Row>
            </>
        )}
    </Grid>
);
