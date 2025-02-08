document.getElementById("startSelection").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["lib/interact.min.js", "selection.js"]
      });
    });
  });
  
document.getElementById("getContent").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getContent,
    });
  });
});

function startSelection() {
  document.getElementById("element").style.display = "block";
}

function getContent() {
  let selectionBox = document.getElementById("element").getBoundingClientRect();
  let selectedText = new Set();
  let treeWalker = document.createTreeWalker(
    document.body,
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
  alert("Selected Content:\n\n" + Array.from(selectedText).join("\n"));
}
