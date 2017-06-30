function Map(rows, collumns) {
  this.SIZE = 32;
  this.enemies = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c] == 1) {
	   ctx.fillStyle = "black";
	  }
	  else if(this.cells[r][c] != 0 && this.cells[r][c] < 5){
        ctx.fillStyle = "grey";
      } else if(this.cells[r][c] == 5) {
		ctx.fillStyle = "yellow";
	  } else if(this.cells[r][c] == 6) {
		ctx.fillStyle = "red";
	  }
    
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
	ctx.fillStyle = "white"; // resetando o fillstyle
	}
  }
};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1; // indestrutivel
          break;
        case 2:
          this.cells[i][j] = 2; // destrutivel vazio
          break;
		case 3:
			this.cells[i][j] = 3; // tesouro
			break;
		case 4:
			this.cells[i][j] = 4; // mina
			break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};

Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};
