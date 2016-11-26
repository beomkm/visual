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
            //pixels[i*width + j] = (i^j)%256;
            var dist = getDist(j-width/2, i-height/2);
            //pixels[i*width + j] = (256-dist)^j^i;
            var dir = getDir(j-width/2, i-height/2);
            if(dir>255) console.log(dir);
            pixels[i*width + j] = (256-dist)/(dir/96);
        }
    }



    //points[numPoints].c = "rgb("+rr+","+rg+","+rb+")";


    draw(ctx);

}

function getDist(dx, dy)
{
    return Math.floor(Math.sqrt(dx*dx + dy*dy));
}

function getDir(dx, dy)
{
    var dir = Math.floor(128/Math.PI*Math.atan2(dy, dx))+128;
    if(dir == 256) dir = 0;
    return dir;
}


function draw(ctx)
{
    for(var i=0; i<height; i++) {
        for(var j=0; j<width; j++) {
            var bri = pixels[i*width+j];
            var r = Math.floor(bri/1);
            var g = Math.floor(bri/2);
            var b = Math.floor(bri/3);
            ctx.fillStyle = "rgb("+r+","+g+","+b+")";
            ctx.fillRect(j, i, 1, 1);
        }
    }
}
