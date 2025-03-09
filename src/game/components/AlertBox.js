export class AlertBox {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }

    create() {
        // Create semi-transparent background overlay
        const overlay = this.scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.5);

        // Create alert box background
        const boxWidth = 600;
        const boxHeight = 300;
        const box = this.scene.add.rectangle(512, 384, boxWidth, boxHeight, 0xECE3CA);
        box.setStrokeStyle(2, 0x793205);

        // Add title
        const title = this.scene.add.text(512, 284, 'Practice Deep Breathing', {
            fontFamily: 'Arial Black',
            fontSize: 24,
            color: '#793205',
            fontWeight: '800',
            align: 'center'
        }).setOrigin(0.5);

        // Add description text
        const description = this.scene.add.text(512, 384, 'Deep breathing is recommended for 5 minutes a day.\nIt involves focusing on full, cleansing breaths.\nFind a quiet place to sit or stretch out and let me\nknow when you\'re ready to start', {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#793205',
            fontWeight: '300',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Create buttons
        const buttonWidth = 150;
        const buttonHeight = 40;
        const buttonY = 484;
        const buttonSpacing = 20;

        // "Another Time" button
        const anotherTimeButton = this.scene.add.text(512 - buttonWidth/2 - buttonSpacing, buttonY, 'Another Time', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#793205',
            fontWeight: '800',
            backgroundColor: '#DBCA9B',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => anotherTimeButton.setStyle({ backgroundColor: '#C2B693' }))
        .on('pointerout', () => anotherTimeButton.setStyle({ backgroundColor: '#DBCA9B' }))
        .on('pointerdown', () => this.close());

        // "I'm Ready" button
        const readyButton = this.scene.add.text(512 + buttonWidth/2 + buttonSpacing, buttonY, 'I\'m Ready', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#793205',
            fontWeight: '800',
            backgroundColor: '#DBCA9B',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => readyButton.setStyle({ backgroundColor: '#C2B693' }))
        .on('pointerout', () => readyButton.setStyle({ backgroundColor: '#DBCA9B' }))
        .on('pointerdown', () => this.close());

        // Store references for cleanup
        this.elements = [overlay, box, title, description, anotherTimeButton, readyButton];
    }

    close() {
        // Remove all elements
        this.elements.forEach(element => {
            if (element && element.destroy) {
                element.destroy();
            }
        });
    }
}