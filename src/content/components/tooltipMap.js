import React from 'react';
import uuid from 'uuid';

const API_KEY = 'AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8';

export default ({ name }) => (
    <iframe
        style={{ border: 0, height: '340px', width: '100%' }}
        src={`https://www.google.com/maps/embed/v1/place?q=${encodeURI(name)}&key=${API_KEY}`}
        title={`google-map-${uuid.v4()}`}
    >
        Loading...
    </iframe>
);
