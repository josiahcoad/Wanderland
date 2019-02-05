import React from 'react';
import uuid from 'uuid';

const API_KEY = 'AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8';

const mapStyle = {
    border: 0,
    height: '340px',
    width: '100%',
    margin: '0px',
};

export default ({ name }) => (
    <iframe
        style={mapStyle}
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURI(name)}&key=${API_KEY}`}
        title={`google-map-${uuid.v4()}`}
    >
        Loading...
    </iframe>
);
