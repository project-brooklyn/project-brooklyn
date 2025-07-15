import { useEffect, useState } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from "@mui/material/Stack";
import Tile, { TileType } from "../../map/Tile";
import { Vector3 } from "three";
import { TOWERS, TERRAFORMS, TERRAFORM_DIG, TERRAFORM_FILL } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { tileKey } from '/src/map/GameMap.js';
import { isOccupied, isTop, isBottom } from "../../utils/game_utils";
import { ItemInfo } from "./ItemInfo";
import { useGameContext } from "../game/GameContext";

const NAME = "BuyModal";
const CANCEL_KEY = "Escape";

export default function BuyModal({ show, hideModal, setSelectedTower, setErrorMessage }) {
    const game = useGameContext();
    const { gameMap, keyboardInput, mouseInput } = game;

    const [purchasingItem, setPurchasingItem] = useState(null);

    const handleClose = () => {
        clear();
        hideModal();
    }

    const handleSelectButton = () => {
        hideModal();
    };

    const setItem = (name) => {
        clear();
        setPurchasingItem({
            name: name,
            targetPosition: null,
        });
    };

    const clear = () => {
        mouseInput.removeHoverCallback(NAME);
        mouseInput.removeClickCallback(NAME);
        keyboardInput.removeKeyDownCallback(CANCEL_KEY, NAME);
        game.gameMapOverrides.clear();
        setSelectedTower(null);
        setPurchasingItem(null);
        setErrorMessage('');
    }

    const chargeCost = (price) => {
        game.gold -= price;
        if (game.gold < price) clear();
    }

    const showGhostPurchase = (x, y, z) => {
        if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) return;
        purchasingItem.targetPosition ||= new Vector3();
        purchasingItem.targetPosition.set(x, y, z);

        if (purchasingItem.name === TERRAFORM_FILL) {
            game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone));
        } else if (purchasingItem.name === TERRAFORM_DIG) {
            if (isBottom(gameMap, x, y, z)) {
                // Not allowed to excavate lowest tile level.
                purchasingItem.targetPosition = null;
                game.gameMapOverrides.clear();
                return;
            }

            game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
        } else {  // purchasingItem is a tower
            const towerType = TOWERS.get(purchasingItem.name);
            setSelectedTower(new towerType.create(x, y, z, TowerStatus.PLANNING));
        }
    }

    const buyPurchasingItem = () => {
        const isTower = purchasingItem.name.endsWith("Tower");
        const purchaseType = isTower ? TOWERS.get(purchasingItem.name) : TERRAFORMS.get(purchasingItem.name);
        if (game.gold < purchaseType.price) {
            setErrorMessage("Not enough gold!");
            return;
        }

        if (!purchasingItem.targetPosition) return;
        const { x, y, z } = purchasingItem.targetPosition;
        if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
            setErrorMessage("Invalid location!");
            return;
        }

        if (isTower) {
            if (game.enableTowerLimits) {
                const currTowers = game.getTowerCount();
                if (currTowers >= game.towerLimit) {
                    setErrorMessage("Tower limit reached!");
                    return;
                }
            }
            const tower = new purchaseType.create(x, y, z, TowerStatus.PENDING);
            game.addTower(tower);
        } else {
            if (purchasingItem.name === TERRAFORM_FILL) {
                game.addTile(new Tile(x, y, z + 1, TileType.Stone));
            } else {
                console.assert(purchasingItem.name === TERRAFORM_DIG, `unexpected purchasing item name: ${purchasingItem.name}`);
                game.removeTile(x, y, z);
            }
        }

        chargeCost(purchaseType.price);
        purchasingItem.targetPosition = null;
        game.setPath();
        game.gameMapOverrides.clear();
    }

    useEffect(() => {
        if (!purchasingItem) return;
        mouseInput.addHoverCallback(NAME, showGhostPurchase);
        mouseInput.addClickCallback(NAME, buyPurchasingItem);
        keyboardInput.addKeyDownCallback(CANCEL_KEY, NAME, clear);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasingItem])

    useEffect(() => {
        clear();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.phase])

    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Buy Menu</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Select from the items available for purchase
                </DialogContentText>

                <Stack direction="row" spacing={2} sx={{ mt: 2, flexGrow: 1 }}>
                    <List dense={true} sx={{ width: '100%', maxWidth: 150, maxHeight: "60vh", overflow: 'auto' }}>
                        {Array.from(TOWERS.entries())
                            .filter(game.enableBlueprints ? ([key, _]) => game.blueprints.has(key) : () => true)
                            .map(([name, { price }]) => {
                                return <ListItem key={name}>
                                    <ListItemButton onClick={() => { setItem(name) }}>
                                        <ListItemText primary={name} secondary={`Price: ${price}`} />
                                    </ListItemButton>
                                </ListItem>
                            })}
                        {Array.from(TERRAFORMS.entries()).map(([name, { label, price }]) => {
                            return <ListItem key={name}>
                                <ListItemButton onClick={() => { setItem(name) }}>
                                    <ListItemText primary={label} secondary={`Price: ${price}`} />
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                    <ItemInfo item={purchasingItem} isPurchased={false} />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Close</Button>
                <Button variant="contained" onClick={handleSelectButton}>Select</Button>
            </DialogActions>
        </Dialog>
    );
}
