import { useState, useRef } from "react";
import { PhaserGame } from "./game/PhaserGame";
import BreathingDialog from "./components/BreathingDialog";
import StretchingDialog from "./components/StretchingDialog";
import JournalDialog from "./components/JournalDialog";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  // References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef();
  const [isBreatheDialogOpen, setIsBreatheDialogOpen] = useState(false);
  const [isStretchDialogOpen, setIsStretchDialogOpen] = useState(false);
  const [isJournalDialogOpen, setIsJournalDialogOpen] = useState(false);

  // Event emitted from the PhaserGame component
  const currentScene = (scene) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
  };

  return (
    <div id="app">
    {isBreatheDialogOpen && (
      <div
       style={{
        position: "fixed",
        top: 0,
        left: "21.5%",
        width: "60vw",
        height: "100vh",
        backgroundImage: `url("https://img.itch.zone/aW1nLzgxNTEyNDEuZ2lm/original/5VFXUt.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
       }}
     />
    )}
    {isStretchDialogOpen && (
      <div
       style={{
        position: "fixed",
        top: 0,
        left: "21.5%",
        width: "60vw",
        height: "100vh",
        backgroundImage: `url("https://img.itch.zone/aW1nLzgxNTEyNTMuZ2lm/original/f0xwbV.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
     />
    )}

    {isJournalDialogOpen && (
      <div
       style={{
        position: "fixed",
        top: 0,
        left: "21.5%",
        width: "60vw",
        height: "100vh",
        backgroundImage: `url("https://img.itch.zone/aW1nLzgxNTEyNDUuZ2lm/original/haqTgP.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        }}
      />
    )}

      <div style={{ visibility: isBreatheDialogOpen || isStretchDialogOpen || isJournalDialogOpen ? "hidden" : "visible" }}>
        <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
      </div>

      <button
        onClick={() => setIsBreatheDialogOpen(true)}
        style={{
          position: "absolute",
          top: "30px",
          left: "360px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "320px",
          height: "210px",
          outline: "none",
        }}
      ></button>
      {isBreatheDialogOpen && (
        <BreathingDialog open={isBreatheDialogOpen} onClose={() => setIsBreatheDialogOpen(false)} />
      )}

      <button
        onClick={() => setIsStretchDialogOpen(true)}
        style={{
          position: "absolute",
          bottom: "40px",
          right: "360px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "320px",
          height: "210px",
          outline: "none",
        }}
      ></button>
      {isStretchDialogOpen && (
        <StretchingDialog open={isStretchDialogOpen} onClose={() => setIsStretchDialogOpen(false)} />
      )}

      <button
        onClick={() => setIsJournalDialogOpen(true)}
        style={{
          position: "absolute",
          top: "100px",
          right: "280px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          width: "280px",
          height: "230px",
          outline: "none",
        }}
      ></button>
      {isJournalDialogOpen && (
        <JournalDialog open={isJournalDialogOpen} onClose={() => setIsJournalDialogOpen(false)} />
      )}
    </div>
  );
}

export default App;
