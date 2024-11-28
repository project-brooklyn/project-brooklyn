import { useState } from "react";
import { BUILD } from "../../Game";
import { BuySellMenu } from "./BuySellMenu";
import { LevelInfo } from "./LevelInfo";

export const HtmlUI = ({game, selectedTower, setSelectedTower}) => {
    const [level, setLevel] = useState(game.level);
    const [gold, setGold] = useState(game.gold);
    const [phase, setPhase] = useState(game.phase);

    setInterval(() => {
        setLevel(game.level);
        setGold(game.gold);
        setPhase(game.phase);
    }, 100); // substiture for useFrame, which can't be used outside Canvas

    const handleClick = () => {
        setSelectedTower(null);
        game.startDefendPhase();
    }

    return <div style={{width: "20vw", border: "2px solid red", display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>{`Level: ${level}`}</span>
            <span>{`Gold: ${gold}`}</span>
            <span>{`Phase: ${phase.toUpperCase()}`}</span>
        </div>

        {phase === BUILD 
            ? <BuySellMenu game={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />
            : <LevelInfo game={game}/>        
        }

        {phase === BUILD && <div style={{display: "flex", justifyContent: "center", marginTop: "auto", marginBottom: "40px"}}>
            <button onClick={handleClick}>START NEXT LEVEL</button>
        </div>}
    </div>
}
