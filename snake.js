const GAME_SPEED = 125;
 const foodImg = new Image();
foodImg.src = "food.jpg";

 let snake = [{x: 150, y: 150}]
 
 let score = 0;
 
 let changingDirection = false;
 
 let foodX;
 
 let foodY;
 
 let dx = 30;
 
 let dy = 0;
 
 const gameCanvas = document.getElementById("gameCanvas");

 const ctx = gameCanvas.getContext("2d");
 
 main();
 
 createFood();
 
 document.addEventListener("keydown", changeDirection);
 
 function main() {
 if (didGameEnd()) return;
 setTimeout(function onTick() {
 changingDirection = false;
 clearCanvas();
 drawFood();
 advanceSnake();
 drawSnake();

 main();
 }, GAME_SPEED)
 }

 function clearCanvas() {
 ctx.fillStyle = "black";
 ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
 }
 
 function drawFood() {
 ctx.drawImage(foodImg,foodX,foodY);
 }

 function advanceSnake() {
 const head = {x: snake[0].x + dx, y: snake[0].y + dy};
 snake.unshift(head);
 const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
 if (snake[0].x === foodX && snake[0].y === foodY) {
 score += 10;
 document.getElementById('score').innerHTML = score;
 createFood();
 } else {
 snake.pop();
 }
 }
 
 function didGameEnd() {
 for (let i = 1; i < snake.length; i++) {
 if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
 }
 const hitLeftWall = snake[0].x <0;
 const hitRightWall = snake[0].x >19*30;
 const hitToptWall = snake[0].y <0;
 const hitBottomWall = snake[0].y > 19*30;
 return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
 }



 function createFood() {
 foodX = Math.floor(Math.random()*20)*30;
 foodY = Math.floor(Math.random()*20)*30;
 snake.forEach(function isFoodOnSnake(part) {
 const foodIsoNsnake = part.x == foodX && part.y == foodY;
 if (foodIsoNsnake) createFood();
 });
 }
 
 function drawSnake() {
 snake.forEach(drawSnakePart)
 }
 
 function drawSnakePart(snakePart) {
 ctx.fillStyle = "yellow";
 ctx.strokeStyle ="#380e58";
 ctx.fillRect(snakePart.x, snakePart.y, 30, 30);
 ctx.strokeRect(snakePart.x, snakePart.y, 30, 30);
 }
 
 function changeDirection(event) {
 const LEFT_KEY = 37;
 const RIGHT_KEY = 39;
 const UP_KEY = 38;
 const DOWN_KEY = 40;
 
 if (changingDirection) return;
 changingDirection = true;
 const keyPressed = event.keyCode;
 const goingUp = dy === -30;
 const goingDown = dy === 30;
 const goingRight = dx === 30;
 const goingLeft = dx === -30;
 if (keyPressed === LEFT_KEY && !goingRight) {
 dx = -30;
 dy = 0;
 }
 if (keyPressed === UP_KEY && !goingDown) {
 dx = 0;
 dy = -30;
 }
 if (keyPressed === RIGHT_KEY && !goingLeft) {
 dx = 30;
 dy = 0;
 }
 if (keyPressed === DOWN_KEY && !goingUp) {
 dx = 0;
 dy = 30;
 }
 }


	