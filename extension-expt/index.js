let startX, startY, endX, endY;
let selectionBox = document.createElement("div");
selectionBox.classList.add("selection-box");
document.body.appendChild(selectionBox);

document.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  startY = e.clientY;
  selectionBox.style.left = `${startX}px`;
  selectionBox.style.top = `${startY}px`;
  selectionBox.style.width = "0px";
  selectionBox.style.height = "0px";
  selectionBox.style.display = "block";
});

document.addEventListener("mousemove", (e) => {
  if (e.buttons !== 1) return;
  endX = e.clientX;
  endY = e.clientY;
  selectionBox.style.width = `${Math.abs(endX - startX)}px`;
  selectionBox.style.height = `${Math.abs(endY - startY)}px`;
  selectionBox.style.left = `${Math.min(startX, endX)}px`;
  selectionBox.style.top = `${Math.min(startY, endY)}px`;
});

document.addEventListener("mouseup", () => {
  const text = getTextWithinSelection(startX, startY, endX, endY);
  navigator.clipboard.writeText(text).then(() => {
    alert("Extracted text copied to clipboard: " + text);
  });
  selectionBox.style.display = "none";
});

function getTextWithinSelection(x1, y1, x2, y2) {
    console.log(x1, y1, x2, y2)
    let elements;
    if (document.elementsFromPoint) {
        elements = document.elementsFromPoint(Math.floor((x1 + x2) / 2), Math.floor((y1 + y2) / 2));
    }
  return elements.map(el => el.innerText).join("\n").trim();
}
