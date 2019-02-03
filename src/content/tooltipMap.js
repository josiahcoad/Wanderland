import React from 'react';
import uuid from 'uuid';

const API_KEY = 'AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8';

const TooltipMap = ({ title }) => (
    <iframe
        width="500"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURI(title)}&key=${API_KEY}`}
        title={`google-map-${uuid.v4()}`}
    />
);

export default TooltipMap;
