import findAndReplaceDOMText from 'findandreplacedomtext';
import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './components/tooltip';


const TAGS_NOT_TO_COVER = ['a', 'span', 'button']; // Tags not to cover for tooltip wrapping
const NUM_PARENTS_TO_CHECK = 2; // Number of parents of a node to check for tooltip wrapping

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
