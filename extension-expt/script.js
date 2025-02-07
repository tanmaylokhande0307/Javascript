document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');
    const canvas = document.getElementById('selection-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match the window dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let isSelecting = false;
    let startX, startY, endX, endY;

    content.addEventListener('mousedown', function (e) {
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;
        endX = startX;
        endY = startY;
        drawSelectionBox();
    });

    content.addEventListener('mousemove', function (e) {
        if (isSelecting) {
            endX = e.clientX;
            endY = e.clientY;
            drawSelectionBox();
        }
    });

    content.addEventListener('mouseup', function () {
        isSelecting = false;
        clearSelectionBox();

        // Get the bounding box of the selection
        const rect = {
            left: Math.min(startX, endX),
            top: Math.min(startY, endY),
            right: Math.max(startX, endX),
            bottom: Math.max(startY, endY),
        };

        // Extract and log the selected content
        const selectedElements = getElementsWithinSelection(rect);
        console.log('Selected Content:');
        selectedElements.forEach(element => {
            console.log(element.textContent.trim());
        });
    });

    function drawSelectionBox() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the selection box
        ctx.strokeStyle = 'blue'; // Border color
        ctx.lineWidth = 2; // Border width
        ctx.setLineDash([5, 5]); // Dashed border
        ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'; // Background color with transparency
        ctx.fillRect(
            Math.min(startX, endX),
            Math.min(startY, endY),
            Math.abs(endX - startX),
            Math.abs(endY - startY)
        );
        ctx.strokeRect(
            Math.min(startX, endX),
            Math.min(startY, endY),
            Math.abs(endX - startX),
            Math.abs(endY - startY)
        );
    }

    function clearSelectionBox() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function getElementsWithinSelection(rect) {
        const elements = content.querySelectorAll('*');
        const selectedElements = [];

        elements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            if (
                elementRect.left < rect.right &&
                elementRect.right > rect.left &&
                elementRect.top < rect.bottom &&
                elementRect.bottom > rect.top
            ) {
                selectedElements.push(element);
            }
        });

        return selectedElements;
    }
});
