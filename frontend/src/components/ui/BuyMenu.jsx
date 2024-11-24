import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { Text } from "@react-three/drei"

import { Tile, TileType } from '/src/map/Tile.js';
import { tileKey } from '/src/map/GameMap.js';
import BuildGhostView from "../views/BuildGhostView";
import { BUILD } from "../../Game";

import ArrowTower from "../../entities/towers/ArrowTower";
import RockTower from "../../entities/towers/RockTower";
import LaserTower from "../../entities/towers/LaserTower";
import { Status as TowerStatus } from "../../entities/towers/Tower";

const NAME = "BuyMenu";

const TOWERS = new Map([
    ["arrowTower", {
        create: ArrowTower,
        price: 50,
    }],
    ["rockTower", {
        create: RockTower,
        price: 100,
    }],
    ["laserTower", {
        create: LaserTower,
        price: 200,
    }],
]);

const TERRAFORM_FILL = "terraformFill";
const TERRAFORM_EXCAVATE = "terraformExcavate";
const TERRAFORMS = new Map([
    [TERRAFORM_FILL, {
        label: "Fill",
        price: 10,
    }],
    [TERRAFORM_EXCAVATE, {
        label: "Excavate",
        price: 10,
    }],
]);

function isTop(gameMap, x, y, z) {
    return gameMap.getElevation(x, y) === z;
}

function isOccupied(game, x, y, z) {
    const tower = game.towers[x][y];
    return tower && (tower.z === z);
}

export default function BuyMenu({game}) {
    const {gameMap, mouseInput} = game;
    const {width, depth} = gameMap;

    const [selectedItem, setSelectedItem] = useState(null);
    const [newTower, setNewTower] = useState(null);
    const [undoStack, setUndoStack] = useState([]);

    const deselectAll = () => {
        setSelectedItem(null);
        setNewTower(null);
        mouseInput.removeHoverCallback(NAME);
        mouseInput.removeClickCallback(NAME);
        game.gameMapOverrides.clear();
    };

    const chargeCost = (price) => {
        game.gold -= price;
        if (game.gold < price) deselectAll();
    };

    useEffect(() => {
        // Handle game state changes
        deselectAll();
        setUndoStack([]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.phase, game.over])

    useEffect(() => {
        // Handle selected item
        if (!selectedItem) {
            return;
        }

        if (selectedItem.name.endsWith("Tower")) {
            // Tower handling
            const towerType = TOWERS.get(selectedItem.name);

            mouseInput.addHoverCallback(NAME, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }
                selectedItem.targetPosition.set(x, y, z);
                setNewTower(new towerType.create(x, y, z, TowerStatus.PENDING));
            });

            mouseInput.addClickCallback(NAME, () => {
                if (game.gold < towerType.price) return;

                const {x, y, z} = selectedItem.targetPosition;
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }
                chargeCost(towerType.price);

                const tower = new towerType.create(x, y, z, TowerStatus.PENDING);
                game.addTower(tower);
                gameMap.addTower(x, y);
                setUndoStack(prevStack => [...prevStack, {x, y, z, label: 'BuildTower', price: towerType.price}]);
                game.setPath();
            });
        } else if (selectedItem.name.startsWith("terraform")) {
            const terraform = TERRAFORMS.get(selectedItem.name);

            mouseInput.addHoverCallback(NAME, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }

                if (selectedItem.name == TERRAFORM_FILL) {
                    selectedItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone));
                } else if (selectedItem.name == TERRAFORM_EXCAVATE) {
                    selectedItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
                }
            });

            mouseInput.addClickCallback(NAME, () => {
                if (!selectedItem.targetPosition) return;
                let {x, y, z} = selectedItem.targetPosition;
                if (z < 1) {
                    // Not allowed to excavate lowest tile level.
                    return;
                }

                if (game.gold < terraform.price) return;

                selectedItem.targetPosition = null;
                chargeCost(terraform.price);

                game.gameMapOverrides.clear();

                let tileType;
                if (selectedItem.name == TERRAFORM_FILL) {
                    z += 1;
                    gameMap.addTile(x, y, z, new Tile(x, y, z, TileType.Stone));
                } else if (selectedItem.name == TERRAFORM_EXCAVATE) {
                    tileType = gameMap.getTile(x, y, z).type;
                    gameMap.removeTile(x, y, z);
                }
                setUndoStack(prevStack => [...prevStack, {x, y, z, ...terraform, tileType}]);
                game.setPath();
            });
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem])

    let menuIndex = depth + 3;
    const buyTowerButtons = Array.from(TOWERS.keys(), (towerKey) => {
        const handleClick = () => {
            if (selectedItem?.name == towerKey) {
                deselectAll();
            } else {
                deselectAll();
                setSelectedItem({
                    name: towerKey,
                    targetPosition: null,
                });
            }
        };

        const index = menuIndex++;
        return (
            <Text
                key={index}
                position={[width/2, 0,  index]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${selectedItem?.name == towerKey ? '>' : ' '} ${towerKey}: ${TOWERS.get(towerKey).price}\n`}
            </Text>
        )
    });

    const buyTerraformButtons = Array.from(TERRAFORMS.keys(), (terraformKey) => {
        const handleClick = () => {
            if (selectedItem?.name == terraformKey) {
                deselectAll();
            } else {
                deselectAll();
                setSelectedItem({
                    name: terraformKey,
                    targetPosition: null,
                });
            }
        };

        const index = menuIndex++;
        const label = TERRAFORMS.get(terraformKey).label;
        const price = TERRAFORMS.get(terraformKey).price;
        return (
            <Text
                key={index}
                position={[width/2, 0,  index]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${selectedItem?.name == terraformKey ? '>' : ' '} ${label}: ${price}`}
            </Text>
        )
    });

    const undoBuild = () => {
        if (!undoStack.length) return;
        deselectAll();
        const {x, y, z, label, price, tileType} = undoStack.at(-1);
        
        switch (label) {
            case 'BuildTower':
                game.removeTower(x, y);
                gameMap.removeTower(x, y);
                break;
            case 'Fill':
                gameMap.removeTile(x, y, z);
                break;
            case 'Excavate':
                gameMap.addTile(x, y, z, new Tile(x, y, z, tileType));
                break;
            default:
                console.error("Unknown undo label", label);
        }

        game.gold += price;
        setUndoStack((prevStack) => prevStack.slice(0, -1));
        game.setPath();
    }

    const undoButton = (
        Boolean(undoStack.length) && <Text
            onClick={undoBuild}
            position={[width/2, 0, menuIndex++]}
            rotation={[-Math.PI/2, 0, 0]}
        >
            Undo Last Buy
        </Text>
    )

    const showBuyMenu = (game.phase === BUILD) && !game.over;
    return showBuyMenu && <>
            <Text
                position={[width/2, 0, depth + 2]}
                rotation={[-Math.PI/2, 0, 0]}
            >
                {"Buy Menu\n"}
            </Text>
            {buyTowerButtons}
            {buyTerraformButtons}
            {undoButton}
            {newTower && <BuildGhostView structure={newTower} />}
        </>
}
