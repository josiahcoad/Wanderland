import React from 'react';
import { PulseLoader } from 'react-spinners';
import './loader.css';

const Loader = () => (
    <div className="loader">
        <PulseLoader
            className="loader"
            sizeUnit="px"
            size={50}
            color="#36D7B7"
            loading
        />
    </div>
);

export default Loader;
