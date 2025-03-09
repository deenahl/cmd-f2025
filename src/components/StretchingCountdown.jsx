import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { DialogContentText } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

// eslint-disable-next-line react/prop-types
export default function StretchingCountdown({ onClose }) {
    const [timer, setTimer] = useState("05:00");
    const [isPaused, setIsPaused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(5 * 60 * 1000);

    const timerRef = useRef(null);
    const deadlineRef = useRef(null);

    const formatTime = (timeInMs) => {
        const totalSeconds = Math.floor(timeInMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
    };

    const startTimer = () => {
        let { total } = getTimeRemaining(deadlineRef.current);

        if (total >= 0) {
            setTimer(formatTime(total));

            if (total === 0) {
                onTimerEnd();
            }
        }
    };

    const clearTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            startTimer();
        }, 1000);
    };

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        return {
            total,
            minutes: Math.floor((total / 1000 / 60) % 60),
            seconds: Math.floor((total / 1000) % 60),
        };
    };

    const getDeadTime = () => {
        return new Date(new Date().getTime() + remainingTime);
    };

    const onTimerEnd = () => {
        clearInterval(timerRef.current);
        onClose();
    };

    const onClickStart = () => {
        deadlineRef.current = getDeadTime();
        clearTimer();
        setIsPaused(false);
    };

    const onClickPause = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setRemainingTime(Date.parse(deadlineRef.current) - Date.parse(new Date()));
        setIsPaused(true);
    };

    const onClickReset = () => {
        clearInterval(timerRef.current);
        setRemainingTime(5 * 60 * 1000);
        setTimer(formatTime(remainingTime));
        setIsPaused(true);
    };

    useEffect(() => {
        onClickStart();
        return () => {
            clearInterval(timerRef.current);
        };
    }, []);

    return (
    <Box sx={{backgroundColor: "#ece3ca"}}>
      <DialogContent>
        <div style={{ textAlign: "center", margin: "auto", color: "#793205", fontWeight: 800 }}>
            <h1>{timer}</h1>
        </div>
        <DialogContentText sx={{color: "#793205"}}>
            {<strong>1. </strong>}
            <Tooltip title="Slowly rotate your head to look over your left shoulder. Hold this position. Come back to the center then slowly rotate your head to look over your right shoulder. Come back to the center and repeat.">
            {"Start with some head turns."}
            </Tooltip>
            <br />
            {<strong>2. </strong>}
            <Tooltip title="Cross your right arm over your chest. Place your left hand on your right elbow and gently pull your right arm across your body. Hold this position for up to 30 seconds. Repeat for the other arm.">
            {"Move on to cross arm stretches"}
            </Tooltip>
            <br />
            {<strong>3. </strong>}
            <Tooltip title="Place one hand behind your back and pull it gently with the opposite hand. Switch the placement of your hands and repeat.">
            {"Next let's do some hand behind back stretches"}
            </Tooltip>
            <br />
            {<strong>4. </strong>}
            <Tooltip title="Standing, place your hands on the back of your hips. Push your hips forward and arch your back and look up towards the ceiling. Focus on relaxing into this position as you hold.">
            {"Continue with some standing back extensions."}
            </Tooltip>
            <br />
            {<strong>5. </strong>}
            <Tooltip title="Lunge forward with one leg, keeping your chest upright and pushing your other hip forward. Return to standing and repeat on the other side.">
            {"Let's end with some hip flexor stretches."}
            </Tooltip>
      </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isPaused ? (
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
            backgroundColor: "#c2b693"},}} onClick={onClickStart}>
                {"Start Timer"}
            </Button>
        ) : (
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
            backgroundColor: "#c2b693"},}} onClick={onClickPause}>
                {"Pause Timer"}
            </Button>
        )}
        <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
            backgroundColor: "#c2b693"},}} onClick={onClickReset}>
              {"Reset Timer"}
        </Button>
      </DialogActions>
    </Box>
    );
}
