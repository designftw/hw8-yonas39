// javascript: (function () {
//   document.body.style.paddingTop = "20px";
//   var removedElements = [];
//   var removalActive = true;
//   var currentHighlightedElement;

//   // Create button at the top corner of the page
//   function createButton(text, callback) {
//     var btn = document.createElement("button");
//     btn.innerHTML = text;
//     btn.style.position = "fixed";
//     btn.style.top = "10px";
//     btn.style.zIndex = "999999";
//     btn.style.color = "Blue";
//     btn.style.backgroundColor = "Orange";
//     btn.style.border = "1px solid black";
//     btn.style.padding = "5px";
//     btn.style.marginRight = "10px";
//     btn.onclick = callback;
//     document.body.appendChild(btn);
//     return btn;
//   }

//   // undo call back function
//   var undoButton = createButton("Undo", function () {
//     if (removedElements.length) {
//       var lastElement = removedElements.pop();
//       lastElement.parent.insertBefore(
//         lastElement.node,
//         lastElement.nextSibling
//       );
//     }
//   });

//   // End button remove all buttons and mouseover effect
//   var endButton = createButton("End", function () {
//     removalActive = false;
//     undoButton.remove();
//     endButton.remove();
//     document.removeEventListener("mousemove", highlightElement);
//   });

//   endButton.style.left = "calc(10px + " + undoButton.offsetWidth + "px)";

//   function highlightElement(event) {
//     if (currentHighlightedElement) {
//       currentHighlightedElement.style.outline = "";
//     }
//     var element = document.elementFromPoint(event.clientX, event.clientY);
//     if (element) {
//       currentHighlightedElement = element;
//       currentHighlightedElement.style.outline = "2px solid red";
//     }
//   }

//   document.addEventListener("mousemove", highlightElement);

//   document.addEventListener("click", function (event) {
//     if (!removalActive) return;
//     event.preventDefault();
//     event.stopPropagation();
//     if (currentHighlightedElement) {
//       var removedElement = {
//         node: currentHighlightedElement,
//         parent: currentHighlightedElement.parentNode,
//         nextSibling: currentHighlightedElement.nextSibling,
//       };
//       removedElements.push(removedElement);
//       currentHighlightedElement.remove();
//       currentHighlightedElement = null;
//     }
//   });

//   // when Escape key is pressed it exists the bokmarklet mode
//   document.addEventListener("keyup", function (event) {
//     if (event.key === "Escape") {
//       removalActive = false;
//       undoButton.remove();
//       endButton.remove();
//       document.removeEventListener("mousemove", highlightElement);
//     }
//   });
// })();

javascript: (function () {
  document.body.style.paddingTop = "20px";

  var removedElements = [];
  var removalActive = true;
  var currentHighlightedElement;

  function createButton(text, callback) {
    var btn = document.createElement("button");
    btn.innerHTML = text;
    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.zIndex = "999999";
    btn.style.color = "Blue";
    btn.style.backgroundColor = "Orange";
    btn.style.border = "1px solid black";
    btn.style.padding = "5px";
    btn.style.marginRight = "10px";
    btn.onclick = callback;
    document.body.appendChild(btn);
    return btn;
  }

  var undoButton = createButton("Undo", function () {
    if (removedElements.length) {
      var lastElement = removedElements.pop();
      lastElement.parent.insertBefore(
        lastElement.node,
        lastElement.nextSibling
      );
    }
  });

  var endButton = createButton("End", function () {
    removalActive = false;
    undoButton.remove();
    endButton.remove();
    resetButton.remove();
    document.removeEventListener("mousemove", highlightElement);
  });

  //Reset button to restore all removed Elements
  var resetButton = createButton("Reset", function () {
    while (removedElements.length) {
      var restoredElement = removedElements.pop();
      restoredElement.parent.insertBefore(
        restoredElement.node,
        restoredElement.nextSibling
      );
    }
  });

  endButton.style.left = "calc(10px + " + undoButton.offsetWidth + "px)";
  resetButton.style.left =
    "calc(10px +" + (undoButton.offsetWidth + endButton.offsetWidth) + "px)";

  function highlightElement(event) {
    if (currentHighlightedElement) {
      currentHighlightedElement.style.outline = "";
    }
    var element = document.elementFromPoint(event.clientX, event.clientY);
    if (element) {
      currentHighlightedElement = element;
      currentHighlightedElement.style.outline = "2px solid red";
    }
  }

  document.addEventListener("mousemove", highlightElement);

  document.addEventListener("click", function (event) {
    if (!removalActive) return;
    event.preventDefault();
    event.stopPropagation();
    if (currentHighlightedElement) {
      var removedElement = {
        node: currentHighlightedElement,
        parent: currentHighlightedElement.parentNode,
        nextSibling: currentHighlightedElement.nextSibling,
      };
      removedElements.push(removedElement);
      currentHighlightedElement.remove();
      currentHighlightedElement = null;
    }
  });

  document.addEventListener("keyup", function (event) {
    if (event.key === "Escape") {
      removalActive = false;
      undoButton.remove();
      endButton.remove();
      resetButton.remove();
      document.removeEventListener("mousemove", highlightElement);
    }
  });
})();
