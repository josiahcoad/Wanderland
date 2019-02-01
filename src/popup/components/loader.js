import React from 'react';
import { PulseLoader } from 'react-spinners';
import './loader.css';

const Loader = () => (
    <div className="loader">
        <PulseLoader
            className="loader"
            sizeUnit="px"
            size={50}
            color="#ec7c93"
            loading
        />
    </div>
);

export default Loader;
