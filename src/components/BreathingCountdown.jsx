import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { DialogContentText } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function BreathingCountdown({ onClose, changeScene }) {
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
        console.log("Timer ended, changing scene...");
        changeScene('Game');
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
        <Box sx={{ backgroundColor: "#ece3ca" }}>
            <DialogContent>
                <div style={{ textAlign: "center", margin: "auto", color: "#793205", fontWeight: 800 }}>
                    <h1>{timer}</h1>
                </div>
                <DialogContentText sx={{ color: "#793205" }}>
                    {<strong>1. </strong>}
                    {"Put one hand on your chest and the other on your stomach."}
                    <br />
                    {<strong>2. </strong>}
                    {"Breathe in through your nose. Feel the hand on your stomach rise"}
                    <br />
                    <div style={{ paddingLeft: '20px' }}>
                        {"while your chest stays still."}
                    </div>
                    {<strong>3. </strong>}
                    {"Exhale through your mouth and push out as much air as you can."}
                    <br />
                    <div style={{ paddingLeft: '20px' }}>
                        {"Feel the hand on your stomach move in while your chest stays still."}
                    </div>
                    {<strong>4. </strong>}
                    {"Continue to breathe in through your nose and out through your mouth."}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {isPaused ? (
                    <Button sx={{
                        width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
                            backgroundColor: "#c2b693"
                        },
                    }} onClick={onClickStart}>
                        {"Start Timer"}
                    </Button>
                ) : (
                    <Button sx={{
                        width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
                            backgroundColor: "#c2b693"
                        },
                    }} onClick={onClickPause}>
                        {"Pause Timer"}
                    </Button>
                )}
                <Button sx={{
                    width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
                        backgroundColor: "#c2b693"
                    },
                }} onClick={onClickReset}>
                    {"Reset Timer"}
                </Button>
            </DialogActions>
        </Box>
    );
}
