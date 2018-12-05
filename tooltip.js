function InitializeTooltip(data, linkClass) {
    console.log(data.image)
    content = `
    <div class = "tooltipdiv">
        <img src="${data.image}"/> 
        <h6 class="text-center"> ${data.search} </h6>
        <a href="${data.link}" class="badge badge-info mx-auto">Wiki</a>
    </div>
    `

    tippy(`.${linkClass}`, {
        content: content,
        theme: "light",
        interactive: true
    })
}