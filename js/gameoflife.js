const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gsize = 50;  // gsize of the grid (50x50)
let grid = [];

// Initialize the grid with random life
for (let i = 0; i < gsize; i++) {
    grid[i] = [];
    for (let j = 0; j < gsize; j++) {
        grid[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
}

function gameOfLife() {
    let nextGrid = JSON.parse(JSON.stringify(grid));  // Copy the current grid

    for (let i = 0; i < gsize; i++) {
        for (let j = 0; j < gsize; j++) {
            let neighbors = getNeighborCount(i, j);

            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;  // Die
            } else if (grid[i][j] === 0 && neighbors === 3) {
                nextGrid[i][j] = 1;  // Born
            }
        }
    }

    grid = nextGrid;  // Update the grid with the next generation

    drawGrid();
    requestAnimationFrame(gameOfLife);
}

function getNeighborCount(x, y) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;

            let newX = x + i;
            let newY = y + j;

            if (newX >= 0 && newY >= 0 && newX < gsize && newY < gsize && grid[newX][newY] === 1) {
                count++;
            }
        }
    }

    return count;
}

function drawGrid() {
    context.clearRect(0, 0, gsize, gsize);

    for (let i = 0; i < gsize; i++) {
        for (let j = 0; j < gsize; j++) {
            if (grid[i][j] === 1) {
                context.fillStyle = '#000000';  // Black for life
            } else {
                context.fillStyle = '#FFFFFF';  // White for no life
            }

            context.fillRect(i, j, 1, 1);
        }
    }
}

gameOfLife();  // Start the game
