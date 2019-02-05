import React from 'react';
import { PanelGroup } from 'react-bootstrap';
import ResultItem from './ResultItem';
import { removeWhere } from '../../../utils';
import './ResultsList.css';

export default props => (
    <PanelGroup
        accordion
        activeKey={props.selectedPlace}
        onSelect={props.setSelectedPlace}
        id="results-list"
    >
        {props.places.map((place, i) => (
            <ResultItem
                // to get the accordian effect, we have to use key=index
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                eventKey={place}
                place={place}
                onRemove={() => {
                    props.setSelectedPlace(null);
                    props.setPlaces(removeWhere(props.places, 'name', place.name));
                }}
            />
        ))}
    </PanelGroup>
);
