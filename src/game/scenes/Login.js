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

        // Add chick sprite below welcome text
        this.add.sprite(512 - 128, 360, 'chick') 
            .setScale(5) 
            .play('chick-idle');

        // Add cow sprite next to chick
        this.add.sprite(512 + 128, 350, 'cow') // 128 pixels right of center (quarter of half-width)
            .setScale(3.5)  // Cow sprite is 32x32, so we use half the scale of chick
            .play('cow-idle');

        // Add rectangles in bottom corners
        const leftRect = this.add.image(-50, 800, 'rectangle')
            .setScale(0.4)
            .setOrigin(0, 1); // Origin at bottom-left corner
            
        const rightRect = this.add.image(1074, 800, 'rectangle')
            .setScale(0.4)
            .setOrigin(1, 1); // Origin at bottom-right corner


        // Add login button
        const buttonWidth = 200;
        const buttonHeight = 60;
        const cornerRadius = 30;
        const buttonY = 750; // Position button above the rectangle
        const buttonX = 50; // Position button over the left rectangle
        
        // Create rounded rectangle background
        const buttonBackground = this.add.graphics();
        buttonBackground.fillStyle(0x8AB5BC);
        buttonBackground.lineStyle(2, 0x000000);
        buttonBackground.fillRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
        buttonBackground.strokeRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
        
        const loginButton = this.add.text(340, 600, 'Click to Start', {
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
            buttonBackground.clear();
            buttonBackground.fillStyle(0x8AB5BC);
            buttonBackground.lineStyle(2, 0xffff00);
            buttonBackground.fillRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            buttonBackground.strokeRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            loginButton.setStyle({ color: '#ffff00' });
        })
        .on('pointerout', () => {
            buttonBackground.clear();
            buttonBackground.fillStyle(0x8AB5BC);
            buttonBackground.lineStyle(2, 0x000000);
            buttonBackground.fillRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            buttonBackground.strokeRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            loginButton.setStyle({ color: '#ffffff' });
        })
        .on('pointerdown', () => this.handleLogin());

        const rightButton = this.add.text(695, 600, 'Quit', {
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
            buttonBackground.clear();
            buttonBackground.fillStyle(0x8AB5BC);
            buttonBackground.lineStyle(2, 0xffff00);
            buttonBackground.fillRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            buttonBackground.strokeRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            rightButton.setStyle({ color: '#ffff00' });
        })
        .on('pointerout', () => {
            buttonBackground.clear();
            buttonBackground.fillStyle(0x8AB5BC);
            buttonBackground.lineStyle(2, 0x000000);
            buttonBackground.fillRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            buttonBackground.strokeRoundedRect(buttonX, buttonY - buttonHeight/2, buttonWidth, buttonHeight, cornerRadius);
            rightButton.setStyle({ color: '#ffffff' });
        })
        .on('pointerdown', () => {
            // Quit the game
            window.close();
            this.game.destroy(true);
        });


        EventBus.emit('current-scene-ready', this);
    }

    handleLogin() {
        this.scene.start('MainMenu');
    }
} 