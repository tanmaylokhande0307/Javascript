let resizableDiv = document.createElement("div");
resizableDiv.id = "element";
resizableDiv.className = "resizable";
document.body.appendChild(resizableDiv);

let style = document.createElement("style");
style.innerHTML = `
  .resizable {
    width: 120px;
    border-radius: 0.75rem;
    padding: 20px;
    background-color: transparent;
    border: 2px dashed grey;
    position: absolute;
    display: none;
    z-index:9999999;
  }
`;
document.head.appendChild(style);
