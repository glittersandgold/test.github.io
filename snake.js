// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;
let food = { x: 0, y: 0 };
let score = 0;
let gameSpeed = 100;
let isPaused = false;

// Game loop
function gameLoop() {
    if (!isPaused) {
        clearCanvas();
        moveSnake();
        drawFood();
        drawSnake();
        drawScore();
        checkCollision();
    }
    drawPauseState();
    setTimeout(gameLoop, gameSpeed);
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
        score += 10;
    } else {
        snake.pop();
    }
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

// Draw score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Draw pause state
function drawPauseState() {
    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    }
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
    score = 0;
    generateFood();
    isPaused = false;
}

// Toggle pause
function togglePause() {
    isPaused = !isPaused;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (!isPaused) {
        switch (e.key) {
            case 'ArrowUp': if (dy === 0) { dx = 0; dy = -10; } break;
            case 'ArrowDown': if (dy === 0) { dx = 0; dy = 10; } break;
            case 'ArrowLeft': if (dx === 0) { dx = -10; dy = 0; } break;
            case 'ArrowRight': if (dx === 0) { dx = 10; dy = 0; } break;
        }
    }
    if (e.code === 'Space') {
        togglePause();
    }
});

// Start the game
generateFood();
gameLoop();