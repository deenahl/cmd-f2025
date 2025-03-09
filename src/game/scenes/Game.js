
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

var cursors;
var player;

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // Create Tiled Map
        var map = this.make.tilemap({ key: "map" });
        var grass_tileset = map.addTilesetImage('Hills','hill_tiles');
        map.createLayer('hills', [grass_tileset]);

        // // Player setup
        player = this.add.sprite(512, 512, 'player').setScale(2.5);

        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNames('player', { start: 8, end: 11}),
            frameRate: 10,
            repeat: 1
        });
        
        cursors = this.input.keyboard.createCursorKeys();
        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (cursors.left.isDown) {
            player.x -= 1;
            player.anims.play('player-left', true);
        } else {
            player.anims.stop();
        }

        player.on('animationstop', function(currentAnim, currentFrame, sprite){
            sprite.setTexture = 0;
        });
        
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
