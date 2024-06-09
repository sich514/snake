const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playAgainButton = document.getElementById('playAgainButton');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocity = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameOver = false;

function drawTile(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x * gridSize, y * gridSize, gridSize - 2, gridSize - 2);
}

function drawGame() {
    if (gameOver) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    drawTile('#000000', food.x, food.y);

    // Draw snake
    snake.forEach(part => drawTile('#000000', part.x, part.y));

    // Move snake
    const newHead = {
        x: snake[0].x + velocity.x,
        y: snake[0].y + velocity.y
    };

    if (newHead.x === food.x && newHead.y === food.y) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        score++;
    } else {
        snake.pop();
    }

    // Check collision with walls
    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= tileCount || newHead.y >= tileCount) {
        endGame();
        return;
    }

    // Check collision with self
    if (snake.some(part => part.x === newHead.x && part.y === newHead.y)) {
        endGame();
        return;
    }

    snake.unshift(newHead);

    setTimeout(drawGame, 1000 / (score + 10));
}

function endGame() {
    gameOver = true;
    playAgainButton.classList.remove('hidden');
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
    food = { x: 15, y: 15 };
    score = 0;
    gameOver = false;
    playAgainButton.classList.add('hidden');
    drawGame();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (velocity.y === 0) {
                velocity = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (velocity.y === 0) {
                velocity = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (velocity.x === 0) {
                velocity = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (velocity.x === 0) {
                velocity = { x: 1, y: 0 };
            }
            break;
    }
});

playAgainButton.addEventListener('click', resetGame);

drawGame();
