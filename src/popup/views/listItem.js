/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const ListItem = ({ children, onClick }) => (
    <li
        className="list-group-item list-item"
        onClick={(ev) => {
            if (ev.target.tagName === 'LI') {
                onClick();
            }
        }}
    >
        {children}
    </li>
);

export default ListItem;
