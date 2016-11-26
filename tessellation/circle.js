
window.onload = init;

var canvas;
var ctx;

var width;
var height;
var dots = [];
var rands = [];

function init()
{
   canvas = document.getElementById("canvas");
   ctx = canvas.getContext("2d");

   width = canvas.width;
   height = canvas.height;

   for(var i=0; i<height; i++) {
       for(var j=0; j<width; j++) {
           dots[i*width+j] = 0;
       }
   }

   for(var i=0; i<5; i++) {
       rands[i*2] = Math.floor(Math.random()*canvas.width);
       rands[i*2+1] = Math.floor(Math.random()*canvas.height);
   }
   for(var i=0; i<300; i+=1) {
       drawCircle(ctx, rands[0], rands[1], i, "#00FF00");
       drawCircle(ctx, rands[2], rands[3], i, "#FF0000");
       drawCircle(ctx, rands[4], rands[5], i, "#0000FF");
       drawCircle(ctx, rands[6], rands[7], i, "#CC6633");
       drawCircle(ctx, rands[8], rands[9], i, "#9966CC");

   }


}

function fillDot(ctx, x, y, color)
{
    if(dots[y*width+x] == 0) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        dots[y*width+x] = 1;
    }
}

function drawCircle(ctx, cx, cy, r, color)
{
    var x, y;
    var p;

    x = 0;
    y = r;
    p = 1 - r;

    /*
    ctx.fillRect(x+cx, y+cy, 1, 1);
    ctx.fillRect(x+cx, -y+cy, 1, 1);
    ctx.fillRect(y+cx, x+cy, 1, 1);
    ctx.fillRect(-y+cx, x+cy, 1, 1);
    */
    fillDot(ctx, x+cx, y+cy, color);
    fillDot(ctx, x+cx, -y+cy, color);
    fillDot(ctx, y+cx, x+cy, color);
    fillDot(ctx, -y+cx, x+cy, color);

    ++x;
    while(x < y) {
        if(p < 0) {
            p += x+x+1;
        }
        else {
            p += x+x-y-y+1;
            --y;
        }

        fillDot(ctx, x+cx , y+cy,  color);
        fillDot(ctx, x+cx , -y+cy, color);
        fillDot(ctx, -x+cx, y+cy , color);
        fillDot(ctx, -x+cx, -y+cy, color);
        fillDot(ctx, y+cx , x+cy , color);
        fillDot(ctx, y+cx , -x+cy, color);
        fillDot(ctx, -y+cx, x+cy , color);
        fillDot(ctx, -y+cx, -x+cy, color);

        ++x;
    }
}
