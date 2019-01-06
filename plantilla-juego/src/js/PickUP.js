//Constructor de elementos
var gameObject = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY)
{
    this.sprite = game.add.game.sprite(posX, posY, sprite);
    this.sprite.anchor.set(anchorX, anchorY);
    this.sprite.scale.setTo(scaleX, scaleY);
    game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
    this.sprite.body.immovable = true;
}
//constructor de PickUps
var pickUp = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY)
{
this.game = game;
this.group = game.add.group();
group.add(new pickUp(game));
this.alive = true;

gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, scaleY);
};

pickUp.prototype = Object.create(gameObject.prototype);
pickUp.prototype.constructor = pickUp;

pickUp.prototype.update = function(game)
{
     game.physics.arcade.overlap(sprite, group, collisionHandler, null, this);
}

function collisionHandler (player, pickUp) {
   //if (items[rnd])
    pickUp.kill();
   
}
