
function Sprite(cor,x,y) {
  this.x = x
  this.y = y
  this.altura = 15
  this.largura = 15
  this.vx = 0
  this.vy = 0
  this.ax = 0
  this.ay = 0
  this.vento = 0
  this.grav = 30
  this.cor = cor
  this.podeMover = true
}


Sprite.prototype.desenhar = function(ctx) {
  ctx.save()
  ctx.translate(this.x, this.y)
  ctx.fillStyle = this.cor
  ctx.strokeStyle = this.cor
  ctx.fillRect(-this.largura/2,-this.altura/2,this.largura,this.altura)
  ctx.strokeRect(-this.largura/2, -this.altura/2, this.largura, this.altura)
  ctx.restore()
}

Sprite.prototype.mover = function(dt) {
  if(this.podeMover) {
	this.vx = this.vx + (this.ax+this.vento)*dt
	this.vy = this.vy + (this.ay+this.grav)*dt
	this.x = this.x + this.vx*dt
	this.y = this.y + this.vy*dt
  }
}

Sprite.prototype.colidiuCom = function(alvo) {
  if(this.x+this.largura/2 < alvo.x-alvo.largura/2) return false
  if(this.x-this.largura/2 > alvo.x+alvo.largura/2) return false
  if(this.y+this.altura/2 < alvo.y-alvo.altura/2) return false
  if(this.y-this.altura/2 > alvo.y+alvo.altura/2) return false
  return true
}
