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