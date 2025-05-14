import { BUILD, DEFEND } from "../../Game";
import { LevelInfo } from "./LevelInfo";
import { ItemInfo } from "./ItemInfo";
import { Box, Stack } from "@mui/material";

export const HtmlUI = ({ game, selectedTower }) => {
    return <Box sx={{ width: "25vw", p: 2 }} >
        <Stack spacing={2}>
            {game.enableTowerLimits &&
                <Stack>
                    <span>{`Towers: ${game.getTowerCount()}`}</span>
                    <span>{`Tower Limit: ${game.towerLimit}`}</span>
                </Stack>
            }

            {game.phase === BUILD &&
                <Stack>
                    <ItemInfo item={selectedTower} />
                </Stack>
            }
            {game.phase === DEFEND &&
                <Stack>
                    <LevelInfo game={game} />
                    <ItemInfo item={selectedTower} />
                </Stack>
            }
        </Stack>
    </Box >
}
