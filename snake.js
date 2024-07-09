// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Snake properties
let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;
// Add score variable
let score = 0;

// Food properties
let food = { x: 0, y: 0 };

// Game loop
function gameLoop() {
    setTimeout(() => {
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        drawScore(); // Add this line to draw the score
        checkCollision();
        gameLoop();
    }, 100);
}

// Clear the canvas
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
        score += 10; // Increase score when food is eaten
    } else {
        snake.pop();
    }
}

// Add function to draw score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Generate food
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Draw food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Check for collisions
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

// Reset the game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 10;
    dy = 0;
    generateFood();
    score = 0; // Reset score when game resets
}


// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': dx = 0; dy = -10; break;
        case 'ArrowDown': dx = 0; dy = 10; break;
        case 'ArrowLeft': dx = -10; dy = 0; break;
        case 'ArrowRight': dx = 10; dy = 0; break;
    }
});

// Start the game
generateFood();
gameLoop();