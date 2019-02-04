import findAndReplaceDOMText from 'findandreplacedomtext';
import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './tooltip.css';

const TAGS_NOT_TO_COVER = ['a', 'span', 'button']; // Tags not to cover for tooltip wrapping
const NUM_PARENTS_TO_CHECK = 2; // Number of parents of a node to check for tooltip wrapping

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
    results.forEach((result) => {
        const linkClass = `${result.name.replace(' ', '_')}_tooltip`;
        findAndReplaceDOMText(document.body, {
            find: result.name,
            wrap: 'span',
            wrapClass: linkClass,
            forceContext: (element) => {
                let tagsNotAllowed = false;

                TAGS_NOT_TO_COVER.forEach((tag) => {
                    let elementToCheck = element;
                    let i = 0;
                    for (; i <= NUM_PARENTS_TO_CHECK; i += 1) {
                        if (elementToCheck.matches('html') || !elementToCheck) {
                            break;
                        }
                        tagsNotAllowed = tagsNotAllowed || elementToCheck.matches(tag);
                        elementToCheck = elementToCheck.parentElement;
                    }
                });
                return !tagsNotAllowed;
            },
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
};
