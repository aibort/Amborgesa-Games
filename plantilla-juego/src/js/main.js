'use strict';

var PlayScene = require('./play_scene.js');


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
    //this.game.load.image('logo2', 'images/toadamborgesa.jpg');
    this.game.load.image('bullet', 'images/caparazon.png');
    this.game.load.image('car', 'images/toad.png');
  },

  create: function () {
    this.game.state.start('play');
    
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
window.onload = function () {
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
function preload() {

  game.load.image('bullet', 'images/caparazon.png');
  game.load.image('car', 'images/toad.png');

}

var sprite;
var weapon;
var cursors;
var fireButton;

function create() {
  game.world.setBounds(0, 0, 1920, 1920);
  game.physics.startSystem(Phaser.Physics.P2JS);
  //  Creates 1 single bullet, using the 'bullet' graphic
  weapon = game.add.weapon(1, 'bullet');

  //  The bullet will be automatically killed when it leaves the world bounds
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

  //  Because our bullet is drawn facing up, we need to offset its rotation:
  weapon.bulletAngleOffset = 90;

  //  The speed at which the bullet is fired
  weapon.bulletSpeed = 400;

  sprite = this.add.sprite(320, 500, 'car');

  game.physics.arcade.enable(sprite);
  
  //  Tell the Weapon to track the 'player' Sprite, offset by 14px horizontally, 0 vertically
  weapon.trackSprite(sprite, 14, 0);

  cursors = this.input.keyboard.createCursorKeys();

  fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
  game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
}

function update() {

  sprite.body.velocity.x = 0;
  sprite.body.velocity.y = 0;

  if (cursors.left.isDown)
  {
      sprite.body.velocity.x = -200;
  }
  else if (cursors.right.isDown)
  {
      sprite.body.velocity.x = 200;
  }
  else if (cursors.up.isDown)
  {
      sprite.body.velocity.y = -200;
  }
  else if (cursors.down.isDown)
  {
      sprite.body.velocity.y = 200;
  }

  if (fireButton.isDown)
  {
      weapon.fire();
  }

}

function render() {

  weapon.debug();
  game.debug.cameraInfo(game.camera, 32, 32);

}