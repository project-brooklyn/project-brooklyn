import * as THREE from 'three';
import { useState, useEffect } from "react";
import { Cone, Text } from '@react-three/drei';

import { convertToRenderCoordinates } from "../../utils/render_utils";
import { TOWERS } from "./BuyMenu";
import { BUILD } from "../../Game";
import { Status as TowerStatus } from "../../entities/towers/Tower";

const NAME = "SellMenu";

const RADIUS = 0.2;
const HEIGHT = 0.4;
const RADIAL_SEGMENTS = 6;

export default function SellMenu({ game }) {
    const { gameMap, mouseInput } = game;
    const { width, depth } = gameMap;
    const [selectedTower, setSelectedTower] = useState(null);

    const reset = () => {
        setSelectedTower(null);
    }

    useEffect(() => {
        reset();

        if (!game.over && game.phase == BUILD) {
            mouseInput.addClickCallback(NAME, (x, y, _z) => {
                if (!gameMap.getTower(x, y)) {
                    reset();
                    return;
                }

                const tower = game.towers[x][y];
                if (tower.status != TowerStatus.BUILT) {
                    reset();
                    return;
                }

                setSelectedTower(tower);
            })
        }
        else {
            mouseInput.removeClickCallback(NAME);
        }
    }, [game.phase, game.over]) // eslint-disable-line react-hooks/exhaustive-deps

    if (!selectedTower) {
        return null;
    }

    const position = convertToRenderCoordinates(
        new THREE.Vector3().fromArray(selectedTower.position),
        { x: 0, y: 0, z: -1.25 }
    );

    const sellTower = () => {
        game.towers[selectedTower.x][selectedTower.y] = undefined;
        gameMap.removeTower(selectedTower.x, selectedTower.y);

        const t = TOWERS.get(selectedTower.name);
        game.gold += 0.5 * t.price;
        setSelectedTower(null);
    }

    return <>
        <Cone
            args={[RADIUS, HEIGHT, RADIAL_SEGMENTS]}
            position={position}
            rotation={[0, 0, Math.PI]}
        >
            <meshBasicMaterial color="red" />
        </Cone>
        <Text
            position={[width + 1, 0, depth / 2]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            onClick={sellTower}
        >
            Sell Tower
        </Text>
    </>
}
