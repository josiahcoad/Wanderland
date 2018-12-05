// traverse the node (i.e. document.body) to find every place there
// is text matching the search term and then replace it with an anchor
// tag with "link" and the search term as the clickable text.

function searchAndReplaceWithTooltip(node, data) {
    var search = data.search
    if (node.nodeType === 1){
        // (Element node)
        if(node = node.firstChild) {
            traverseNodeAndReplace(node, data)
        }
    } else if (node.nodeType === 3) {
        // (Text node)
        if (new RegExp(search, "gi").test(node.data)) {
            // Do something interesting here
            wrapMatchesInNodeWithTooltip(node, data);
        }
    }
}

function traverseNodeAndReplace(node, data){
    do {
        // Recursively call traverseChildNodes
        // on each child node
        searchAndReplaceWithTooltip(node, data);
    } while ((node = node.nextSibling));
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
