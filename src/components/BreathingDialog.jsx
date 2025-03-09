import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import BreathingCountdown from './BreathingCountdown';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
export default function BreathingDialog({ open, onClose, changeScene }) {
  const [isReady, setIsReady] = useState(false);

  const handleClose = () => {
    onClose();
  }

  const handleTimer = () => {
    changeScene('GameOver');
    setIsReady(true);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={(e) => e.stopPropagation()}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: { 
            position: 'absolute', 
            top: '30%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 9999, // Ensure the dialog stays on top
          }
        }}
      >
        {!isReady ? (
          <Box sx={{backgroundColor: "#ece3ca"}}>
            <DialogTitle sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800}}>
              {"Practice Deep Breathing"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 300}}>
                {"Deep breathing is recommended for 5 minutes a day. It involves focusing on full, cleansing breaths. Find a quiet place to sit or stretch out and let me know when you're ready to start."}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                sx={{ width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": { backgroundColor: "#c2b693" }}}
                onClick={handleClose}
              >
                {"Not Yet"}
              </Button>
              <Button 
                sx={{ width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": { backgroundColor: "#c2b693" }}}
                onClick={handleTimer}
              >
                {"I'm Ready"}
              </Button>
            </DialogActions>
          </Box>
        ) : (
          <BreathingCountdown onClose={onClose} changeScene={changeScene} />
        )}
      </Dialog>
    </div>
  );
}
