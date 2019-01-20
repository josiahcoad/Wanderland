import React from 'react';

const ResultItemExpantion = ({ place }) => (
    <div className="result-item-expansion">
        <img src={place.image.thumbnail} alt="" />
        <hr />
        {place.lod.wikipedia && (
            <a
                href={place.lod.wikipedia}
                className="badge badge-info mx-auto"
                target="_blank"
                rel="noopener noreferrer"
            >
                Wiki
            </a>
        )}
        <p>{place.abstract}</p>
    </div>
);

export default ResultItemExpantion;
