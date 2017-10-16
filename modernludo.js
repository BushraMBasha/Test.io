window.onload = init;
window.onresize = resizeboard;
var maindiv;
var canvas = null, ctx = null, dicecanvas = null, dicectx = null, upcanvas = null, upctx = null;


function init() {
    initPlayGround();
}
function initPlayGround() {
    document.getElementById("playGround").style.display = "";
    maindiv = document.getElementById("main");
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");

    ctx.font = "20px helvetica";
    ctx.globalAlpha = 1.0;
    canvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (var i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        canvas.setAttribute('style', styleString);
    };
    var canvasStyle = {
        'background': '#00aaff',
        'border': '1px solid grey'
    };
    canvas.setStyle(canvasStyle);

    upcanvas = document.getElementById("playboard");

    upctx = upcanvas.getContext("2d");
    upcanvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (var i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        upcanvas.setAttribute('style', styleString);
    };
    var canvasStyle = {
        'border': '1px solid grey'
    };

    upcanvas.setStyle(canvasStyle);
    dicecanvas = document.getElementById("dice");
    dicectx = dicecanvas.getContext("2d");
    drawTheBoard();
    placeDefaultPlanes("red");
    placeDefaultPlanes("yellow");
    placeDefaultPlanes("blue");
    placeDefaultPlanes("green");
}
function drawTheBoard() {
     refreshBoard();
    drawSkyGradient();
    var boardmap = createMap();
    for (var x = 0; x < 15; x++) {
        for (var y = 0; y < 15; y++) {
            switch (boardmap[y][x]) {
                case 0: break;
                case 1: ctx.putImageData(drawARegularTile("blue", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 2: ctx.putImageData(drawARegularTile("green", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 3: ctx.putImageData(drawARegularTile("red", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 4: ctx.putImageData(drawARegularTile("yellow", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                
                case 10: ctx.putImageData(drawHomeTile("blue", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 20: ctx.putImageData(drawHomeTile("green", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 30: ctx.putImageData(drawHomeTile("red", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 40: ctx.putImageData(drawHomeTile("yellow", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                
                case 5: ctx.putImageData(drawTwoColorTile("ry", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 6: ctx.putImageData(drawTwoColorTile("yb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 7: ctx.putImageData(drawTwoColorTile("rg", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 8: ctx.putImageData(drawTwoColorTile("gb", tileWidth, true), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 9: ctx.putImageData(drawCenterTile(tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                
                case 11: ctx.putImageData(drawBlankTile("white", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                
                case 100: ctx.putImageData(drawBlankTile("blue", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 200: ctx.putImageData(drawBlankTile("green", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 300: ctx.putImageData(drawBlankTile("red", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                case 400: ctx.putImageData(drawBlankTile("yellow", tileWidth), tileWidth / 2 + tileWidth * x, tileWidth / 2 + tileWidth * y); break;
                
                default: break;
            }
        }
    }
}
function createMap() {
    var mapxy = new Array();
    //notile:0, blue:1,green:2,red:3,yello:4;
    mapxy.push([300, 300, 300, 300, 300,   0,  3,  4,  1,   0, 400, 400, 400, 400, 400]);
    mapxy.push([300,  11, 300,  11, 300,   0,  2, 40, 40, 400, 400,  11, 400,  11, 400]);
    mapxy.push([300, 300, 300, 300, 300,   0,  1, 40,  3,   0, 400, 400, 400, 400, 400]);
    mapxy.push([300,  11, 300,  11, 300,   0,  4, 40,  4,   0, 400,  11, 400,  11, 400]);
    mapxy.push([300, 300, 300, 300, 300,   0,  3, 40,  1,   0, 400, 400, 400, 400, 400]);
    mapxy.push([  0, 300,   0,   0,   0,   0,  2, 40,  2,   0,   0,   0,   0,   0,  0]);
    mapxy.push([  4,  30,   2,   3,   4,   1,  5, 40,  6,   3,   4,   1,   2,   3,  4]);
    mapxy.push([  3,  30,  30,  30,  30,  30, 30,  9, 10,  10,  10,  10,  10,  10,  1]);
    mapxy.push([  2,   1,   4,   3,   2,   1,  7, 20,  8,   3,   2,   1,   4,  10,  2]);
    mapxy.push([  0,   0,   0,   0,   0,   0,  4, 20,  4,   0,   0,   0,   0, 100,  0]);
    mapxy.push([200, 200, 200, 200, 200,   0,  3, 20,  1,   0, 100, 100, 100, 100, 100]);
    mapxy.push([200,  11, 200,  11, 200,   0,  2, 20,  2,   0, 100,  11, 100,  11, 100]);
    mapxy.push([200, 200, 200, 200, 200,   0,  1, 20,  3,   0, 100, 100, 100, 100, 100]);
    mapxy.push([200,  11, 200,  11, 200, 200, 20, 20,  4,   0, 100,  11, 100,  11, 100]);
    mapxy.push([200, 200, 200, 200, 200,   0,  3,  2,  1,   0, 100, 100, 100, 100, 100]);
    return mapxy;
}
function refreshBoard() {
    canvasWidth = window.innerHeight - 10;
    canvasHeight = window.innerHeight;
    maindiv.style.width = canvasWidth + "px";
    maindiv.style.height = canvasWidth + "px";
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasWidth;
    upctx.canvas.width = canvasWidth;
    upctx.canvas.height = canvasWidth;
    tileWidth = Math.ceil(canvasWidth / 16);
    dicectx.canvas.width = tileWidth * 4;
    dicectx.canvas.height = tileWidth * 6;
    document.getElementById("buttondiv").style.left = tileWidth * 2 + "px";
    document.getElementById("buttondiv").style.top = tileWidth * 7.5 + "px";
}
function resizeboard() {
    refreshBoard();
    drawTheBoard();
}
function drawSkyGradient() {
    var gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#d9d9d9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function drawHomeTile(color, width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor("white");
            }
            else {
                setColor(color);
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function drawARegularTile(color, width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor(color);
            }
            else {
                setColor("white");
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function drawTwoColorTile(color, width, keepColorSequence) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            if (x < width - y) {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("yellow") : setColor("blue"); break;
                    case "rg": keepColorSequence ? setColor("red") : setColor("green"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "yb": keepColorSequence ? setColor("blue") : setColor("yellow"); break;
                    case "rg": keepColorSequence ? setColor("green") : setColor("red"); break;
                    default: break;
                }
            }
            if (x < y) {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("yellow") : setColor("red"); break;
                    case "gb": keepColorSequence ? setColor("blue") : setColor("green"); break;
                    default: break;
                }
            }
            else {
                switch (color) {
                    case "ry": keepColorSequence ? setColor("red") : setColor("yellow"); break;
                    case "gb": keepColorSequence ? setColor("green") : setColor("blue"); break;
                    default: break;
                }
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function drawCenterTile(width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            if (x > y - 1 && x < width - y) {
                setColor("red");
            }
            else if (x < y && x > width - y - 1) {
                setColor("blue");
            }
            else if (x > y - 1 && x < width) {
                setColor("green");
            }
            else {
                setColor("yellow");
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function setColor(color) {
    switch (color) {
        case "blue": colorR = 150, colorG = 150, colorB = 255, colorA = 255; break;
        case "red": colorR = 255, colorG = 0, colorB = 0, colorA = 255; break;
        case "green": colorR = 51, colorG = 180, colorB = 51, colorA = 255; break;
        case "yellow": colorR = 255, colorG = 204, colorB = 0, colorA = 255; break;
        case "white": colorR = 255, colorG = 255, colorB = 255, colorA = 255; break;
        default: colorR = 0, colorG = 0, colorB = 0, colorA = 0; break;
    }
}

function drawBlankTile(color, width) {
    var imgData = ctx.createImageData(width, width);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(width / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            var circlewall = Math.ceil(width / 2 * 0.8);
            var circleWidth = Math.ceil(width / 20);
            ys = new Array();
            for (var j = 0; j < circleWidth; j++) {
                ys.push(y - Math.ceil(circleWidth / 2 * 0.9) - +circleWidth + j);
            }
            if ((circlewall - circleWidth) < distance && distance < circlewall) {
                setColor(color);
            }
            else {
                setColor(color);
            }
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}

function placeDefaultPlanes(color) {
    var redposes =    [ 1.49,  1.49,  3.49,  1.49,  1.49,  3.49,  3.49,  3.49,  1.49,  5.49];
    var yellowposes = [11.49,  1.49, 13.49,  1.49, 11.49,  3.49, 13.49,  3.49,  9.49,  1.49];
    var blueposes =   [11.49, 11.49, 13.49, 11.49, 11.49, 13.49, 13.49, 13.49, 13.49,  9.49];
    var greenposes =  [ 1.49, 11.49,  3.49, 11.49,  1.49, 13.49,  3.49, 13.49,  5.49, 13.49];
    var currentpos = null;
    var i_role = null;
    switch (color) {
        case "red":
            currentpos = redposes;
            i_role = 0;
            break;
        case "yellow":
            currentpos = yellowposes;
            i_role = 1;
            break;
        case "blue":
            currentpos = blueposes;
            i_role = 2;
            break;
        case "green":
            currentpos = greenposes;
            i_role = 3;
            break;
        default:
            break;
    }
    var currentplane = color + "coin";
    var img = document.getElementById(currentplane);
    upctx.shadowBlur = 10;
    upctx.shadowOffsetX = 2;
    upctx.shadowOffsetY = 2;
    upctx.shadowColor = "black";

    for (var i = 0; i < 8; i++) {
        upctx.drawImage(img, tileWidth * currentpos[i], tileWidth * currentpos[++i], tileWidth, tileWidth);
    }
}

function returnDiceImg(val) {
    var currentdice = "dice" + "one";
    switch (val) {
        case 1: currentdice = "dice" + "one"; break;
        case 2: currentdice = "dice" + "two"; break;
        case 3: currentdice = "dice" + "three"; break;
        case 4: currentdice = "dice" + "four"; break;
        case 5: currentdice = "dice" + "five"; break;
        case 6: currentdice = "dice" + "six"; break;
        default: break;
    }
    var img = document.getElementById(currentdice);
    return img;
}


function rolltheDice(btn) {
    dicectx.clearRect(0, 0, tileWidth * 4, tileWidth * 4);
    var diceposi = [0, 1, 1, 0];
    var diceposj = [0, 0, 1, 1];
    var i = -1;
    var rolling = setInterval(function () {
        dicectx.clearRect(tileWidth * 2 * (diceposi[i % 4]), tileWidth * 2 * (diceposj[i % 4]), tileWidth * 2, tileWidth * 2);
        diceValue = Math.floor(6);
        var img = returnDiceImg(6);
        i++;
        dicectx.drawImage(img, tileWidth * 2 * (diceposi[i % 4]), tileWidth * 2 * (diceposj[i % 4]), tileWidth * 2, tileWidth * 2);
    }, 180);
    setTimeout(function () {
        clearInterval(rolling);
    }, 2000);
}

function getSix(btn) {
    dicectx.clearRect(0, 0, tileWidth * 4, tileWidth * 4);
    var diceposi = [0, 1, 1, 0];
    var diceposj = [0, 0, 1, 1];
    var i = -1;
    var rolling = setInterval(function () {
        dicectx.clearRect(tileWidth * 2 * (diceposi[i % 4]), tileWidth * 2 * (diceposj[i % 4]), tileWidth * 2, tileWidth * 2);
        diceValue = Math.floor((Math.random() * 6) + 1);
        var img = returnDiceImg(diceValue);
        i++;
        dicectx.drawImage(img, tileWidth * 2 * (diceposi[i % 4]), tileWidth * 2 * (diceposj[i % 4]), tileWidth * 2, tileWidth * 2);
    }, 180);
    setTimeout(function () {
        clearInterval(rolling);
    }, 2000); 
}