// Ensure interact.js is loaded dynamically

// Create selection box if it doesn't exist
if (!document.getElementById("selection-box")) {
  let selectionBox = document.createElement("div");
  selectionBox.id = "selection-box";
  selectionBox.className = "resizable";
  document.body.appendChild(selectionBox);

  let style = document.createElement("style");
  style.innerHTML = `
      .resizable {
        width: 120px;
        height: 120px;
        border-radius: 0.75rem;
        background-color: transparent;
        border: 2px dashed grey;
        position: absolute;
        top: 100px;
        left: 100px;
        display: block;
      }
    `;
  document.head.appendChild(style);
}

// Make selection box draggable & resizable
if (!window.interact) {
  console.log("Interact.js is not loaded properly");
} else {
  console.log("Interact.js is available!");

  interact("#selection-box").draggable({
    listeners: {
      move(event) {
        let { x, y } = event.target.dataset;
        x = (parseFloat(x) || 0) + event.dx;
        y = (parseFloat(y) || 0) + event.dy;

        Object.assign(event.target.style, {
          transform: `translate(${x}px, ${y}px)`,
        });

        Object.assign(event.target.dataset, { x, y });
      },
    },
  });

  interact("#selection-box").resizable({
    edges: { left: true, right: true, top: true, bottom: true },
    listeners: {
      move(event) {
        let { width, height } = event.rect;
        Object.assign(event.target.style, {
          width: `${width}px`,
          height: `${height}px`,
        });
      },
    },
  });
}

function getContent() {
  let selectionBox = document.getElementById("element").getBoundingClientRect();
  let selectedText = new Set();
  let treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        console.log(node)
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
  alert("Selected Content:\n\n" + Array.from(selectedText).join("\n"));
}
