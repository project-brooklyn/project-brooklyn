import { useState } from "react";
import { BUILD, DEFEND } from "../../Game";
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

    return <div className="w-25 flex-grow-1 border border-2 border-danger m-2 d-flex flex-column overflow-scroll">
        <div className="d-flex justify-content-between">
            <span>{`Level: ${level}`}</span>
            <span>{`Gold: ${gold}`}</span>
            <span>{`Phase: ${phase.toUpperCase()}`}</span>
        </div>

        <div className="my-4">
            {phase === BUILD && <BuySellMenu game={game} selectedTower={selectedTower} setSelectedTower={setSelectedTower} />}
            {phase === DEFEND && <LevelInfo game={game} />}
        </div>

        {phase === BUILD && <div className="d-flex justify-content-center mt-auto mb-4">
            <button onClick={handleClick}>START NEXT LEVEL</button>
        </div>}
    </div>
}
