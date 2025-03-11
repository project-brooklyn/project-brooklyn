import { useEffect, useState } from "react";
import { BUILD } from "../../Game";
import { TOWERS } from "../../entities/buildables";

export const ScorePhaseModal = ({ game }) => {
    const [copied, setCopied] = useState(false);
    const [rewardsChosen, setRewardsChosen] = useState([]);
    const handleClick = () => game.setPhase(BUILD);

    const CASTLE_HEAL = 200;
    const REWARD_LIMIT = 2; // number of rewards to choose
    const BLUEPRINT_REWARDS = 2; // number of blueprints in rewards
    const towerKeys = Array.from(TOWERS.keys());
    const BASE_REWARDS = [
        {
            label: `+${game.goldReward} Gold`,
            fn: () => game.gold += game.goldReward
        },
        {
            label: `+${CASTLE_HEAL} Castle HP`,
            fn: () => {
                game.castle.hp += CASTLE_HEAL;
                game.castle.hp = Math.min(game.castle.maxHp, game.castle.hp);
            }
        },
        {
            label: "+2 Tower Limit",
            fn: () => game.towerLimit += 2
        },
    ];
    const [rewards, setRewards] = useState(BASE_REWARDS);

    useEffect(() => {
        const newRewards = [...BASE_REWARDS];
        for (let i = 0; i < BLUEPRINT_REWARDS; i++) {
            if (game.blueprints.size < towerKeys.length) {
                let blueprintIndex = 0;
                while (game.blueprints.has(towerKeys[blueprintIndex] || newRewards.at(-1).label === towerKeys[blueprintIndex])) {
                    blueprintIndex = Math.floor(Math.random() * towerKeys.length);
                }
                newRewards.push({
                    label: `Blueprint: ${towerKeys[blueprintIndex]}`,
                    fn: () => game.blueprints.add(towerKeys[blueprintIndex])
                });
            }
        }
        setRewards(newRewards);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.level])

    const getJSON = () => {
        const json = JSON.stringify(game.toJSON());
        navigator.clipboard.writeText(btoa(json));
        console.log('Copied game data to clipboard:\n', json); // TODO: remove after implementing load game
        setCopied(true);
    }

    return <div className="position-absolute top-0 start-0 w-100 h-100 bg-white d-flex flex-column justify-content-center align-items-center z-3">
        <h3>Level Complete!</h3>
        <p>Level: {game.level}</p>
        <p>Gold: {game.gold}</p>
        <p>Castle HP: {game.castle.hp}</p>
        {
            rewardsChosen.length >= REWARD_LIMIT
                ? <>
                    <button onClick={handleClick}>Next Level</button>
                    <button onClick={getJSON}>{copied ? 'Game Data Copied' : 'Copy Game Data to Clipboard'}</button>
                </>
                : <>
                    <h5>Choose Reward</h5>
                    {
                        rewards.map((reward, i) => rewardsChosen.includes(i)
                            ? <button key={i} disabled>{reward.label}</button>
                            : <button key={i} onClick={() => {
                                reward.fn();
                                setRewardsChosen(rewardsChosen.concat(i));
                            }}>{reward.label}</button>
                        )
                    }
                </>
        }
    </div>
}
