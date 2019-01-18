import React from 'react';
import { ListGroup } from 'react-bootstrap';
import uuid from 'uuid';
import ResultItem from './resultItem';
import { removeWhere } from '../../utils';
import './resultsList.css';

const ResultsList = ({ places, setPlaces, setSelectedPlace }) => (
    <ListGroup className="results-list">
        {places.map(place => (
            <ResultItem key={uuid.v4()} onClick={() => setSelectedPlace(place)} place={place}>
                {/* <button
                    type="button"
                    className="icon-button add-button"
                    onClick={() => setPlaces(removeWhere(places, 'name', place.name))}
                >
                    <span className="glyphicon glyphicon-ok-circle" />
                </button> */}
                <button
                    type="button"
                    className="icon-button remove-button"
                    onClick={() => setPlaces(removeWhere(places, 'name', place.name))}
                >
                    <span className="glyphicon glyphicon-remove-circle" />
                </button>
                {' '}
                {place.name}
            </ResultItem>
        ))}
    </ListGroup>
);

export default ResultsList;
