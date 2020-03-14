var canvas = document.createElement("canvas");
var tplCtx = canvas.getContext("2d");

var radius = 4;
var x = 4; 
var y = 4; 
var blurFactor = 0.5;

var gradient = tplCtx.createRadialGradient(x, y, radius*blurFactor, x, y, radius);
gradient.addColorStop(0, 'rgba(0,0,0,1)');
gradient.addColorStop(1, 'rgba(0,0,0,0)');
tplCtx.fillStyle = gradient;
tplCtx.fillRect(0, 0, 2*radius, 2*radius);
tplCtx.stroke();
var imgdata = tplCtx.getImageData(0, 0, 8, 8);

var x = new Array(64);
for(var i in imgdata.data) {
    if(i%3 == 0) {
        x[parseInt(i/4)] = imgdata.data[i];
    }
}
console.log(x);


// ---------

var canvas2 = document.createElement("canvas");
var tplCtx2 = canvas2.getContext("2d");

var radius2 = 4;
var x2 = 4; 
var y2 = 4; 
var blurFactor2 = 0.5;

var gradient2 = tplCtx2.createRadialGradient(x2, y2, radius2*blurFactor2, x2, y2, radius2);
gradient2.addColorStop(0, 'rgba(0,0,0,1)');
gradient2.addColorStop(1, 'rgba(0,0,0,0)');
tplCtx2.fillStyle = gradient2;
tplCtx2.fillRect(0, 0, 2*radius2, 2*radius2);
tplCtx2.stroke();
var imgdata2 = tplCtx2.getImageData(0, 0, 8, 8);

var x2 = new Array(64);
for(var i in imgdata2.data) {
    if(i%3 == 0) {
        x2[parseInt(i/4)] = imgdata2.data[i];
    }
}
console.log(x2);

//------- 
var canvas3 = document.getElementById("canvas");
var tplCtx3 = canvas3.getContext("2d");
tplCtx3.drawImage(canvas, 0, 0);
tplCtx3.drawImage(canvas2, 0, 0);

var imgdata3 = tplCtx3.getImageData(0, 0, 8, 8);

var x3 = new Array(64);
for(var i in imgdata3.data) {
    if(i%3 == 0) {
        x3[parseInt(i/4)] = imgdata3.data[i];
    }
}
console.log(x3);
tplCtx3.stroke();