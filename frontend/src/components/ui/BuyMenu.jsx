import { useState, useEffect } from "react";
import { Text } from "@react-three/drei"
import BuildGhostView from "../views/BuildGhostView";
import { Vector3 } from "three";

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
        }
    }, [selectedItem])

    const buyTowerButtons = Array.from(TOWERS.keys(), (towerKey, i) => {
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

        return (
            <Text
                key={i}
                position={[width/2, 0,  depth + 3 + i]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${selectedItem?.name == towerKey ? '>' : ' '} ${towerKey}: ${TOWERS.get(towerKey).price}\n`}
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
            {newTower && <BuildGhostView structure={newTower} />}
        </>
    )
}
