import './tooltip.css'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

export function initializeTooltip(data, linkClass) {
    content = `
    <div class = "tooltipdiv">
        <img src="${data.image}"/> 
        <h6 class="text-center"> ${data.search} </h6>
        <a href="${data.link}" class="badge badge-info mx-auto">Wiki</a>
    </div>
    `
    // the function tippy is defined here because the sourcecode for tippy
    // is already included in the manifest.json before including tooltip.js
    tippy(`.${linkClass}`, {
        content: content,
        theme: "light",
        interactive: true
    })
}