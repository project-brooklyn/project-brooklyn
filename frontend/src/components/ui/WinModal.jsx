import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGameContext } from '../game/GameContext';

function WinModal({ show, hideModal }) {
    const game = useGameContext();
    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Congratulations
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    You won! <br />
                    <br />
                    Damage Dealt: {game.damage_dealt}<br />
                    Damage Taken: {game.damage_taken}<br />
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={hideModal}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default WinModal;
