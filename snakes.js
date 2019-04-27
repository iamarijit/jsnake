function cell (x, y, w, h)  {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
}


function food(x, y, w, h)  {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
}


var lastPressed = "r";
var dead = "F";
var values = [];
var f;
var head;
var x = 195;
var y = 150;
var w = 15;
var h = 15;
var points = 0;

function snakeResize()
{
  if (lastPressed == "r")
    {
      x = x+w;
      y = y;
      var c = new cell(x, y, w-1, h-1);
      head = c;
    }

    if (lastPressed == "l")
    {
      x = x-w;
      y = y;
      var c = new cell(x, y, w-1, h-1);
      head = c;
    }

    if (lastPressed == "u")
    {
      x = x;
      y = y-h;
      var c = new cell(x, y, w-1, h-1);
      head = c;
    }

    if (lastPressed == "d")
    {
      x = x;
      y = y+h;
      var c = new cell(x, y, w-1, h-1);
      head = c;
    }
}


function gameLogic()
{
	if (head.x == f.x && head.y == f.y)
	{
		var fx = Math.floor((Math.random() * 31) + 1)*15;
		var fy = Math.floor((Math.random() * 31) + 1)*15;

		f = new food(fx, fy, w-1, h-1);
		points++;
		snakeResize();
		values.push(head);
	}

	if (head.x >= 495 || head.y >= 495 || head.x < 0 || head.y < 0)
	{
		dead = "T";
	}

	var count = 0;
	values.forEach(function(i){
		if (head.x == i.x && head.y == i.y)
		{
			count++;
		}
	});
	if (count>1)
	{
		dead = "T";
	}
}

function keyPressed(e)
{
	if (e.keyCode=="38")
	{
		lastPressed = "u";
	}


	if (e.keyCode=="40")
	{
		lastPressed = "d";
	}


	if (e.keyCode=="39")
	{
		lastPressed = "r";
	}


	if (e.keyCode=="37")
	{
		lastPressed = "l";
	}
}

function init()
{
	//setsize

	//initialize
	var c = new cell(150, 150, w-1, h-1)
	values.push(c);
	c = new cell(150+w, 150, w-1, h-1)
	values.push(c);
	c = new cell(150+2*w, 150, w-1, h-1)
	values.push(c);
	c = new cell(150+3*w, 150, w-1, h-1)
	values.push(c);

	//food initialization
	var fx = Math.floor((Math.random() * 31) + 1)*15;
	var fy = Math.floor((Math.random() * 31) + 1)*15;
	f = new food(fx, fy, w-1, h-1);
	//window.setInterval(move, 500);
	
}


function move()
{
	snakeResize();
	values.push(head);
	values.shift();

	gameLogic();

	//console.log("Moved");
	//paint();
}


function paint()
{
	var can = document.getElementById("myCanvas");
	var ctx = can.getContext("2d");
	var l = values.length;
	ctx.font = "30px Arial";
	//ctx.fillRect(10, 10, 150, 75);

	
	ctx.clearRect(0, 0, can.width, can.height);
	move();

	if (dead=='F')
	{
		values.forEach(function(i){
			ctx.fillRect(i.x, i.y, i.w, i.h)
			//console.log(i.x,i.y,i.w,i.h);
			
			//ctx.stroke();
		});
		ctx.fillRect(f.x, f.y, f.w, f.h);
		//window.setTimeout(move, 500);
		//console.log("");
	}
	else
	{
		ctx.fillText("Game Over", 160, 240);
	}

	ctx.beginPath();
	ctx.moveTo(0, 495);
	ctx.lineTo(495, 495);
	ctx.fillText(" Points : "+points, 170, 530)

	ctx.stroke();
}

init();
//window.setInterval(move, 500);
window.addEventListener("keydown", keyPressed);
window.setInterval(paint, 300);
//paint();

