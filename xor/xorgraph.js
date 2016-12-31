/*
http://tibyte.kr/279
*/


window.onload = init;

var canvas;
var ctx;

var width;
var height;

var pixels = [];
var points = [];

var numPoints = 0;

function init()
{
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");

   width = canvas.width;
   height = canvas.height;

   for(var i=0; i<height; i++) {
     for(var j=0; j<width; j++) {
       pixels[i*width + j] = (i^j)%256;
     }
   }

   draw(ctx);

}


function draw(ctx)
{
  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
        ctx.fillStyle = "rgb("+pixels[i*width+j]+","+0+","+0+")";
        ctx.fillRect(j, i, 1, 1);
    }
  }
}
