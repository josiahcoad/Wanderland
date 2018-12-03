function makeRecbox(anchor) {
  var recbox = document.createElement("div");
  recbox.id = "recbox";
  var spinner = document.createElement("div");
  spinner.classList += "recspinner";
  spinner.innerHTML =
    '<div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div>';

  recbox.innerHTML = "<h2>Getting some other cool things for you...</h2>";
  recbox.classList += " rec-group ";
  recbox.appendChild(spinner);
  insertAfter(anchor, recbox);
  return recbox;
}
