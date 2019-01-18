import React from 'react';
import { PropagateLoader } from 'react-spinners';
import './loader.css';

const Loader = () => (
    <div className="loader">
        <PropagateLoader
            className="loader"
            sizeUnit="px"
            size={60}
            color="#36D7B7"
            loading
        />
    </div>
);

export default Loader;
