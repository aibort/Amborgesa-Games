(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var Menu = require('./menu.js');
//var CAR= require('./player.js');

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
    this.game.load.image('bluecar', 'images/bluecar.png');
    this.game.load.spritesheet('play', 'images/play.png', 194, 100, 2);
    this.game.load.image('fondomenu', 'images/fondomenu.jpg');
  },

  create: function () {
    this.game.state.start('menu');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('menu', Menu);

  game.state.start('boot');
};

},{"./menu.js":3,"./play_scene.js":4}],3:[function(require,module,exports){
'use strict';

var Menu = {

    create:function(){   
        this.background = this.game.add.image(0, 0, 'fondomenu');

        this.playButton = this.game.add.button(300, 200, 'play', this.play, this, 1, 0, 1);
    },
    play: function(){
        this.game.state.start('play');
    },

};

module.exports= Menu;
},{}],4:[function(require,module,exports){
  'use strict';

var jugadores= require('./player.js');
var objeto= require('./gameObject.js');

var PlayScene = {

  create: function () {
   
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0,0,2220,2220);

    //circuito
    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'toad');
    logo.anchor.setTo(0.5, 0.5);
    logo.scale.setTo(4.2,4.2);
    
    //jugadores
    this.jugador = new jugadores.player(this.game, 'redcar', this.game.world.centerX-300, this.game.world.centerY+390, 0.4, 0.5, 0.1, 0.1);
    this.jugador2 = new jugadores.player(this.game, 'bluecar', this.game.world.centerX-300, this.game.world.centerY+430, 0.4, 0.5, 0.1, 0.1);
    //cursores jugador 1
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //cursores jugador 2
    this.wasd = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
  },

  update: function() {
    //update de los jugadores  
    this.jugador.update(this.cursors, this.game);
    this.jugador2.update(this.wasd, this.game);
   
    this.game.physics.arcade.collide(this.jugador.sprite, this.jugador2.sprite);
      
    this.game.camera.follow(this.jugador.sprite); 
  },

  render: function() {
  },

  fin: function(){
    this.game.state.start('menu');
  },
};


module.exports = PlayScene;

},{"./gameObject.js":1,"./player.js":5}],5:[function(require,module,exports){
'use strict';

var objeto= require('./gameObject.js');

//constructor
var player=function(game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY)
{
  this.game=game;
  this.maxVel = 600;
  this.minVel =-300; 
  this.velocity = 0;
  this.acceleration = 6;
  
  objeto.gameObject.call(this, game, sprite, posX, posY, anchorX, anchorY, scaleX, sacaleY);
};
player.prototype = Object.create(objeto.gameObject.prototype);
player.prototype.constructor = player;

//update de player
player.prototype.update = function(cursors,game)
{
  //rotación del coche, siempre que esté en movimiento
  if(this.velocity!=0)
  {
  if(cursors.left.isDown){ this.sprite.angle = this.sprite.angle - 4; }

  else if(cursors.right.isDown){ this.sprite.angle = this.sprite.angle + 4; }
  }

  //aceleración hasta alcanzar la velocidad maxima
   if(cursors.up.isDown)
  { 
    this.velocity = this.velocity + this.acceleration; 

    if(this.velocity > this.maxVel)
    this.velocity = this.maxVel;
  }
  //deceleración hasta alcanzar la velocidad minima
  else if(cursors.down.isDown)
  { 
    this.velocity = this.velocity - this.acceleration; 

    if(this.velocity < this.minVel)
    this.velocity = this.minVel;
  }

  //frenado del coche cuando se deja de pulsar el acelerador o el decelerador
  else if(this.velocity>0)
  {
    this.velocity= this.velocity - this.acceleration;
  }

  else if(this.velocity<0)
  {
    this.velocity = this.velocity + this.acceleration;
  } 

  game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.velocity, this.sprite.body.velocity);
};

module.exports=
{   
    player
}
},{"./gameObject.js":1}]},{},[2]);
