import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { AlertBox } from '../components/AlertBox';

const PLAYER_SPEED = 2;
var cursors;
var player;
// var player_start;


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
        var hill_tileset = map.addTilesetImage('Hills','hills');
        // var grass_tileset = map.addTilesetImage("Grass", "grass");
        map.createLayer('Hills', [hill_tileset]);



        // // Player setup
        player = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player', 0).setScale(2.5);
        // player_start = player.frame;

        this.anims.create({
            key: 'player-left',
            frames: this.anims.generateFrameNames('player', { start: 8, end: 11}),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'player-right',
            frames: this.anims.generateFrameNames('player', {start: 12, end: 15}),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'player-down',
            frames: this.anims.generateFrameNames('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'player-up',
            frames: this.anims.generateFrameNames('player', {start: 4, end: 7}),
            frameRate: 10,
            repeat: 1
        });
        
        cursors = this.input.keyboard.createCursorKeys();
        
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        if (cursors.left.isDown) {
            player.x -= PLAYER_SPEED;
            player.anims.play('player-left', true);
        } else if (cursors.right.isDown) {
            player.x += PLAYER_SPEED;
            player.anims.play('player-right', true);
        } else if (cursors.down.isDown) {
            player.y += PLAYER_SPEED;
            player.anims.play('player-down', true);
        } else if (cursors.up.isDown) {
            player.y -= PLAYER_SPEED;
            player.anims.play('player-up', true);
        } else {
            player.stop();
            player.anims.restart();
        }

        // Check for meditation spot
        if (!meditationDialogShown && 
            player.x === 500 && 
            player.y === 512) 
        {
            meditationDialogShown = true;
            new AlertBox(this);
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
