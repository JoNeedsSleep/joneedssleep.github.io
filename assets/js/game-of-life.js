// Conway's Game of Life Implementation

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const interactionCanvas = document.getElementById('interactionCanvas');
const interactionCtx = interactionCanvas.getContext('2d');
const startButton = document.getElementById('startButton');
const drawButton = document.getElementById('drawButton');
const clearButton = document.getElementById('clearButton');
const darkModeButton = document.getElementById('darkModeButton');
const container = document.querySelector('.container');

// Game state
let isRunning = false;
let isDrawMode = false;
let isDragging = false;
let isDarkMode = false;
let grid = [];
let cellSize = 20;
let rows, cols;
let lastCell = { row: -1, col: -1 };
let controlsRect = null;

// Initialize
function initialize() {
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    interactionCanvas.width = window.innerWidth;
    interactionCanvas.height = window.innerHeight;
    
    // Calculate rows and columns
    rows = Math.ceil(canvas.height / cellSize);
    cols = Math.ceil(canvas.width / cellSize);
    
    // Create empty grid
    grid = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Draw the empty grid
    draw();
    
    // Get the position of the controls for click detection
    updateControlsPosition();
    
    // Add event listeners
    startButton.addEventListener('click', toggleGame);
    drawButton.addEventListener('click', toggleDrawMode);
    clearButton.addEventListener('click', clearGrid);
    darkModeButton.addEventListener('click', toggleDarkMode);
    
    // Keyboard shortcut to exit draw mode (Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isDrawMode) {
            toggleDrawMode();
        }
    });
    
    // Mouse/Touchpad events - attach to interaction canvas
    interactionCanvas.addEventListener('mousedown', handlePointerStart);
    interactionCanvas.addEventListener('mousemove', handlePointerMove);
    interactionCanvas.addEventListener('mouseup', handlePointerEnd);
    interactionCanvas.addEventListener('mouseleave', handlePointerEnd);
    interactionCanvas.addEventListener('dblclick', handleCanvasDoubleClick);
    
    // Touch events - attach to interaction canvas
    interactionCanvas.addEventListener('touchstart', handlePointerStart);
    interactionCanvas.addEventListener('touchmove', handlePointerMove);
    interactionCanvas.addEventListener('touchend', handlePointerEnd);
    interactionCanvas.addEventListener('touchcancel', handlePointerEnd);
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        updateControlsPosition();
    });
    
    // Add click handler for the interaction canvas
    interactionCanvas.addEventListener('click', checkForControlsClick);
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        toggleDarkMode();
    }
}

// Update the position of the game controls for click detection
function updateControlsPosition() {
    const gameControls = document.querySelector('.game-controls');
    controlsRect = gameControls.getBoundingClientRect();
}

// Check if a click on the canvas should be treated as a click on the controls
function checkForControlsClick(e) {
    if (!isDrawMode) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    // Check if click is in the general area of the controls
    if (controlsRect && 
        x >= controlsRect.left - 20 && 
        x <= controlsRect.right + 20 && 
        y >= controlsRect.top - 20 && 
        y <= controlsRect.bottom + 20) {
        
        // Get positions of each button
        const drawButtonRect = drawButton.getBoundingClientRect();
        
        // Check if click is directly on the draw button
        if (x >= drawButtonRect.left && 
            x <= drawButtonRect.right && 
            y >= drawButtonRect.top && 
            y <= drawButtonRect.bottom) {
            // This is a click on the draw button - exit draw mode
            toggleDrawMode();
            e.stopPropagation();
        }
    }
}

// Clear the grid
function clearGrid() {
    // Stop the game if it's running
    if (isRunning) {
        toggleGame();
    }
    
    // Reset all cells to 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }
    
    // Update the display
    draw();
}

// Toggle game state
function toggleGame() {
    isRunning = !isRunning;
    if(isRunning) {
        startButton.textContent = 'Pause';
        startButton.classList.add('active');
        if(isEmpty()) {
            addRandomPattern();
        }
        gameLoop();
    } else {
        startButton.textContent = 'Start Game of Life';
        startButton.classList.remove('active');
    }
}

// Toggle draw mode
function toggleDrawMode() {
    isDrawMode = !isDrawMode;
    if(isDrawMode) {
        drawButton.textContent = 'Exit Draw Mode';
        drawButton.classList.add('active');
        interactionCanvas.classList.add('draw-mode');
        document.querySelector('.game-controls').style.pointerEvents = 'auto';
        if(isRunning) toggleGame(); // Pause if running
        
        // Add a visual cue about using Escape key
        const escapeText = document.createElement('div');
        escapeText.id = 'escape-hint';
        escapeText.textContent = 'Press ESC to exit draw mode';
        escapeText.style.position = 'fixed';
        escapeText.style.bottom = '10px';
        escapeText.style.left = '50%';
        escapeText.style.transform = 'translateX(-50%)';
        escapeText.style.background = 'rgba(0,0,0,0.7)';
        escapeText.style.color = 'white';
        escapeText.style.padding = '5px 10px';
        escapeText.style.borderRadius = '4px';
        escapeText.style.zIndex = '102';
        document.body.appendChild(escapeText);
    } else {
        drawButton.textContent = 'Draw Mode';
        drawButton.classList.remove('active');
        interactionCanvas.classList.remove('draw-mode');
        
        // Remove the escape hint if it exists
        const hint = document.getElementById('escape-hint');
        if (hint) {
            document.body.removeChild(hint);
        }
    }
}

// Check if grid is empty
function isEmpty() {
    return grid.every(row => row.every(cell => cell === 0));
}

// Add random pattern
function addRandomPattern() {
    // Random seed with 25% chance of alive cells
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() > 0.75 ? 1 : 0;
        }
    }
}

// Get coordinates from mouse or touch event
function getCoordinates(e) {
    const rect = interactionCanvas.getBoundingClientRect();
    let x, y;
    
    // Check if it's a touch event
    if (e.touches && e.touches.length) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    return { row, col };
}

// Handle pointer start (mouse down or touch start)
function handlePointerStart(e) {
    if (!isDrawMode) return;
    
    e.preventDefault(); // Prevent scrolling on touch devices
    isDragging = true;
    
    const { row, col } = getCoordinates(e);
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = 1;
        lastCell = { row, col };
        draw();
    }
}

// Handle pointer move (mouse move or touch move)
function handlePointerMove(e) {
    if (!isDrawMode || !isDragging) return;
    
    e.preventDefault(); // Prevent scrolling on touch devices
    
    const { row, col } = getCoordinates(e);
    
    // Only draw if it's a valid position and different from the last cell
    if (row >= 0 && row < rows && col >= 0 && col < cols &&
        (row !== lastCell.row || col !== lastCell.col)) {
        grid[row][col] = 1;
        
        // Interpolate between last cell and current cell for smooth drawing
        interpolateCells(lastCell, { row, col });
        lastCell = { row, col };
        draw();
    }
}

// Interpolate cells between two points for smooth drawing
function interpolateCells(from, to) {
    // Simple Bresenham's line algorithm
    const dx = Math.abs(to.col - from.col);
    const dy = Math.abs(to.row - from.row);
    const sx = from.col < to.col ? 1 : -1;
    const sy = from.row < to.row ? 1 : -1;
    let err = dx - dy;
    
    let currentRow = from.row;
    let currentCol = from.col;
    
    while(true) {
        if (currentRow >= 0 && currentRow < rows && currentCol >= 0 && currentCol < cols) {
            grid[currentRow][currentCol] = 1;
        }
        
        if (currentRow === to.row && currentCol === to.col) break;
        
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            currentCol += sx;
        }
        if (e2 < dx) {
            err += dx;
            currentRow += sy;
        }
    }
}

// Handle pointer end (mouse up or touch end)
function handlePointerEnd() {
    isDragging = false;
    lastCell = { row: -1, col: -1 }; // Reset last cell
}

// Handle double click (remove cell)
function handleCanvasDoubleClick(e) {
    if(!isDrawMode) return;
    
    const { row, col } = getCoordinates(e);
    
    if(row >= 0 && row < rows && col >= 0 && col < cols) {
        grid[row][col] = 0;
        draw();
    }
}

// Resize canvas
function resizeCanvas() {
    const oldGrid = [...grid];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    interactionCanvas.width = window.innerWidth;
    interactionCanvas.height = window.innerHeight;
    
    const oldRows = rows;
    const oldCols = cols;
    
    rows = Math.ceil(canvas.height / cellSize);
    cols = Math.ceil(canvas.width / cellSize);
    
    // Create new grid
    grid = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Copy old grid data
    for(let i = 0; i < Math.min(rows, oldRows); i++) {
        for(let j = 0; j < Math.min(cols, oldCols); j++) {
            grid[i][j] = oldGrid[i][j];
        }
    }
    
    draw();
}

// Game loop
function gameLoop() {
    if(!isRunning) return;
    
    update();
    draw();
    
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, 150); // Speed of the game - adjust as needed
}

// Update game state
function update() {
    const newGrid = Array(rows).fill().map(() => Array(cols).fill(0));
    
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            
            if(grid[i][j] === 1) {
                // Cell is alive
                if(neighbors < 2 || neighbors > 3) {
                    newGrid[i][j] = 0; // Dies
                } else {
                    newGrid[i][j] = 1; // Stays alive
                }
            } else {
                // Cell is dead
                if(neighbors === 3) {
                    newGrid[i][j] = 1; // Becomes alive
                }
            }
        }
    }
    
    grid = newGrid;
}

// Count neighbors
function countNeighbors(row, col) {
    let count = 0;
    
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(i === 0 && j === 0) continue;
            
            const r = (row + i + rows) % rows; // Wrap around
            const c = (col + j + cols) % cols; // Wrap around
            
            count += grid[r][c];
        }
    }
    
    return count;
}

// Draw the grid
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get computed color from CSS variables
    const cellColor = getComputedStyle(document.documentElement).getPropertyValue('--cell-color').trim();
    ctx.fillStyle = cellColor;
    
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            if(grid[i][j] === 1) {
                ctx.fillRect(j * cellSize, i * cellSize, cellSize - 1, cellSize - 1);
            }
        }
    }
}

// Toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if(isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeButton.setAttribute('aria-label', 'Toggle light mode');
        darkModeButton.classList.add('active');
    } else {
        document.documentElement.removeAttribute('data-theme');
        darkModeButton.setAttribute('aria-label', 'Toggle dark mode');
        darkModeButton.classList.remove('active');
    }
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    // Redraw game
    draw();
}

// Start when the page loads
window.onload = initialize; 