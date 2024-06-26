const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeBlockSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "right";
let food = { x: 300, y: 300 };
let gameRunning = true;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== "right") {
        direction = "left";
    } else if (key === 38 && direction !== "down") {
        direction = "up";
    } else if (key === 39 && direction !== "left") {
        direction = "right";
    } else if (key === 40 && direction !== "up") {
        direction = "down";
    }
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, snakeBlockSize, snakeBlockSize);
}

function drawSnake() {
    snake.forEach(block => drawBlock(block.x, block.y, "black"));
}

function moveSnake() {
    const head = { ...snake[0] };
    if (direction === "left") head.x -= snakeBlockSize;
    if (direction === "up") head.y -= snakeBlockSize;
    if (direction === "right") head.x += snakeBlockSize;
    if (direction === "down") head.y += snakeBlockSize;

    // Wrap around logic
    if (head.x < 0) {
        head.x = canvas.width - snakeBlockSize;
    } else if (head.x >= canvas.width) {
        head.x = 0;
    }
    if (head.y < 0) {
        head.y = canvas.height - snakeBlockSize;
    } else if (head.y >= canvas.height) {
        head.y = 0;
    }

    snake.unshift(head);

    // Check if snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        createFood();
        score++;
        updateScore();
    } else {
        snake.pop();
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / snakeBlockSize)) * snakeBlockSize,
        y: Math.floor(Math.random() * (canvas.height / snakeBlockSize)) * snakeBlockSize
    };
}

function drawFood() {
    drawBlock(food.x, food.y, "black");
}

function main() {
    if (!gameRunning) return;

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawFood();
        moveSnake();
        drawSnake();
        if (gameOver()) {
            showPlayAgainButton();
            return;
        }
        main();
    }, 100);
}

function gameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false;
}

function showPlayAgainButton() {
    gameRunning = false;
    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play Again";
    playAgainButton.style.position = "absolute";
    playAgainButton.style.top = "50%";
    playAgainButton.style.left = "50%";
    playAgainButton.style.transform = "translate(-50%, -50%)";
    playAgainButton.style.padding = "10px 20px";
    playAgainButton.style.color = "#000";
    document.body.appendChild(playAgainButton);

    playAgainButton.addEventListener("click", () => {
        document.body.removeChild(playAgainButton);
        resetGame();
        main();
    });
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "right";
    score = 0;
    updateScore();
    createFood();
    gameRunning = true;
}

function updateScore() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (!scoreDisplay) {
        const newScoreDisplay = document.createElement("div");
        newScoreDisplay.id = "scoreDisplay";
        newScoreDisplay.style.position = "absolute";
        newScoreDisplay.style.top = `${canvas.offsetTop + canvas.height + 10}px`;
        newScoreDisplay.style.left = `${canvas.offsetLeft}px`;
        newScoreDisplay.style.fontSize = "20px";
        newScoreDisplay.style.fontWeight = "bold";
        newScoreDisplay.style.color = "#5d744b";
        newScoreDisplay.textContent = `Score: ${score}`;
        document.body.appendChild(newScoreDisplay);
    } else {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

createFood();
updateScore();  // Initialize score display
main();
