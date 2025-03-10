import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import {useState} from 'react';
import Journal from './Journal';

// eslint-disable-next-line react/prop-types
export default function JournalDialog({ open, onClose }) {
  const [isReady, setIsReady] = useState(false);

    const handleClose = () => {
        onClose();
    }

    const handleTimer = () => {
      setIsReady(true);
    }

    const handleJournalClose = () => {
        setIsReady(false);
        onClose();
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
                  top: '45%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)'
              }
          }}
      >
      { !isReady ? (
        <Box sx={{backgroundColor: "#ece3ca"}}>
          <DialogTitle sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800}}>
              {"Time to Journal"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText sx={{color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 300}}>
              {"Journaling provides a way to process emotions, reduces stress, and improves self-awareness."}
              </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
              backgroundColor: "#c2b693"},}} onClick={handleClose}>
                {"Not Yet"}
            </Button>
            <Button sx={{width: "150px", color: "#793205", fontFamily: "Arial, sans-serif", fontWeight: 800, backgroundColor: '#dbca9b', "&:hover": {
               backgroundColor: "#c2b693"},}} onClick={handleTimer}>
                {"I'm Ready"}
            </Button>
          </DialogActions>
        </Box>
      ) : (
        <Journal onClose={handleJournalClose} />
      )}
      </Dialog>
    );
  }