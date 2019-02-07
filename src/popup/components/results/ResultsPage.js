import React from 'react';
import {
    Button, Col, Glyphicon, Grid, Row,
} from 'react-bootstrap';
import PopupMap from './PopupMap';
import ResultsList from './ResultsList';
import './ResultsPage.css';

function getButtonText(loading, reloadNeeded) {
    if (loading) {
        return 'Loading...';
    }
    if (reloadNeeded) {
        return 'Please Refresh';
    }
    return (
        <>
            <Glyphicon glyph="search" />
            {' '}
Scan Page
        </>
    );
}

export default props => (
    <Grid className="results-page">
        <Row>
            <Col xs={7}>
                {props.placesScraped.length === 0 ? (
                    <div className="popup-map-placeholder" />
                ) : (
                    <PopupMap
                        placesScraped={props.placesScraped}
                        selectedPlace={props.selectedPlace}
                        setSelectedPlace={props.setSelectedPlace}
                        setLastPlacesScraped={props.setLastPlacesScraped}
                    />
                )}
            </Col>
            <Col xs={4} xsOffset={1}>
                <Button
                    onClick={props.onActivate}
                    disabled={props.loading || props.refreshNeeded}
                    className="activate-button"
                >
                    {getButtonText(props.loading, props.reloadNeeded)}
                </Button>
                {props.placesScraped.length !== 0 && (
                    <ResultsList
                        places={props.placesScraped}
                        setPlaces={props.setLastPlacesScraped}
                        setSelectedPlace={props.setSelectedPlace}
                        selectedPlace={props.selectedPlace}
                    />
                )}
            </Col>
        </Row>
    </Grid>
);
