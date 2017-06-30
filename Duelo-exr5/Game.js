var canvas;
var ctx;
var map;
var pc1;
var pc2;
var dt;
var images;
var anterior = 0;
var frame = 0;
var fim = 0;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 460;
  ctx = canvas.getContext("2d");
  images = new ImageLoader();
  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,1,0,0,0,0,1,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]);
  pc1 = new Sprite();
  pc1.id = "1";
  pc1.x = 60;
  pc1.y = 60;
  pc1.w = 14;
  pc1.h = 14;
  pc1.angle = 0;
  pc1.vidas = 3;
  pc1.imunidade = 1;
  pc2 = new Sprite();
  pc2.id = "2";
  pc2.x = 460;
  pc2.y = 380;
  pc2.w = 14;
  pc2.h = 14;
  pc2.angle = 0;
  pc2.vidas = 3;
  pc2.imunidade = 1;
  initControls();
  requestAnimationFrame(passo);
}


function passo(t){
  dt = (t-anterior)/1000;
  requestAnimationFrame(passo);
  ctx.clearRect(0,0, canvas.width, canvas.height);
  if(this.fim == 0) {
    var vm1 = pc1.vm;
    var vm2 = pc2.vm;
    if(pc1.colidiuCom(pc2)) {
	     pc1.vm = -1.5*pc1.vm;
       pc2.vm = -1.5*pc2.vm;
    }
    pc1.mover(map, dt);
    pc2.mover(map, dt);
	  map.mover(dt);
    pc1.vm = vm1;
    pc2.vm = vm2;
	  map.colidiuComTiros(pc1,pc2);
	}
	map.desenhar(ctx);
	pc1.desenhar(ctx);
	pc2.desenhar(ctx);
  desenhaInfo(ctx);
	anterior = t;
	if(pc1.vidas == 0) {
		ctx.font = "50px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText("Player 2 venceu!", 50, this.canvas.height/2);
    this.fim = 1;
	}
  if(pc2.vidas == 0) {
    ctx.font = "50px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText("Player 1 venceu!", 50, this.canvas.height/2);
    this.fim = 1;
  }
}

function desenhaInfo(ctx) {
  ctx.font = "15px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText("Player 1: " + pc1.vidas + " vida(s)       " + "Player 2: " + pc2.vidas + " vida(s)", 100, 455);
}

function initControls(){
  addEventListener('keydown', function(e){
	console.log(e.keyCode)
    switch (e.keyCode) {

		// player 1
	  case 32:
		pc1.atirar(map,dt);
		break;
      case 65:
		    pc1.vang = -150;
        e.preventDefault();
        break;
      case 87:
        pc1.vm = -100;
        e.preventDefault();
        break;
      case 68:
        //pc1.vx = 100;
		    pc1.vang = 150;
        e.preventDefault();
        break;
      case 83:
        pc1.vm = 100;
        e.preventDefault();
        break;

		// player 2
	  case 13:
		  pc2.atirar(map,dt);
		break;
      case 37:
		    pc2.vang = -150;
        e.preventDefault();
        break;
      case 38:
        pc2.vm = -100;
        e.preventDefault();
        break;
      case 39:
		    pc2.vang = 150;
        e.preventDefault();
        break;
      case 40:
        pc2.vm = 100;
        e.preventDefault();
        break;
      default:

    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {

		// player 1
	  case 32:
		  pc1.atirar(map,dt);
		break;
      case 65:
		    pc1.vang = 0;
        break;
      case 87:
        pc1.vm = 0;
        break;
      case 68:
		    pc1.vang = 0;
        break;
      case 83:
        pc1.vm = 0;
        break;

		// player 2
      case 37:
		    pc2.vang = 0;
		    break;
      case 39:
		    pc2.vang = 0;
        break;
      case 38:
		    pc2.vm = 0;
		    break;
      case 40:
		    pc2.vm = 0;
        break;
      default:

    }
  });
}
