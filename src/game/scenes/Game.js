import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

const PLAYER_SPEED = 2;
var cursors;
var player;
var cow;
var chick;
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

        // Create Background Tileset
        var hill_tileset = map.addTilesetImage('Hills','hills');
        var dirt_tileset = map.addTilesetImage("Dirt", "dirt");
        var grass_tileset = map.addTilesetImage("Grass", "grass"); 
        var door_tileset = map.addTilesetImage("Doors", "doors");
        var fence_tileset = map.addTilesetImage("Fences", "fences");
        var roof_tileset = map.addTilesetImage("House_Root", "roof");
        var wall_tileset = map.addTilesetImage("House_Walls", "walls");
        var water_tileset = map.addTilesetImage("Water", 'water');

        // Create Object Tileset
        var furniture_tileset = map.addTilesetImage("Furniture", "furniture");
        var biom_tileset = map.addTilesetImage("Biom", "biom");
        var plant_tileset = map.addTilesetImage("Plants", "plants");
        var path_tileset = map.addTilesetImage("Paths", "paths");
        var milk_tileset = map.addTilesetImage("Milk", "milk");
        var bridge_tileset = map.addTilesetImage("Bridge", "bridge"); 

        // map.createLayer('Hills', [hill_tileset]);
        map.createLayer('Hills', [hill_tileset, water_tileset, grass_tileset]);
        map.createLayer('Jen', [dirt_tileset, grass_tileset, water_tileset, hill_tileset]);
        map.createLayer('House', [wall_tileset, door_tileset]);
        map.createLayer('Britney', [dirt_tileset, grass_tileset, fence_tileset, water_tileset]);
        // map.createLayer('Jen', []);

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

        // Cow Animations
        // cow = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'cow', 0).setScale(2.5);
        // this.anims.create({
        //     key: 'cow',
        //     frames: this.anims.generateFrameNames('cow', {start: 0, end: 4}),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // cow.anims.play('cow', true);

        // Chicken Animations
        chick = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'chick', 0).setScale(2.5);
        this.anims.create({
            key: 'chick',
            frames: this.anims.generateFrameNames('chick', {start: 4, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        chick.anims.play('chick', true);
        
        
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        EventBus.emit('current-scene-ready', this);
    }

    update() {
        // cow.anims.play('cow', true);
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
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
