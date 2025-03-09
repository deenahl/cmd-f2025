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
    }

    create ()
    {
        this.scene.start('Login');

    }
}
