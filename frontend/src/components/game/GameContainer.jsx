import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stack } from '@mui/material';
import { useGameContext } from './GameContext';
import GameDisplay from './GameDisplay';
import { SideHUD } from '../ui/SideHUD';
import assets from '../managers/assets';

const NAME = "GameContainer";

const GameContainer = ({ selectedTower, setSelectedTower }) => {
    const game = useGameContext();
    const { mouseInput } = game;

    useEffect(() => {
        if (!game.devGui) return;
        const gameFolder = game.devGui.addFolder("Game");
        gameFolder.add(game, "level", 1, 12, 1);
        gameFolder.add(game.castle, "hp", 1, game.castle.maxHp, 1).name("base hp");
        gameFolder.close()
        return () => {
            gameFolder.destroy();
        }
    }, [game])

    useEffect(() => {
        mouseInput.addClickCallback(NAME, (x, y, _z) => {
            const tower = game.getTower(x, y);
            if (!tower) return;

            setSelectedTower(current => {
                // if the tower is currently selected, deselect it
                // otherwise, select the tower
                return tower === current ? null : tower;
            });
        })

        return () => mouseInput.removeClickCallback(NAME);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<Stack sx={{ height: "95vh" }} >
        <Stack direction="row" spacing={2} height="100%">
            <Canvas shadows >
                <GameDisplay assets={assets} selectedTower={selectedTower} />
            </Canvas>
            <SideHUD selectedTower={selectedTower} />
        </Stack>
    </Stack>)
}

export default GameContainer;
