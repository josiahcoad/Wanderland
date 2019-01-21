import React from 'react';
import { ListGroup } from 'react-bootstrap';
import uuid from 'uuid';
import ResultItem from './resultItem';
import { removeWhere } from '../../utils';
import './resultsList.css';

const ResultsList = ({ places, setPlaces, setSelectedPlace }) => (
    <ListGroup className="results-list">
        {places.map(place => (
            <ResultItem
                key={uuid.v4()}
                place={place}
                onClick={() => setSelectedPlace(place)}
                onRemove={() => setPlaces(removeWhere(places, 'name', place.name))}
            />
        ))}
    </ListGroup>
);

export default ResultsList;
