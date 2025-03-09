import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('logo', 'assets/logo.png');
        this.load.image('background', 'assets/mainmenubackground.png');
        // this.load.image('chick', 'assets/Sprout Lands - Sprites - Basic pack/Characters/Free Chicken Sprites.png');
        this.load.spritesheet('chick', 'Sprout Lands - Sprites - Basic pack/Characters/Free Chicken Sprites.png', { 
            frameWidth: 16, 
            frameHeight: 16
        });
        this.load.spritesheet('cow', 'Sprout Lands - Sprites - Basic pack/Characters/Free Cow Sprites.png', {
            frameWidth: 32,  // the cow sprite is 32x32 pixels per frame
            frameHeight: 32
        });
        this.load.image('rectangle', 'assets/Rectangle.png');

        // Load tileset images
        this.load.image('grass', 'assets/tilemap/Grass.png');
        this.load.image('hills', 'assets/tilemap/Hills.png');
        this.load.image('dirt', "assets/tilemap/Tilled_Dirt_v2.png");
        this.load.image('doors', 'assets/tilemap/Doors.png');
        this.load.image('fences', 'assets/tilemap/Fences.png');
        this.load.image('roof', 'assets/tilemap/Wooden_House_Roof_Tilset.png');
        this.load.image('walls', 'assets/tilemap/Wooden_House_Walls_Tilset.png');
        this.load.image('water', 'assets/tilemap/Water.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemap/map.json');
        this.load.spritesheet('player', 'assets/Characters/Basic Charakter Spritesheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.image('tree0', 'assets/Objects/Tree0.png');
        this.load.image('tree1', 'assets/Objects/Tree1.png');
        this.load.image('tree2', 'assets/Objects/Tree2.png');
        this.load.image('tree3', 'assets/Objects/Tree3.png');
        this.load.image('tree4', 'assets/Objects/Tree4.png');
    }

    create ()
    {
        this.scene.start('Login');

    }
}
