import React from 'react';
import { ListGroup } from 'react-bootstrap';
import uuid from 'uuid';
import ListItem from './listItem';
import { removeWhere } from '../../utils';
import './resultsList.css';

const ResultsList = ({ places, setPlaces, setSelectedPlace }) => (
    <ListGroup className="results-list">
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
);

export default ResultsList;
