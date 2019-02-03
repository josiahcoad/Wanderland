import findAndReplaceDOMText from 'findandreplacedomtext';
import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './tooltip.css';

const CustomPopover = place => (
    <Popover id="popover-basic" title={place.title}>
        <div className="tooltipdiv">
            <img src={place.image} alt="" />
            <a
                href={place.link}
                className="badge badge-info mx-auto"
                target="_blank"
                rel="noopener noreferrer"
            >
                Wiki
            </a>
            <hr />
            <p>{place.summary}</p>
        </div>
    </Popover>
);

const Tooltip = ({ place }) => (
    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={CustomPopover(place)}>
        <button type="button" className="anchor-like-button">
            {place.title}
        </button>
    </OverlayTrigger>
);

export function insertTooltips(place, wrapClass) {
    const elements = document.getElementsByClassName(wrapClass);

    [].forEach.call(elements, (container) => {
        ReactDOM.render(<Tooltip place={place} />, container);
    });
}

export const createTooltips = (results) => {
    if (results.length !== 0) {
        results.forEach((result) => {
            const linkClass = `${result.name.replace(' ', '_')}_tooltip`;
            findAndReplaceDOMText(document.body, {
                find: result.name,
                wrap: 'span',
                wrapClass: linkClass,
            });
            insertTooltips(
                {
                    title: result.name,
                    link: result.lod.wikipedia,
                    image: result.image.thumbnail,
                    summary: result.abstract,
                },
                linkClass,
            );
        });
    } else {
        alert("Sorry we couldn't find any results for this page.");
    }
    return results;
};
