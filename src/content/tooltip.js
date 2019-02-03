import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import TooltipMap from './tooltipMap';
import './tooltip.css';

const CustomPopover = place => (
    <Popover id="popover-basic" title={place.title} style={{ width: '600px' }}>
        <div className="tooltipdiv">
            <TooltipMap title={place.title} />
            {/* <img src={place.image} alt="" />
            <a
                href={place.link}
                className="badge badge-info mx-auto"
                target="_blank"
                rel="noopener noreferrer"
            >
                Wiki
            </a>
            <hr />
            <p>{place.summary}</p> */}
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
