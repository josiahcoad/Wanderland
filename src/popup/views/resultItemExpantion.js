import React from 'react';

const ResultItemExpantion = ({ place }) => (
    <div className="result-item-expansion">
        <img src={place.image.thumbnail} alt="" />
        <hr />
        <a href={place.link} className="badge badge-info mx-auto">
            Wiki
        </a>
        <p>{place.abstract}</p>
    </div>
);

export default ResultItemExpantion;
