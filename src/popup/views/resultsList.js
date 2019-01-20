import React from 'react';
import uuid from 'uuid';
import { PanelGroup } from 'react-bootstrap';
import ResultItem from './resultItem';
import { removeWhere } from '../../utils';
import './resultsList.css';

const ResultsList = props => (
    <PanelGroup
        accordion
        activeKey={props.selectedPlace}
        onSelect={props.setSelectedPlace}
        id="results-list"
    >
        {props.places.map(place => (
            <ResultItem
                // to get the accordian effect, we have to use key=index
                // eslint-disable-next-line react/no-array-index-key
                key={uuid.v4()}
                eventKey={place}
                place={place}
                onRemove={() => props.setPlaces(removeWhere(props.places, 'name', place.name))}
            />
        ))}
    </PanelGroup>
);

export default ResultsList;
