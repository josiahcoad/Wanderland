import React from 'react';
import './ResultItemBody.css';

export default ({ place }) => (
    <div className="result-item-body">
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
