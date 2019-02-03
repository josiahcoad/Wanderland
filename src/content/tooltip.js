import findAndReplaceDOMText from 'findandreplacedomtext';
import './tooltip.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './tippy-light-theme.css';

export function initializeTooltip(data, linkClass) {
    const tooltipNode = `
    <div class = "tooltipdiv">
        <img src="${data.image}"/> 
        <h6 class="text-center">${data.search}</h6>
        <a href="${data.link}" class="badge badge-info mx-auto" target="_blank"
        rel="noopener noreferrer">Wiki</a>
    </div>`;
    tippy(`.${linkClass}`, {
        content: tooltipNode,
        theme: 'light',
        interactive: true,
    });
}

export const createTooltips = (results) => {
    if (results.length !== 0) {
        results.forEach((result) => {
            const linkClass = `${result.name.replace(' ', '_')}_tooltip`;
            findAndReplaceDOMText(document.body, {
                find: result.name,
                wrap: 'a',
                wrapClass: linkClass,
            });
            initializeTooltip(
                {
                    search: result.name,
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
