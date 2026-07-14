let canvas; 
let ctx;

 const rowCount = 21;
 const columnCount = 19;
 const tileSize = 32;

 const width = columnCount * tileSize;
 const height = rowCount* tileSize;

 window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.height = height;
    canvas.width = width;
    ctx = canvas.getContext("2d");
 }