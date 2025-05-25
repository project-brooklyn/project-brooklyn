import { BUILD, DEFEND } from "../../Game";
import { LevelInfo } from "./LevelInfo";
import { ItemInfo } from "./ItemInfo";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGameContext } from "../GameContext";

const ItemInfoAccordion = (tower) => {
    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-selected-tower"
                id="panel-selected-tower-header"
            >
                <Typography variant="h5">Selected Tower</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ItemInfo item={tower} />
            </AccordionDetails>
        </Accordion>
    )
}

export const SideHUD = ({ selectedTower }) => {
    const game = useGameContext();
    const showItemInfo = [BUILD, DEFEND].includes(game.phase);
    const showLevelInfo = [DEFEND].includes(game.phase);

    return (
        <Card sx={{ position: "absolute", top: "30%", right: "10px", maxWidth: 350, backgroundColor: "rgba(255,255,255,0.25)" }}>
            <CardContent>
                <Stack spacing={2}>
                    {game.enableTowerLimits &&
                        <Stack>
                            <span>{`Towers: ${game.getTowerCount()}`}</span>
                            <span>{`Tower Limit: ${game.towerLimit}`}</span>
                        </Stack>
                    }

                    {showLevelInfo && <LevelInfo />}
                    {showItemInfo && ItemInfoAccordion(selectedTower)}
                </Stack>
            </CardContent>
        </Card>
    )
}
