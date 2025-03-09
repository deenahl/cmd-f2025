import { useRef, useState, useEffect } from 'react';
import { PhaserGame } from './game/PhaserGame';
import BreathingDialog from './components/BreathingDialog';
import StretchingDialog from './components/StretchingDialog';

function App() {
    const [isCurrentScene, setIsCurrentScene] = useState('');
    const phaserRef = useRef(null);

    const [isBreatheDialogOpen, setIsBreatheDialogOpen] = useState(false);
    const [isStretchDialogOpen, setIsStretchDialogOpen] = useState(false);
    const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false);

    const currentScene = (scene) => {
        setIsCurrentScene(scene.scene.key);
    };

    const changeScene = (sceneName) => {
        if (phaserRef.current) {
            const game = phaserRef.current.game;
            game.scene.stop(isCurrentScene);
            game.scene.start(sceneName);
        }
        setIsCurrentScene(sceneName);
    };
    

    useEffect(() => {
        console.log('Current scene:', isCurrentScene);
    }, [isCurrentScene]);

    return (
        <div id="app" style={{ position: 'relative' }}>
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            {(isCurrentScene === 'Game' || isCurrentScene === 'GameOver') && (
                <div>
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
                    {isBreatheDialogOpen && (
                        <BreathingDialog 
                            open={isBreatheDialogOpen} 
                            onClose={() => setIsBreatheDialogOpen(false)} 
                            changeScene={changeScene}
                        />
                    )}

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
                    {isStretchDialogOpen && (
                        <StretchingDialog 
                            open={isStretchDialogOpen} 
                            onClose={() => setIsStretchDialogOpen(false)} 
                            changeScene={changeScene}
                        />
                    )}
                    
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
                </div>
            )}
        </div>
    );
}

export default App;
