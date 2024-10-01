import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { Text } from "@react-three/drei"

import { Tile, TileType } from '/src/map/Tile.js';
import { tileKey } from '/src/map/GameMap.js';
import BuildGhostView from "../views/BuildGhostView";

import ArrowTower from "../../entities/towers/ArrowTower";
import RockTower from "../../entities/towers/RockTower";
import LaserTower from "../../entities/towers/LaserTower";

const NAME = "BuyMenu"

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
        price: 100,
    }],
    [TERRAFORM_EXCAVATE, {
        label: "Excavate",
        price: 100,
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
    }, [game.phase, game.over])

    useEffect(() => {
        // Handle selected item
        if (!selectedItem) {
            return;
        }

        if (selectedItem.name.endsWith("Tower")) {
            // Tower handling
            const t = TOWERS.get(selectedItem.name);

            mouseInput.addHoverCallback(NAME, (x, y, z) => {
                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }
                selectedItem.targetPosition.set(x, y, z);
                setNewTower(new t.create(x, y, z));
            });

            const buildTower = () => {
                if (game.gold < t.price) return;

                const {x, y, z} = selectedItem.targetPosition;
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }
                chargeCost(t.price);

                const tower = new t.create(x, y, z);
                game.addTower(tower);
            };
            mouseInput.addClickCallback(NAME, buildTower);
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
                if (game.gold < terraform.price) return;

                if (!selectedItem.targetPosition) return;
                let {x, y, z} = selectedItem.targetPosition;
                selectedItem.targetPosition = null;
                chargeCost(terraform.price);

                game.gameMapOverrides.clear();

                if (selectedItem.name == TERRAFORM_FILL) {
                    z += 1;
                    gameMap.addTile(x, y, z, new Tile(x, y, z, TileType.Stone));
                } else if (selectedItem.name == TERRAFORM_EXCAVATE) {
                    gameMap.removeTile(x, y, z);
                }
            });
        }
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

    return (
        <>
            <Text
                position={[width/2, 0,  depth + 2]}
                rotation={[-Math.PI/2, 0, 0]}
            >
                {"Buy Menu\n"}
            </Text>
            {buyTowerButtons}
            {buyTerraformButtons}
            {newTower && <BuildGhostView structure={newTower} />}
        </>
    )
}
