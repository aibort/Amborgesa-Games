(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var CAR= require('./player.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('toad', 'images/mapa.png');
    this.game.load.image('redcar', 'images/redcar.png');
    this.game.load.tilemap('mapa', 'images/mapa/mapa.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('earth', 'images/Earth.png');
  },

  create: function () {
    this.game.state.start('play');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":2,"./player.js":3}],2:[function(require,module,exports){
'use strict';

var CAR= require('./player.js');

var PlayScene = {

  create: function () {
   
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0,0,10000,10000);

   /* this.map = this.game.add.tilemap('mapa');
    this.map.addTilesetImage('Earth', 'earth');
    
    this.suelo = this.map.createLayer('suelo');
    this.muros = this.map.createLayer('muros');
    this.suelo.resizeWorld();
    this.muros.resizeWorld();*/

    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'toad');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(4.2,4.2);

    this.jugador = new CAR.player(this.game, 'redcar', this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.1, 0.1);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  update: function() {
    //UPDATE DE MOVIMIENTO    
    this.jugador.update(this.cursors, this.game);
      
    this.game.camera.follow(this.jugador.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.7, 0.7); 
  },

  render: function() {
    //game.debug.cameraInfo(game.camera, 32, 32);
  }
};


module.exports = PlayScene;

},{"./player.js":3}],3:[function(require,module,exports){
//CONSTRUCTOR DE ELEMENTOS DEL MAPA
var gameObject = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{
  
  this.sprite = game.add.sprite(posX, posY, sprite);
  this.sprite.anchor.set(anchorX, anchorY);
  this.sprite.scale.setTo(scaleX, sacaleY);
  game.physics.enable(this.sprite,Phaser.Physics.ARCADE);
  
  this.sprite.body.immovable = true;
  this.sprite.body.colliderWorldBounds = true;
  this.sprite.body.bounce.setTo(1, 1);
  this.sprite.allowRotation = true;
  this.sprite.angle += -90;
}

//CONSTRUCTOR DE VEHICULOS
var vehicle = function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{
  this.game = game
  this.velocity = 0;
  this.acceleration = 5;
  this.MaxVelocity = 900;
  this.MinVelocity =-200;  
  this.alive = true;

 
  gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY);
};
vehicle.prototype = Object.create(gameObject.prototype);
vehicle.prototype.constructor = vehicle;

//CONSTRUCTOR DE PLAYER
var player=function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{
  this.game=game;
  vehicle.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY);
};
player.prototype = Object.create(vehicle.prototype);
player.prototype.constructor = player;

//PLAYER UPDATE
player.prototype.update = function(cursors,game)
{

  if(this.velocity!=0)
  {
  if(cursors.left.isDown){ this.sprite.angle -= 2; }

  else if(cursors.right.isDown){ this.sprite.angle += 2; }
  }

   if(cursors.up.isDown)
  { 
    this.velocity += this.acceleration; 

    if(this.velocity > this.MaxVelocity)
    this.velocity = this.MaxVelocity;
  }
  else if(cursors.down.isDown)
  { 
    this.velocity -= this.acceleration*3; 

    if(this.velocity < this.MinVelocity)
    this.velocity = this.MinVelocity;
  }
  else if(this.velocity>0)
  {
    this.velocity-=this.acceleration;
  }

  else if(this.velocity<0)
  {
    this.velocity+=this.acceleration;
  } 

  game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.velocity, this.sprite.body.velocity); 
  //game.world.wrap(this.sprite, 16);
};

module.exports=
{
    gameObject,
    vehicle,
    player
}
},{}]},{},[1]);
