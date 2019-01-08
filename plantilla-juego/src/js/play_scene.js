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
    //muro
    this.muro1= new objeto.gameObject(this.game, 'muro', this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.1, 0.1 );
  
    this.objetos = this.game.add.group();
    this.game.physics.enable(this.jugador, Phaser.Physics.ARCADE);
    this.game.physics.enable(this.muro1, Phaser.Physics.ARCADE);
    //this.objetos.add(this.jugador,false);
    //this.objetos.add(this.jugador2);
    //this.objetos.add(this.muro1);

  },

  update: function() {
    //update de los jugadores  
    this.jugador.update(this.cursors, this.game);
    this.jugador2.update(this.wasd, this.game);
   
    this.game.physics.arcade.collide(this.jugador.sprite, this.jugador2.sprite);

    this.muro1.sprite.posX= this.jugador.sprite.posX;
      
    this.game.camera.follow(this.jugador.sprite); 
  },

  render: function() {
  },

  fin: function(){
    this.game.state.start('menu');
  },
};


module.exports = PlayScene;
