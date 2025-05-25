import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGameContext } from "../GameContext";

export const LevelInfo = () => {
    const game = useGameContext();
    const { enemyInfo } = game;
    const { enemy, count, delay, remaining } = enemyInfo;

    // another hack to rerender the component
    const [ticks, setTicks] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setTicks(ticks + 1), 100);
        return () => clearInterval(interval);
    });

    if (!enemy) {
        return null;
    }

    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-level-info"
                    id="panel-level-info-header"
                >
                    <Typography variant="h5">Level Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p>{`${count} total enemies, spawning every ${delay} ticks.`}</p>
                    <p>{`${game.enemies.filter(e => !!e.hp).length} enemies still alive.`}</p>
                    <p>{`${remaining} enemies yet to spawn.`}</p>
                    <p>{`Enemy: ${enemy.NAME.charAt(0).toUpperCase() + enemy.NAME.slice(1)}, Health: ${enemy.MAX_HP}, Speed: ${enemy.SPEED}`}</p>
                    <p>{enemy.DESCRIPTION}</p>
                    <p>{`Castle HP: ${game.castle.hp}/${game.castle.maxHp}`}</p>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
