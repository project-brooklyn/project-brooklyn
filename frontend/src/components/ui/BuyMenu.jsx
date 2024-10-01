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

const TERRAFORM_FILL = "Fill";
const TERRAFORM_EXCAVATE = "Excavate";
const TERRAFORMS = new Map([
    [TERRAFORM_FILL, {
        price: 100,
    }],
    [TERRAFORM_EXCAVATE, {
        price: 100,
    }],
]);

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

    useEffect(() => {
        // Handle game state changes
        deselectAll();
    }, [game.phase])

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
                if (game.over) return;

                const {x, y, z} = selectedItem.targetPosition;
                if (z !== gameMap.getElevation(x, y)) return;
                if (game.towers[x][y]) return;

                if (game.gold < t.price) return;

                const tower = new t.create(x, y, z);
                game.addTower(tower);
                game.gold -= t.price;
                if (game.gold < t.price) deselectAll(null);
            };
            mouseInput.addClickCallback(NAME, buildTower);
        } else if (selectedItem.name == TERRAFORM_FILL) {
            mouseInput.addHoverCallback(NAME, (x, y, z) => {
                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }
                selectedItem.targetPosition.set(x, y, z + 1);
                game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone))
            });

            mouseInput.addClickCallback(NAME, (x, y, z) => {
                game.gameMapOverrides.clear();
            });
        } else if (selectedItem.name == TERRAFORM_EXCAVATE) {
            mouseInput.addHoverCallback(NAME, (x, y, z) => {
                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }
                selectedItem.targetPosition.set(x, y, z);
                game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
            });

            mouseInput.addClickCallback(NAME, (x, y, z) => {
                game.gameMapOverrides.clear();
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
                    lastPosition: null,
                });
            }
        };

        const index = menuIndex++;
        const price = TERRAFORMS.get(terraformKey).price;
        return (
            <Text
                key={index}
                position={[width/2, 0,  index]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                    {`${selectedItem?.name == terraformKey ? '>' : ' '} ${terraformKey}: ${price}`}
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
