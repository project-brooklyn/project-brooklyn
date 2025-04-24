import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { TERRAFORMS, TOWERS } from "../../entities/buildables";
import { ItemInfo } from "./ItemInfo";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BuyModal({ open, setOpen }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClose = () => setOpen(false);

    const handleSelect = () => {
        console.log("Selected item: ", selectedItem);
        handleClose();
    };

    const selectItem = (name) => {
        setSelectedItem({
            name: name,
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="buy-modal-title"
            aria-describedby="buy-modal-description"
        >
            <Box sx={style}>
                <Typography id="buy-modal-title" variant="h6" component="h2">
                    Buy Menu
                </Typography>
                <Typography id="buy-modal-body" sx={{ mt: 2 }}>
                    Select from the items available for purchase
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 2, flexGrow: 1 }}>
                    <List dense={true}>
                        {Array.from(TOWERS.entries()).map(([name, { price }]) => {
                            return <ListItem key={name}>
                                <ListItemButton onClick={() => { selectItem(name) }}>
                                    <ListItemText primary={name} secondary={`Price: ${price}`} />
                                </ListItemButton>
                            </ListItem>
                        })}
                        {Array.from(TERRAFORMS.entries()).map(([name, { label, price }]) => {
                            return <ListItem key={name}>
                                <ListItemButton onClick={() => { selectItem(name) }}>
                                    <ListItemText primary={label} secondary={`Price: ${price}`} />
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                    <ItemInfo item={selectedItem} isPurchased={false} />
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mt: 2, flexGrow: 1, justifyContent: "right" }}>
                    <Button variant="outlined" onClick={handleClose}>Close</Button>
                    <Button variant="contained" onClick={handleSelect}>Select</Button>
                </Stack>
            </Box>
        </Modal >
    );
}
