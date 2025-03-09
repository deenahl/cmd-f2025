import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import BreathingDialog from './components/BreathingDialog'
import StretchingDialog from './components/StretchingDialog';
import JournalDialog from './components/JournalDialog';

function App ()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });
    const [isBreatheDialogOpen, setIsBreatheDialogOpen] = useState(false);
    const [isStretchDialogOpen, setIsStretchDialogOpen] = useState(false);
    const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false);

    const changeScene = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }

    const moveSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene && scene.scene.key === 'MainMenu')
        {
            // Get the update logo position
            scene.moveLogo(({ x, y }) => {

                setSpritePosition({ x, y });

            });
        }
    }

    const addSprite = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <button
                onClick={() => setIsBreatheDialogOpen(true)}
                style={{
                    position: 'absolute',
                    top: '30px',
                    left: '360px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '320px',
                    height: '210px',
                    outline: 'none',
                }}
            >
            {''}
            </button>
            {isBreatheDialogOpen && <BreathingDialog open={isBreatheDialogOpen} onClose={() => setIsBreatheDialogOpen(false)} />}
            <button
                onClick={() => setIsStretchDialogOpen(true)}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '360px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '320px',
                    height: '210px',
                    outline: 'none',
                }}
            >
            {''}
            </button>
            {isStretchDialogOpen && <StretchingDialog open={isStretchDialogOpen} onClose={() => setIsStretchDialogOpen(false)} />}
            <button
                onClick={() => setIsJournalDialogOpen(true)}
                style={{
                    position: 'absolute',
                    top: '100px',
                    right: '280px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    width: '280px',
                    height: '230px',
                    outline: 'none',
                }}
            >
            {''}
            </button>
            {isJournalDialogOpen && <JournalDialog open={isJournalDialogOpen} onClose={() => setIsJournalDialogOpen(false)} />}
        </div>
    )
}

export default App