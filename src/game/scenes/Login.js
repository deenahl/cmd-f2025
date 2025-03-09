import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class Login extends Scene {
    constructor() {
        super('Login');
    }

    create() {
        // Add background
        const bg = this.add.image(512, 384, 'background');
        const scaleX = this.cameras.main.width / bg.width;
        const scaleY = this.cameras.main.height / bg.height;
        const scale = Math.max(scaleX, scaleY);
        bg.setScale(scale);

        // Add title
        this.add.text(512, 200, 'Welcome!', {
            fontFamily: 'Arial Black',
            fontSize: 48,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Add animated chick
        this.anims.create({
            key: 'chick-idle',
            frames: this.anims.generateFrameNumbers('chick', { 
                frames: [4, 5, 6, 7, 8]
            }),
            frameRate: 5,
            repeat: -1
        });

        // Add cow animation
        this.anims.create({
            key: 'cow-idle',
            frames: this.anims.generateFrameNumbers('cow', { 
                frames: [2, 3, 4]
                    }),
                frameRate: 4,
                repeat: -1
            });
        
        this.add.sprite(512 - 128, 360, 'chick') 
            .setScale(5) 
            .play('chick-idle');
        
        this.add.sprite(512 + 128, 350, 'cow')
            .setScale(3.5) 
            .play('cow-idle');
        
        const leftRect = this.add.image(-50, 800, 'rectangle')
            .setScale(0.4)
            .setOrigin(0, 1); 
                    
        const rightRect = this.add.image(1074, 800, 'rectangle')
            .setScale(0.4)
            .setOrigin(1, 1);

        // Add buttons    
        this.createButton(340, 600, 'Click to Start', () => this.handleLogin());
        this.createButton(695, 600, 'Quit', () => {
            window.close();
            this.game.destroy(true);
        });

        EventBus.emit('current-scene-ready', this);
    }

    createButton(x, y, text, onClick) {
        const buttonWidth = 200;
        const buttonHeight = 60;
        const cornerRadius = 30;
    
        const buttonBg = this.add.graphics();
        const drawButton = () => {
            buttonBg.clear();
            buttonBg.fillStyle(0x8AB5BC, 0);
            buttonBg.fillRoundedRect(x - buttonWidth / 2, y - buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
        };
    
        drawButton(1);
    
        const buttonText = this.add.text(x, y, text, {
            fontFamily: 'Arial Black',
            fontSize: 20,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
            drawButton(0);
            buttonText.setStyle({ color: '#ffff00' });
        })
        .on('pointerout', () => {
            drawButton(1);
            buttonText.setStyle({ color: '#ffffff' });
        })
        .on('pointerdown', onClick);
    }
    

    handleLogin() {
        this.scene.start('Game');
    }
}
