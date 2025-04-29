import { useState } from "react";
import { BUILD, DEFEND } from "../../Game";
import { LevelInfo } from "./LevelInfo";
import { ItemInfo } from "./ItemInfo";
import { Box, Stack } from "@mui/material";

export const HtmlUI = ({ game, selectedTower }) => {
    const [level, setLevel] = useState(game.level);
    const [gold, setGold] = useState(game.gold);
    const [phase, setPhase] = useState(game.phase);

    setInterval(() => {
        setLevel(game.level);
        setGold(game.gold);
        setPhase(game.phase);
    }, 100); // substitute for useFrame, which can't be used outside Canvas

    return <Box sx={{ width: "25vw", p: 2 }} >
        <Stack spacing={2}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <span>{`Level: ${level}`}</span>
                <span>{`Gold: ${gold}`}</span>
                <span>{`Phase: ${phase.toUpperCase()}`}</span>
            </Stack>
            {
                game.enableTowerLimits && <Stack>
                    <span>{`Towers: ${game.getTowerCount()}`}</span>
                    <span>{`Tower Limit: ${game.towerLimit}`}</span>
                </Stack>
            }

            {phase === BUILD &&
                <Stack>
                    <ItemInfo item={selectedTower} />
                </Stack>
            }
            {phase === DEFEND &&
                <Stack>
                    <LevelInfo game={game} />
                    <ItemInfo item={selectedTower} />
                </Stack>
            }
        </Stack>
    </Box >
}
