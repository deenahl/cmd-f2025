import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

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

        // Player setup

        
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
