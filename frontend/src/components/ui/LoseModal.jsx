import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGameContext } from '../game/GameContext';

function LoseModal({ show, hideModal }) {
    const game = useGameContext();
    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Game Over
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    Your castle has fallen <br />
                    :( <br />
                    <br />
                    You made it to level {game.level - 1},
                    please try again.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={hideModal}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoseModal;
