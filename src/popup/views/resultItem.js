/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import ResultItemExpantion from './resultItemExpantion';

const ResultItem = ({ children, onClick, place }) => (
    <li
        className="list-group-item result-item"
        onClick={(ev) => {
            if (ev.target.tagName === 'LI') {
                onClick();
            }
        }}
    >
        {children}
        <ResultItemExpantion place={place} />
    </li>
);

export default ResultItem;
