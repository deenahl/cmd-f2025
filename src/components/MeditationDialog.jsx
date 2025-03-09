import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Countdown from './Countdown';
import {useState} from 'react';

// eslint-disable-next-line react/prop-types
export default function AlertDialog({ open, onClose }) {
  const [isReady, setIsReady] = useState(false);

    const handleClose = () => {
        onClose();
    }

    const handleTimer = () => {
      setIsReady(true);
    }

    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
          maxWidth="sm"
          PaperProps={{
              style: { 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)'
              }
          }}
      >
      { !isReady ? (
        <Box sx={{backgroundColor: "#ece3ca"}}>
          <DialogTitle sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800}}>
              {"Practice Deep Breathing"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 300}}>
              {"Deep breathing is recommended for 5 minutes a day. It involves focusing on full, cleansing breaths. Find a quiet place to sit or stretch out and let me know when you're ready to start"}
              </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
              backgroundColor: "#c2b693"},}} onClick={handleClose}>
                {"Another Time"}
            </Button>
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
               backgroundColor: "#c2b693"},}} onClick={handleTimer}>
                {"I'm Ready"}
            </Button>
          </DialogActions>
        </Box>
      ) : (
        <Countdown onClose={onClose}></Countdown>
      )}
      </Dialog>
    );
  }