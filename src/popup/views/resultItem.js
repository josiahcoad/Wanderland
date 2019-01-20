import React from 'react';
import { Panel } from 'react-bootstrap';
import ResultItemExpantion from './resultItemExpantion';

const ResultItem = ({ eventKey, place, onRemove }) => (
    <Panel
        eventKey={eventKey}
        key={place.name}
    >
        <Panel.Toggle>
            <Panel.Heading>
                <button type="button" className="icon-button remove-button" onClick={onRemove}>
                    <span className="glyphicon glyphicon-remove-circle" />
                </button>
                <Panel.Title>
                    {' '}
                    {place.name}
                </Panel.Title>
            </Panel.Heading>
        </Panel.Toggle>
        <Panel.Collapse>
            <Panel.Body>
                <ResultItemExpantion place={place} />
            </Panel.Body>
        </Panel.Collapse>
    </Panel>
);

export default ResultItem;
