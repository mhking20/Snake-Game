
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const btns = document.querySelector(".btns")



canvas.width = window.screen.width - 50
canvas.height = window.screen.height - btns.clientHeight

let gridSize = 15;
let gridWidth = Math.floor(canvas.width / gridSize);
let gridHeight = Math.floor(canvas.height / gridSize);

let food = {
  x: Math.floor(Math.random() * gridWidth),
  y: Math.floor(Math.random() * gridHeight),
};

let points = 0
function Food() {
  let foodWidth = Math.floor(Math.random() * gridWidth);
  let foodHeight = Math.floor(Math.random() * gridHeight);
   console.log(foodWidth * gridSize );
   console.log(foodHeight * gridSize );
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
let direction = "";

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

$(document).on("swiperight" , () => {
    return direction = 'right'
})

let h1 = document.querySelector(".h1")
h1.textContent = direction

function moveSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px"
  ctx.fillText(`Points , ${points}` , 50 , 50)
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
    points += 1
    Food();
  } else {
    snake.pop();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
setInterval(moveSnake, 100);
