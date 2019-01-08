'use strict';

//constructor
var gameObject = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{ 
  this.sprite = game.add.sprite(posX, posY, sprite);
  this.sprite.anchor.set(anchorX, anchorY);
  this.sprite.scale.setTo(scaleX, sacaleY);
  
  game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
}

module.exports=
{
    gameObject    
}