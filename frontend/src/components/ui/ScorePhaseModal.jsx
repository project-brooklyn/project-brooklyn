import { useEffect, useState } from "react";
import { BUILD } from "../../Game";
import { TOWERS } from "../../entities/buildables";
import Modal from 'react-bootstrap/Modal';

export const ScorePhaseModal = ({ game, show }) => {
    const [copied, setCopied] = useState(false);
    const [rewardsChosen, setRewardsChosen] = useState([]);
    const handleClick = () => game.setPhase(BUILD);

    const CASTLE_HEAL = 200;
    const REWARD_LIMIT = 1; // number of rewards to choose
    const BLUEPRINT_REWARDS = game.enableBlueprints ? 2 : 0; // number of blueprints in rewards
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
    ];
    if (game.enableTowerLimits) {
        BASE_REWARDS.push({
            label: "+2 Tower Limit",
            fn: () => game.towerLimit += 2
        });
    }

    const [rewards, setRewards] = useState(BASE_REWARDS);

    useEffect(() => {
        setRewardsChosen([]);
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

    return <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Level Complete!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
    </Modal>
}
