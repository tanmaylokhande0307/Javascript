document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('selectionCanvas');
    const ctx = canvas.getContext('2d');
    const content = document.getElementById('content');
    const initSelectionButton = document.getElementById('initSelection');
    const getContentButton = document.getElementById('getContent');

    let isDrawing = false;
    let isResizing = false;
    let isDragging = false;
    let rect = { x: 100, y: 100, width: 200, height: 150 }; // Default rectangle
    let dragStartX, dragStartY, rectStartX, rectStartY;

    // Set canvas size to match the window size
    // Draw the rectangle
    function drawRectangle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }

    // Initialize the default rectangle
    initSelectionButton.addEventListener('click', () => {
        drawRectangle();
    });

    // Get content within the rectangle
    getContentButton.addEventListener('click', () => {
        const elements = content.querySelectorAll('*');
        const selectedContent = [];

        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            if (elementRect.left < rect.x + rect.width &&
                elementRect.right > rect.x &&
                elementRect.top < rect.y + rect.height &&
                elementRect.bottom > rect.y) {
                selectedContent.push(element.textContent || element.src);
            }
        });

        console.log('Selected Content:', selectedContent);
    });

    // Mouse down event
    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Check if the mouse is inside the rectangle
        if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
            mouseY >= rect.y && mouseY <= rect.y + rect.height) {
            // Check if the mouse is near the edges for resizing
            const edgeThreshold = 10;
            if (mouseX <= rect.x + edgeThreshold || mouseX >= rect.x + rect.width - edgeThreshold ||
                mouseY <= rect.y + edgeThreshold || mouseY >= rect.y + rect.height - edgeThreshold) {
                isResizing = true;
            } else {
                isDragging = true;
            }
            dragStartX = mouseX;
            dragStartY = mouseY;
            rectStartX = rect.x;
            rectStartY = rect.y;
        }
    });

    // Mouse move event
    canvas.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (isResizing) {
            // Resize the rectangle
            rect.width = Math.max(10, mouseX - rect.x);
            rect.height = Math.max(10, mouseY - rect.y);
            drawRectangle();
        } else if (isDragging) {
            // Move the rectangle
            rect.x = rectStartX + (mouseX - dragStartX);
            rect.y = rectStartY + (mouseY - dragStartY);
            drawRectangle();
        }
    });

    // Mouse up event
    canvas.addEventListener('mouseup', () => {
        isResizing = false;
        isDragging = false;
    });
});