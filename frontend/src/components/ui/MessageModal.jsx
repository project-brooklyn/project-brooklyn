import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGameContext } from '../game/GameContext';
import { Box } from '@mui/material';

const MessageModal = ({ show, hideModal }) => {
    const game = useGameContext();
    const { message } = game;
    if (!message) {
        // hideModal();
        return null;
    }

    return (
        <Dialog
            open={show}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {message.title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    {message.text}
                </DialogContentText>

                <Box sx={{ display: 'flex', maxW: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    {message.images?.map((src, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={src}
                            alt={`Message picture ${index + 1}`}
                            sx={{
                                m: 2,
                                maxWidth: "50%",
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        />
                    ))}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={hideModal}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MessageModal;
