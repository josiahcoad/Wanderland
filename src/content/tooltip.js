import './tooltip.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import './tippy-light-theme.css';

export function initializeTooltip(data, linkClass) {
    const tooltipNode = `
    <div class = "tooltipdiv">
        <img src="${data.image}"/> 
        <h6 class="text-center">${data.search}</h6>
        <a href="${data.link}" class="badge badge-info mx-auto">Wiki</a>
    </div>`;
    tippy(`.${linkClass}`, {
        content: tooltipNode,
        theme: 'light',
        interactive: true,
    });
}
