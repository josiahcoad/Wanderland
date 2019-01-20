/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ResultItemExpantion from './resultItemExpantion';

const ResultItem = ({ onClick, place, onRemove }) => (
    <li
        className="list-group-item result-item"
        onClick={(ev) => {
            if (ev.target.tagName === 'LI') {
                onClick();
            }
        }}
    >
        <button
            type="button"
            className="icon-button remove-button"
            onClick={onRemove}
        >
            <span className="glyphicon glyphicon-remove-circle" />
        </button>
        {' '}
        {place.name}
        <ResultItemExpantion place={place} />
    </li>
);

export default ResultItem;
