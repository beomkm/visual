/*
http://tibyte.kr/253
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
      pixels[i*width + j] = 0;
    }
  }


  for(var i=0; i<10; i++) {
    for(var j=0; j<10; j++) {
      var cx = j*80-100;
      var cy = i*92+j*46-250;
      for(var k=0; k<6; k++) {
        points[numPoints] = {};
        points[numPoints].x = cx + 36*Math.cos(k*Math.PI/3+11/180*Math.PI);
        points[numPoints].y = cy + 36*Math.sin(k*Math.PI/3+11/180*Math.PI);

        var rr = (points[numPoints].y+points[numPoints].x)/8;
        var rg = (points[numPoints].y*2+points[numPoints].x*4)/8;
        var rb = (points[numPoints].y*4+points[numPoints].x*8)/8;

        rr = Math.floor(rr);
        rg = Math.floor(rg);
        rb = Math.floor(rb);

        points[numPoints].c = "rgb("+rr+","+rg+","+rb+")";

        ++numPoints;
      }
    }
  }

  fill(ctx);
  edge(ctx);
  //point(ctx);

}

function fill(ctx)
{
  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
      var min = width*width+height*height;
      var minK = 0;
      for(var k=0; k<numPoints; k++) {
        var dy = i-points[k].y;
        var dx = j-points[k].x;
        var dist = dx*dx+dy*dy;
        if(dist < min) {
          min = dist;
          minK = k;
        }
      }
      pixels[i*width + j] = points[minK].c;
      ctx.fillStyle = points[minK].c;
      ctx.fillRect(j, i, 1, 1);
    }//end j loop
  }
}

function edge(ctx)
{
  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
      if(pixels[i*width + j] != pixels[i*width + j-1] ||
          pixels[i*width + j] != pixels[i*width + j+1] ||
          pixels[i*width + j] != pixels[(i-1)*width + j] ||
          pixels[i*width + j] != pixels[(i+1)*width + j]) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(j, i, 1, 1);
      }
    }
  }
}

function point(ctx)
{
  for(var k=0; k<numPoints; k++) {
    console.log("aa");
    ctx.fillStyle = "#000000";
    ctx.fillRect(points[k].x, points[k].y, 2, 2);
  }
}
