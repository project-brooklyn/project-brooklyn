import { useState, useEffect } from "react";
import { Text } from "@react-three/drei"
import BuildGhostView from "../views/BuildGhostView";

const NAME = "BuyMenu"

export default function BuyMenu({game, towerConstructors}) {
    const {gameMap, mouseInput} = game;
    const {width, depth} = gameMap;

    const [selected, setSelected] = useState(null);
    const [newTower, setNewTower] = useState(null);

    const deselectAll = () => {
        setNewTower(null);
        setSelected(null);
        mouseInput.removeHoverCallback(NAME);
        mouseInput.removeClickCallback(NAME);
    };

    useEffect(() => {
        // Handle game state changes
        deselectAll();
    }, [game.phase])

    const exampleTowers = towerConstructors.map(constructor => new constructor());

    const buyButtons = exampleTowers.map((tower, i) => {
        const handleClick = () => {
            if (newTower?.name === tower.name) {
                setNewTower(null);
            } else {
                deselectAll();
                const example = exampleTowers.find(example => tower.name === example.name);
                if (example) {
                    const t = new example.constructor();
                    setNewTower(t);

                    mouseInput.addHoverCallback(NAME, (x, y, z) => {
                        t.setPosition(x, y, z);
                    });

                    const buildTower = (_x, _y, _z) => {
                        // Use t's position instead of callback's coordinates. Otherwise,
                        // under certain circumstances, the built tower may jump to a
                        // different tile than the preview depending on camera angle and
                        // proximity to the tile boundary.

                        if (game.over) return;
                        if (t.z !== gameMap.getElevation(t.x, t.y)) return;
                        if (game.towers[t.x][t.y]) return;
                        if (game.gold < t.price) return;

                        const copy = new t.constructor(t.x, t.y, t.z);
                        game.addTower(copy);
                        game.gold -= t.price;
                        if (game.gold < t.price) setNewTower(null);
                    };
                    mouseInput.addClickCallback(NAME, buildTower);
                }
            }
        };

        return (
            <Text
                key={i}
                position={[width/2, 0,  depth + 3 + i]}
                rotation={[-Math.PI/2, 0, 0]}
                onClick={handleClick}
            >
                {`${newTower && newTower.name === tower.name ? '>' : ' '} ${tower.name}: ${tower.price}\n`}
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
            {buyButtons}
            {newTower && <BuildGhostView structure={newTower} />}
        </>
    )
};
