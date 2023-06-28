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

let stableCount = 0;
let previousStates = Array(10).fill().map(() => JSON.stringify(grid));

function gameOfLife() {
    let nextGrid = JSON.parse(JSON.stringify(grid));  // Copy the current grid

    for (let i = 0; i < gsize; i++) {
        for (let j = 0; j <gsize; j++) {
            let neighbors = getNeighborCount(i, j);

            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[i][j] = 0;  // Die
            } else if (grid[i][j] === 0 && neighbors === 3) {
                nextGrid[i][j] = 1;  // Born
            }
        }
    }

    let nextGridString = JSON.stringify(nextGrid);

    previousStates.shift();  // Remove the oldest state
    previousStates.push(nextGridString);  // Add the new state

    // Check if the new state has appeared before in the last 10 turns
    if (previousStates.slice(0, -1).includes(nextGridString)) {
        stableCount++;
    } else {
        stableCount = 0;
    }

    // If the grid has been stable for 10 turns, introduce variation
    if (stableCount >= 10) {
        introduceVariation(nextGrid);
        stableCount = 0;
        previousStates = Array(10).fill().map(() => JSON.stringify(nextGrid));  // Reset the stored states
    }

    grid = nextGrid;  // Update the grid with the next generation

    drawGrid();
    requestAnimationFrame(gameOfLife);
}

// The introduceVariation function remains the same as before

function introduceVariation(grid) {
    console.log("flipping");
    for (let i = 0; i < 30; i++) {  // Randomly flip 10 cells
        let x = Math.floor(Math.random() * gsize);
        let y = Math.floor(Math.random() * gsize);

        grid[x][y] = grid[x][y] === 0 ? 1 : 0;
    }
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
