const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const btns = document.querySelector(".btns");
const buttons = document.querySelectorAll(".btn");

canvas.width = window.screen.width - 50;
canvas.height = window.screen.height - btns.clientHeight - 150;

let gridSize = 15;
let gridWidth = Math.floor(canvas.width / gridSize);
let gridHeight = Math.floor(canvas.height / gridSize);

let food = {
  x: Math.floor(Math.random() * gridWidth),
  y: Math.floor(Math.random() * gridHeight),
};

let points = 0;
function Food() {
  let foodWidth = Math.floor(Math.random() * gridWidth);
  let foodHeight = Math.floor(Math.random() * gridHeight);
  console.log(foodWidth * gridSize);
  console.log(foodHeight * gridSize);
  if (foodWidth * gridSize !== 0 && foodHeight * gridSize !== 0) {
    food = {
      x: foodWidth,
      y: foodHeight,
    };
    console.log(food.x);
    console.log(food.y);
  } else {
    food = {
      x: 4,
      y: 4,
    };
  }
}

const snake = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
];

let button = "";

window.addEventListener("click", (e) => {
  let btn = e.target;
  if (btn.classList.contains("up")) {
    button = "up";
  } else if (btn.classList.contains("down")) {
    button = "down";
  } else if (btn.classList.contains("right")) {
    button = "right";
  } else if (btn.classList.contains("left")) {
    button = "left";
  }
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (button !== "Down") button = "Up";
      break;
    case "ArrowDown":
      if (button !== "Up") button = "Down";
      break;
    case "ArrowLeft":
      if (button !== "Right") button = "Left";
      break;
    case "ArrowRight":
      if (button !== "Left") button = "Right";
      break;
  }
});

function moveSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px";
  ctx.fillText(`Points , ${points}`, 50, 50);
  let head = { x: snake[0].x, y: snake[0].y };
  switch (button) {
    case "":
      head.x++;
      break;
    case "Up":
      head.y--;
      break;
    case "Down":
      head.y++;
      break;
    case "Left":
      head.x--;
      break;
    case "Right":
      head.x++;
      break;
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "right":
      head.x++;
      break;
    case "left":
      head.x--;
      break;
  }
  snake.unshift(head);

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(
        snake[i].x * gridSize,
        snake[i].y * gridSize,
        gridSize,
        gridSize
      );
    } else {
      ctx.fillStyle = "green";
      ctx.fillRect(
        snake[i].x * gridSize,
        snake[i].y * gridSize,
        gridSize,
        gridSize
      );
    }

    ctx.strokeStyle = "red";
    ctx.strokeRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  if (snake[0].x === gridWidth) {
    snake[0].x = 0;
  } else if (snake[0].y === gridHeight) {
    snake[0].y = 0;
  } else if (snake[0].x * gridSize === 0) {
    snake[0].x = gridWidth - 1;
  } else if (snake[0].y * gridSize === 0) {
    snake[0].y = gridHeight - 1;
  }

  if (head.x === food.x && head.y === food.y) {
    points += 1;
    Food();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
setInterval(moveSnake, 100);
