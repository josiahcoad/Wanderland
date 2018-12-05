// traverse the node (i.e. document.body) to find every place there
// is text matching the search term and then replace it with an anchor
// tag with "link" and the search term as the clickable text.
function searchAndReplace(node, search, link) {
    var next;

    if ((node.nodeType === 1) && (node = node.firstChild)) {
        // (Element node)
        do {
            // Recursively call traverseChildNodes
            // on each child node
            next = node.nextSibling;
            searchAndReplace(node, search, link);
        } while ((node = next));
    } else if (node.nodeType === 3) {
        // (Text node)
        if (new RegExp(search, "gi").test(node.data)) {
            // Do something interesting here
            wrapMatchesInNode(node, search, link);
        }
    }
}

// wrap a text node in some DOM element
function wrapMatchesInNode(textNode, search, link) {
    var temp = document.createElement("div");
    temp.innerHTML = textNode.data.replace(
        new RegExp(search, "gi"),
        `<a href="${link}">${search}</a>`
    );
    while (temp.firstChild) {
        textNode.parentNode.insertBefore(temp.firstChild, null);
    }
    textNode.parentNode.removeChild(textNode);
}

function searchAndReplaceWithTooltip(node, data) {
    var next;
    var search = data.search
    var link = data.link
    if ((node.nodeType === 1) && (node = node.firstChild)) {
        // (Element node)
        do {
            // Recursively call traverseChildNodes
            // on each child node
            next = node.nextSibling;
            searchAndReplaceWithTooltip(node, data);
        } while ((node = next));
    } else if (node.nodeType === 3) {
        // (Text node)
        if (new RegExp(search, "gi").test(node.data)) {
            // Do something interesting here
            console.log(`found match on ${search}!`);
            wrapMatchesInNodeWithTooltip(node, data);
        }
    }
}

// wrap a text node in some DOM element
function wrapMatchesInNodeWithTooltip(textNode, data) {
    var search = data.search
    var linkClass = search + "_stw_att"
    var link = data.link
    var temp = document.createElement("div");
    temp.innerHTML = textNode.data.replace(
        new RegExp(search, "gi"),
        `<a class="${linkClass}" href="${link}">${search}</a>`
    );
    while (temp.firstChild) {
        textNode.parentNode.insertBefore(temp.firstChild, null);
    }
    textNode.parentNode.removeChild(textNode);
    InitializeTooltip(data, linkClass)
}
