// traverse the node (i.e. document.body) to find every place there
// is text matching the search term and then replace it with an anchor
// tag with "link" and the search term as the clickable text.
function searchAndReplace(node, search, link) {
    var next;

    if (node.nodeType === 1) {
        // (Element node)

        if ((node = node.firstChild)) {
            do {
                // Recursively call traverseChildNodes
                // on each child node
                next = node.nextSibling;
                searchAndReplace(node, search, link);
            } while ((node = next));
        }
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