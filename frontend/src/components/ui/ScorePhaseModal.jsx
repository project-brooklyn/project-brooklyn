import { useState } from "react";
import { BUILD } from "../../Game";

export const ScorePhaseModal = ({ isOpen, game }) => {
    const [copied, setCopied] = useState(false);
    if (!isOpen) return null;
    const handleClick = () => game.setPhase(BUILD);

    const getJSON = () => {
        const json = JSON.stringify(game.toJSON());
        navigator.clipboard.writeText(btoa(json));
        console.log('Copied game data to clipboard:\n', json); // remove after implementing load game
        setCopied(true);
    }

    return <div className="position-absolute top-0 start-0 w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center z-3">
        <h3>Level Complete!</h3>
        <p>Level: {game.level}</p>
        <p>Gold: {game.gold}</p>
        <p>Castle HP: {game.castle.hp}</p>
        <button onClick={handleClick}>Next Level</button>
        <button onClick={getJSON}>{copied ? 'Game Data Copied' : 'Copy Game Data to Clipboard'}</button>
    </div>
}
