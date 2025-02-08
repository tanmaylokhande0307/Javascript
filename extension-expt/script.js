const el = document.getElementById("element");
document
  .getElementById("startSelection")
  .addEventListener("click", function () {
    document.getElementById("element").style.display = "block"; // Show the resizable div
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let elementWidth = element.offsetWidth;
    let elementHeight = element.offsetHeight;

    let centerX = (screenWidth - elementWidth) / 2;
    let centerY = (screenHeight - elementHeight) / 2;

    element.style.left = centerX + "px";
    element.style.top = centerY + "px";
  });

let xPosition = el.getBoundingClientRect().x;
let yPosition = el.getBoundingClientRect().y;

interact(".resizable").resizable({
  allowFrom: ":not(.resize-handle)", // Prevent dragging when interacting with the resize handle
  edges: { top: false, left: false, bottom: true, right: true },
  listeners: {
    move: function (event) {
      let { x, y } = event.target.dataset;

      x = (parseFloat(xPosition) || 0) - event.deltaRect.left;
      y = (parseFloat(yPosition) || 0) + event.deltaRect.bottom;

      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`,
      });

      Object.assign(event.target.dataset, { x, y });
    },
  },
});

interact(".resizable").draggable({
  listeners: {
    start(event) {
      console.log(event.type, event.target);
    },
    move(event) {
      xPosition += event.dx;
      yPosition += event.dy;

      event.target.style.transform = `translate(${xPosition}px, ${yPosition}px)`;
    },
  },
});

document.getElementById("getContent").addEventListener("click", function () {
  let selectionBox = document.getElementById("element").getBoundingClientRect();
  let selectedText = new Set();
  let points = getSelectionPoints(selectionBox);

  const treeWalker = document.createTreeWalker(
    document.body, // Using body instead of #root
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        let parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        let rect = parent.getBoundingClientRect();
        if (
          rect.bottom >= selectionBox.top &&
          rect.top <= selectionBox.bottom &&
          rect.right >= selectionBox.left &&
          rect.left <= selectionBox.right
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      },
    },
    false
  );

  while (treeWalker.nextNode()) {
    selectedText.add(treeWalker.currentNode.nodeValue.trim());
  }
  console.log("Selected Content:\n\n" + Array.from(selectedText).join("\n"));
});

function getSelectionPoints(box) {
  return [
    [box.left + 5, box.top + 5], // Top-left
    [box.right - 5, box.top + 5], // Top-right
    [box.left + 5, box.bottom - 5], // Bottom-left
    [box.right - 5, box.bottom - 5], // Bottom-right
    [box.left + box.width / 2, box.top + box.height / 2], // Center
  ];
}

// Check if the element is fully or partially inside the selection box
function isInsideSelection(node, selectionBox) {
  let rect = node.getBoundingClientRect();
  return !(
    rect.right < selectionBox.left ||
    rect.left > selectionBox.right ||
    rect.bottom < selectionBox.top ||
    rect.top > selectionBox.bottom
  );
}

// Check if an element is visible
function isElementVisible(node) {
  let style = window.getComputedStyle(node);
  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    style.opacity !== "0" &&
    node.offsetParent !== null
  );
}
