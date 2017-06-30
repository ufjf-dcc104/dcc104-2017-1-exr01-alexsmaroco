var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 480;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  images.load("pc","pc.png");
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,2,2,2,2,2,2,2,2,2,1],
    [1,0,0,3,2,2,2,2,2,2,2,2,1],
    [1,1,2,4,2,2,2,2,4,2,2,3,1],
    [1,2,2,1,2,2,1,2,2,2,2,4,1],
    [1,2,2,2,2,2,2,2,2,2,2,1,1],
    [1,2,2,4,2,1,2,2,2,2,2,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,2,1,2,4,2,2,1,3,2,2,1],
    [1,2,2,2,2,4,2,3,3,4,4,4,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc = new Sprite();
  pc.x = 60;
  pc.y = 60;
  pc.minas = 0;
  pc.tesouros = 0;
  pc.images = images;
  initControls();
  requestAnimationFrame(passo);
}

function desenhaInfo() {
	if(pc.pisouMina) {
		this.ctx.font = "50px Arial";
		this.ctx.fillStyle = "red";
  this.ctx.fillText("Voce perdeu!", 50, canvas.height/2);
	}
  this.ctx.font = "15px Arial";
  this.ctx.fillStyle = "blue";
  this.ctx.fillText("Minas proximas: " + pc.minas + "     " + "Tesouros proximos: " + pc.tesouros, 100, 455);
}

function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  if(!pc.pisouMina) {
	pc.mover(map, dt);
	map.mover(dt);
  }
  map.desenhar(ctx);
  pc.desenhar(ctx);
  desenhaInfo();
  console.log("Minas: " + pc.minas + "   Tesouros " + pc.tesouros);
  anterior = t;
}


function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 37:
        pc.vx = -100;
		pc.vy = 0;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        pc.vy = -100;
		pc.vx = 0;
        pc.pose = 3;
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
		pc.vy = 0;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        pc.vy = 100;
		pc.vx = 0;
        pc.pose = 1;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 37:
		pc.vx = 0;
		break;
      case 39:
        pc.vx = 0;
        //pc.pose = 4;
        break;
      case 38:
		pc.vy = 0;
		break;
      case 40:
        pc.vy = 0;
        break;
      default:

    }
  });
}
