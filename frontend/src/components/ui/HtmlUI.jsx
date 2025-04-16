import { useState } from "react";
import { BUILD, DEFEND } from "../../Game";
import { BuyMenu } from "./BuyMenu";
import { LevelInfo } from "./LevelInfo";
import { SellMenu } from "./SellMenu";
import { UndoMenu } from "./UndoMenu";
import { ItemInfo } from "./ItemInfo";
import { Box, Stack } from "@mui/material";

export const HtmlUI = ({ game, selectedTower, setSelectedTower }) => {
    const [level, setLevel] = useState(game.level);
    const [gold, setGold] = useState(game.gold);
    const [phase, setPhase] = useState(game.phase);

    setInterval(() => {
        setLevel(game.level);
        setGold(game.gold);
        setPhase(game.phase);
    }, 100); // substiture for useFrame, which can't be used outside Canvas

    const handleClick = () => game.setPhase(DEFEND);

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
                    <h5>Buy/Sell Menu</h5>
                    <BuyMenu game={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />
                    <SellMenu game={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />
                    <UndoMenu game={game} />
                </Stack>
            }
            {phase === DEFEND &&
                <Stack>
                    <LevelInfo game={game} />
                    <ItemInfo item={selectedTower} />
                </Stack>
            }

            {phase === BUILD && <Stack>
                <button onClick={handleClick}>START NEXT LEVEL</button>
            </Stack>
            }
        </Stack>
    </Box >
}
