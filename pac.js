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

class Block {
   constructor(image, x, y, width, height) {
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.startX = x; // save starting x and y position of pacman and the ghost
      this.startY = y; 

   }
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

 function loadMap(){ // iterate through our map and create block objects
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
      }
   }
 }
 window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = height;
    canvas.width = width;
    ctx = canvas.getContext("2d");
    loadImages();
    loadMap();
    console.log(walls.size);
    
 }