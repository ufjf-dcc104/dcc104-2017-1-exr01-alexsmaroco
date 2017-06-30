function level() {
	this.paredes = []
	this.numParedes = 2
	this.plataformaPouso = null
}

level.prototype.iniciar = function () {
	for (var i = 0; i < this.numParedes; i++) {
		var parede = new Sprite("red", 175 + 50 * i, 200)
		parede.largura = 5
		parede.altura = 50
		parede.grav = 0
		parede.vy = 20 * (Math.pow(-1, i))
		parede.podeMover = true
		this.paredes.push(parede)
	}
	this.plataformaPouso = new Sprite("green", 200, 250)
	this.plataformaPouso.largura = 25
	this.plataformaPouso.altura = 5
	this.plataformaPouso.grav = 0
	this.plataformaPouso.podeMover = false
}

level.prototype.mover = function (dt) {
	for (var i = 0; i < this.paredes.length; i++) {
		if (this.paredes[i].y < 100 || this.paredes[i].y > 250) {
			this.paredes[i].vy = -this.paredes[i].vy
		}
		this.paredes[i].mover(dt)
	}
}

level.prototype.desenhar = function (ctx) {
	this.plataformaPouso.desenhar(ctx)
	for (var i = 0; i < this.paredes.length; i++) {
		this.paredes[i].desenhar(ctx)
	}
}

level.prototype.colisoes = function (alvo, ctx) {
	var vitoria = false
		if (alvo.y > 300 || alvo.y < 0 || alvo.x > 300 || alvo.x < 0) {
			vitoria = false
			return fim(vitoria, ctx)
		}
		if (alvo.colidiuCom(this.plataformaPouso)) {
			if (alvo.vx < 10 && alvo.vy < 20 && alvo.vy > 0) { // vy > 0 para evitar pouso em baixo da plataforma
				vitoria = true
				return fim(vitoria, ctx)
			} else {
				vitoria = false
				return fim(vitoria, ctx)
			}
		}
		for (i = 0; i < this.paredes.length; i++) {
			if (alvo.colidiuCom(this.paredes[i])) {
				vitoria = false
				return fim(vitoria, ctx)
			}
		}
		return false
}

level.prototype.pararMov = function () {
	for (i = 0; i < this.paredes.length; i++) {
		this.paredes[i].podeMover = false
	}
	this.plataformaPouso.podeMover = false
}

function fim(vitoria, ctx) {
	if (vitoria) {
		console.log("Pousou com segurança!")
		ctx.fillStyle = "blue"
		ctx.fillText("Parabéns! Pousou com segurança", 10, 30)
	} else {
		console.log("Colidiu!")
		ctx.fillStyle = "red"
		ctx.fillText("Ops! Houve uma colisão", 10, 30)
	}
	return true
}
