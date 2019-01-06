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
    this.jugador2 = new CAR.player(this.game, 'bluecar', this.game.world.centerX+40, this.game.world.centerY, 0.5, 0.5, 0.1, 0.1);
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
    //UPDATE DE MOVIMIENTO    
    this.jugador.update(this.cursors, this.game);
    this.jugador2.update(this.wasd, this.game);
      
    this.game.camera.follow(this.jugador.sprite, Phaser.Camera.FOLLOW_LOCKON, 0.7, 0.7); 
  },

  render: function() {
    //game.debug.cameraInfo(game.camera, 32, 32);
  }
};


module.exports = PlayScene;
