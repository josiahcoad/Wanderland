import React from 'react';
import Loader from './Loader';


export default () => (
    <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSeYH2e5XDvBBQkPuTyqXxzn9Yrv4PBOlYo1U-t2wEiOrepb5g/viewform?embedded=true"
        width="100%"
        height="400"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Wandlerland Feedback Form"
    >
        <Loader />
    </iframe>
);
