import React from 'react';
import { Panel } from 'react-bootstrap';
import ResultItemBody from './resultItemBody';
import './resultItem.css';

export default ({ eventKey, place, onRemove }) => (
    <Panel
        eventKey={eventKey}
        key={place.name}
        className="result-item"
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
                <ResultItemBody place={place} />
            </Panel.Body>
        </Panel.Collapse>
    </Panel>
);
