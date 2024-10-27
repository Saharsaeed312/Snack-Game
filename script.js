const canva = document.getElementById('snackGame');
const ctx =  canva.getContext("2d");

const box = 20;
const canvaSize = 400;
let snake = [{x: box * 5 , y: box * 5}];
let direction = 'RIGHT';
let food ={
    x: Math.floor(Math.random()* (canvaSize/box))*box,
    y: Math.floor(Math.random()* (canvaSize/box))*box,
};
let score = 0;

document.addEventListener("keydown", changeDirection);
document.getElementById("left").addEventListener("click", () => setDirection("LEFT"));
document.getElementById("right").addEventListener("click", () => setDirection("RIGHT"));
document.getElementById("up").addEventListener("click", () => setDirection("UP"));
document.getElementById("down").addEventListener("click", () => setDirection("DOWN"));
document.getElementById("restart").addEventListener("click", restartGame);

function setDirection(newDirection){
    if(newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if(newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
    if(newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if(newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
}

function changeDirection(event){
    if (event.keyCode === 37) setDirection('LEFT');
    if (event.keyCode === 38) setDirection('UP');
    if (event.keyCode === 39) setDirection('RIGHT');
    if (event.keyCode === 40) setDirection('DOWN');
}

function restartGame() {
    snake = [{ x: box * 5, y: box * 5 }];
    direction = "RIGHT";
    score = 0;
    createFood();
}

function createFood(){
    food = {
        x: Math.floor(Math.random()* (canvaSize/box))*box,
        y: Math.floor(Math.random()* (canvaSize/box))*box,
    };
}

function collision(head){
     for (let i = 0; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            return true;
        }
     }
     return head.x < 0 || head.x >=  canvaSize || head.y  < 0 || head.y >= canvaSize;
}

function draw(){
    ctx.clearRect(0 ,0 , canvaSize , canvaSize);

    for (let i=0; i < snake.length; i++){
        ctx.fillStyle = i === 0? "red" : "blue";
        ctx.fillRect (snake[i].x, snake[i].y,box ,box)
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(food.x, food.y, box, box)
    ;
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        createFood();
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (collision(newHead)) {
        alert("Game Over! Score: " + score);
        restartGame();
        return;
    }

    snake.unshift(newHead);
}

let game = setInterval(draw, 300);


