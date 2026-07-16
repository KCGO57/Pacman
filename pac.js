let canvas; 
let ctx;

 const rowCount = 21;
 const columnCount = 19;
 const tileSize = 32;

 const width = columnCount * tileSize;
 const height = rowCount* tileSize;



 let blue;
 let orange;
 let pink;
 let red;
 let scared;
 let down;
 let up;
 let right;
 let left;
 let wall;

 const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

const walls = new Set(); 
const foods = new Set();
const ghosts = new Set();
let pacman;

 const directions = ["U", "D", "L", "R"];

 let score = 0;
 let lives = 3;
 let gameOver = false;
 window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = height;
    canvas.width = width;
    ctx = canvas.getContext("2d");
    loadImages();
    loadMap();
    
    for(let ghost of ghosts.values()){
      const newDirection = directions[Math.floor(Math.random()*4)];
      ghost.updateDirection(newDirection);
    }
    update();

    
 }

function loadImages(){
   blue = new Image();
   blue.src = "./Art/blueGhost.png";
   orange = new Image();
   orange.src = "./Art/orangeGhost.png";
   pink = new Image();
   pink.src = "./Art/pinkGhost.png";
   red = new Image();
   red.src = "./Art/redGhost.png";
   scared = new Image();
   scared.src = "./Art/scaredGhost.png";
   down = new Image();
   down.src = "./Art/pacmanDown.png";
   up = new Image();
   up.src = "./Art/pacmanUp.png";
   right = new Image();
   right.src = "./Art/pacmanRight.png";
   left = new Image();
   left.src = "./Art/pacmanLeft.png";
   wallImage = new Image();
   wallImage.src = "./Art/wall.png";

 }

 function loadMap(){ // iterate through our map and create block is
   walls.clear();
   foods.clear();
   ghosts.clear();
   for(let i = 0; i< rowCount; i++){
      for(let j = 0; j < columnCount; j++){
         const row = tileMap[i];
         const tileMapChar = row[j];

         const x = j*tileSize;
         const y = i*tileSize;

         if(tileMapChar == 'X'){
            const wall = new Block(wallImage, x, y, tileSize, tileSize);
            walls.add(wall);
         }
         else if(tileMapChar == 'P'){
            pacman = new Block(right, x, y, tileSize, tileSize);   
         }
         else if(tileMapChar == 'b'){
            const blueGhost = new Block(blue, x, y, tileSize,tileSize);
            ghosts.add(blueGhost);
         }
         else if(tileMapChar == 'p'){
            const pinkGhost = new Block(pink, x, y, tileSize,tileSize);
            ghosts.add(pinkGhost);
         }
         else if(tileMapChar == 'o'){
            const orangeGhost = new Block(orange, x, y, tileSize,tileSize);
            ghosts.add(orangeGhost);
         }
          else if(tileMapChar == 'r'){
            const redGhost = new Block(red, x, y, tileSize,tileSize);
            ghosts.add(redGhost);
         }
          else if(tileMapChar == ' '){
            const food = new Block(null, x + 14, y + 14, 4, 4);
            foods.add(food);
         }
      }
   }
 }


class Block {
   constructor(image, x, y, width, height) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.startX = x; // save starting x and y position of pacman and the ghost
      this.startY = y; 

      this.velocityX = 0;
      this.velocityY = 0;

   }
   updateDirection(direction){
      const pDirection = this.direction;
      this.direction = direction;
      this.updateVelocity();
      this.x += this.velocityX;
      this.y += this.velocityY;
      for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = pDirection;
                this.updateVelocity();
                return;
            }
      }
   }
   updateVelocity(){
      if(this.direction == "U"){
         this.velocityX = 0;
         this.velocityY = -tileSize/4;
      }
      else if(this.direction == "D"){
         this.velocityX = 0;
         this.velocityY = tileSize/4;
      }
      else if(this.direction == "L"){
         this.velocityX = -tileSize/4;
         this.velocityY = 0;

      }
      else if(this.direction == "R"){
         this.velocityX = tileSize/4;
         this.velocityY = 0;
      }
   }
}
 



 function update() {
   move();
   draw();
   setTimeout(update,50);
 }

 function draw(){
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
   for(let wall of walls.values()){
      ctx.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);

   }
   for(let ghost of ghosts.values()){
      ctx.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);

   }
   ctx.fillStyle = "white";
   for(let food of foods.values()){
      ctx.fillRect(food.x, food.y, food.width, food.height);

   }

 }
let rightPress;
let leftPress;
let upPress;
let downPress;

let direction;

 function move(){
   if(rightPress && pacman.x < canvas.width-pacman.width){
      pacman.x += 10
      direction = "R";
   }
   if(leftPress && pacman.x > 0){
      pacman.x -= 10
      direction = "L";
   }
   if(upPress && pacman.y > 0){
      pacman.y -= 10;
      direction = "U";
   }
   if(downPress && pacman.y < canvas.height - pacman.height){
      pacman.y += 10;
      direction = "D";
   }

   if(direction == "U"){
      pacman.image = up;
   }
   if(direction == "R"){
      pacman.image = right;
   }
   if(direction == "L"){
      pacman.image = left;
   }
   if(direction == "D"){
      pacman.image = down;
   }
   
   for(let i of walls.values()){
      if(collision(pacman, i)){
         let top = Math.abs(pacman.y - (i.y + i.height)); // player top obj bottom
         let right = Math.abs((pacman.x + pacman.width) - i.x); // player right obj left
         let left = Math.abs((pacman.x-(i.x+i.width)));//etc
         let bottom = Math.abs((pacman.y + pacman.height) - i.y); //etc
  
         if ((pacman.y <= i.y + i.height && pacman.y + pacman.height > i.y + i.height) && (top < right&& top < left)){
            pacman.y = i.y + i.height;
            //pacman.yVelocity = 0;
         }
         if((pacman.y + pacman.height >= i.y && pacman.y < i.y) && (bottom < right && bottom < left)){
               pacman.y = i.y - pacman.height; 
             //  pacman.jumping = false;
              // pacman.yVelocity = 0;
         }
         if((pacman.x + pacman.width >= i.x && pacman.x < i.x) && (right < top && right < bottom)){
            pacman.x = i.x - pacman.width;
            }
          if((pacman.x <= i.x + i.width && pacman.x + pacman.width > i.x + i.width) && (left < top && left < bottom)){
               pacman.x = i.x + i.width;
            }
            }
         }
      for(let ghost of ghosts.values()){
        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;
         
         for(let i of walls.values()){
            if(collision(ghost, i)){

               ghost.x -= ghost.velocityX;
               ghost.y -= ghost.velocityY;
               const newDirection = directions[Math.floor(Math.random()*4)];
               ghost.updateDirection(newDirection);
            }
         }
      }
      let foodEaten = null;
      for(let food of foods.values()){
         if(collision(pacman, food)){
            foodEaten = food;
            score += 10;
            break;
         }
      }
      foods.delete(foodEaten);
 }
  

 function collision(a, b){
   return a.x + a.width >= b.x && 
          a.x <= b.width + b.x&&
          a.y + a.height >= b.y && 
          a.y <= b.y + b.height

 }
 document.addEventListener("keydown", (event) => {

  if (event.code === "ArrowRight") {
    rightPress = true;
  }
  if (event.code === "ArrowLeft") {
    leftPress = true;
  }
  if (event.code === "ArrowUp") {
    upPress = true;
  }
  if (event.code === "ArrowDown") {
    downPress = true;
  }

  
});

// when we lift up from our key, we set our variables to false
document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    rightPress = false;
  }
  if (event.code === "ArrowLeft") {
    leftPress = false;
  }
  if (event.code === "ArrowUp") {
    upPress = false;
  }
  if (event.code === "ArrowDown") {
    downPress = false;
  }
  
})