import { useState } from "react";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import { DialogContentText } from "@mui/material";
import TextField from '@mui/material/TextField';
import { EventBus } from '../game/EventBus';

// eslint-disable-next-line react/prop-types
export default function Journal({ onClose }) {
    const [journalText, setJournalText] = useState('');

    const handleChange = (e) => {
        setJournalText(e.target.value);
    };

    const handleSave = () => {
        localStorage.setItem('journalEntry', journalText);
        EventBus.emit('journal-closed');
        onClose();
    };

    const handleClose = () => {
        EventBus.emit('journal-closed');
        onClose();
    };

    return (
        <Box sx={{backgroundColor: "#ece3ca"}}>
              <DialogContent>
                <div style={{ textAlign: "center", margin: "auto", color: "#793205", fontWeight: 800 }}>
                    <h1>My Journal</h1>
                </div>
                <DialogContentText sx={{color: "#793205", mb: 3, fontFamily: "Arial, sans-serif"}}>
                    Journaling helps reduce stress, improve mood, and enhance self-awareness. Take a moment to reflect on your thoughts and feelings.
                </DialogContentText>
                <DialogContentText sx={{color: "#793205", mb: 2, fontFamily: "Arial, sans-serif"}}>
                    Here are some prompts to get you started:
                </DialogContentText>
                <DialogContentText sx={{color: "#793205", mb: 3, fontFamily: "Arial, sans-serif", fontStyle: "italic"}}>
                    • What made you smile today?<br/>
                    • What are three things you're grateful for right now?
                </DialogContentText>
                <TextField
                        fullWidth
                        multiline
                        rows={8}
                        variant="outlined"
                        value={journalText}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                          event.stopPropagation();
                        }}
                        placeholder="Write your thoughts here..."
                        sx={{
                            color: "#793205",
                            backgroundColor: '#dbca9b',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#793205',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#793205',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#793205',
                                },
                                color: '#793205',
                                fontFamily: "Arial, sans-serif",
                            },
                            '& .MuiOutlinedInput-input': {
                                '&::placeholder': {
                                    color: '#793205',
                                    opacity: 0.7,
                                },
                            },
                        }}
                    />
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button 
                    sx={{
                        width: "150px", 
                        color: "#793205", 
                        fontFamily: "Arial, sans-serif", 
                        fontWeight: 800, 
                        backgroundColor: '#dbca9b', 
                        "&:hover": {
                            backgroundColor: "#c2b693"
                        }
                    }} 
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button 
                    sx={{
                        width: "150px", 
                        color: "#793205", 
                        fontFamily: "Arial, sans-serif", 
                        fontWeight: 800, 
                        backgroundColor: '#dbca9b', 
                        "&:hover": {
                            backgroundColor: "#c2b693"
                        }
                    }} 
                    onClick={handleSave}
                >
                    Save Entry
                </Button>
            </DialogActions>
        </Box>
    );
}
