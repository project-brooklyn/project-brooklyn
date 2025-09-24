import { useEffect, useState } from "react";
import { Howler } from 'howler';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeMute from '@mui/icons-material/VolumeMute';
import VolumeOff from '@mui/icons-material/VolumeOff';

const MUSIC_ENABLED_KEY = 'musicEnabled';
const VOLUME_KEY = 'volume';

function SettingsModal({ show, hideModal }) {
    const [musicEnabled, setMusicEnabled] = useState(['true', null].includes(localStorage.getItem(MUSIC_ENABLED_KEY)));
    const [volume, setVolume] = useState(localStorage.getItem(VOLUME_KEY) ? parseInt(localStorage.getItem(VOLUME_KEY), 10) : 50);

    useEffect(() => {
        Howler.mute(!musicEnabled);
    }, [musicEnabled]);
    useEffect(() => {
        Howler.volume(volume / 100);
    }, [volume]);

    const handleMusicToggle = () => {
        setMusicEnabled(!musicEnabled);
    };
    const handleVolumeChange = (_event, newValue) => {
        setVolume(newValue);
    };

    const saveAndCloseModal = () => {
        localStorage.setItem(MUSIC_ENABLED_KEY, musicEnabled);
        localStorage.setItem(VOLUME_KEY, volume);
        hideModal();
    };

    const incrementVolume = () => {
        setVolume((prevVolume) => {
            return Math.min(prevVolume + 10, 100);
        });
    };

    const decrementVolume = () => {
        setVolume((prevVolume) => {
            return Math.max(prevVolume - 10, 0);
        });
    };

    return (
        <Dialog open={show} maxWidth="sm" fullWidth>
            <DialogTitle>
                Settings
            </DialogTitle>

            <DialogContent>
                <DialogContentText component="div" sx={{ textAlign: 'center' }}>
                    <Stack spacing={3} direction="column" sx={{ alignItems: 'center', mb: 2 }}>
                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', justifyContent: 'center', mb: 1, width: '300px' }}>
                            <Typography variant="h6" component="p" >
                                Volume
                            </Typography>
                            <IconButton onClick={handleMusicToggle} style={{ cursor: 'pointer' }}>
                                {musicEnabled ? <VolumeDown /> : <VolumeOff />}
                            </IconButton>
                        </Stack>

                        <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1, width: '300px' }}>
                            <IconButton onClick={decrementVolume} disabled={volume <= 0}>
                                <VolumeMute />
                            </IconButton>
                            <Slider aria-label="Volume" value={musicEnabled ? volume : 0} valueLabelDisplay="auto" onChange={handleVolumeChange} />
                            <IconButton onClick={incrementVolume} disabled={volume >= 100}>
                                <VolumeUp />
                            </IconButton>
                        </Stack>
                    </Stack>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={saveAndCloseModal}>Close</Button>
            </DialogActions>
        </Dialog >
    );
}

export default SettingsModal;
