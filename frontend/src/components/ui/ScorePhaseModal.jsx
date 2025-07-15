import { useEffect, useState } from "react";
import { BUILD } from "../../Game";
import { TOWERS } from "../../entities/buildables";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { jwtDecode } from "jwt-decode";
import { deleteSave, saveGame } from "../../utils/api_utils";
import { useGameContext } from "../game/GameContext";

function ScorePhaseModal({ show }) {
    const game = useGameContext();
    const [copied, setCopied] = useState(false);
    const [rewardsChosen, setRewardsChosen] = useState([]);
    const [userId, setUserId] = useState(null);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);

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
        const token = localStorage.getItem('project-bk-token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
        }
    }, []);

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

    const saveToClipboard = () => {
        const json = JSON.stringify(game.toJSON());
        navigator.clipboard.writeText(btoa(json));
        console.log('Copied game data to clipboard:\n', json); // TODO: remove?
        setCopied(true);
    }

    const saveToCloud = async () => {
        if (!userId || saved || saving) return;
        setSaving(true);
        const json = JSON.stringify(game.toJSON());
        const data = btoa(json);

        // delete previous save
        await deleteSave(userId, game.createdAt);

        // save new game
        await saveGame(data, game.createdAt);

        setSaved(true);
        setSaving(false);
    }

    return (
        <Dialog
            open={show}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Level Complete!
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Level: {game.level}<br />
                    Gold: {game.gold}<br />
                    Castle HP: {game.castle.hp}<br />
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                {
                    rewardsChosen.length >= REWARD_LIMIT
                        ? <>
                            <Button variant="outlined" onClick={saveToClipboard}>{copied ? 'Game Data Copied' : 'Copy Game Data to Clipboard'}</Button>
                            <Button variant="contained" onClick={handleClick}>Next Level</Button>
                            {userId && <Button variant="contained" onClick={saveToCloud} disabled={saving || saved}>{saving ? 'Saving Game...' : saved ? 'Game Saved' : 'Save to Cloud'}</Button>}
                        </>
                        : <>
                            Choose Reward<br />
                            {
                                rewards.map((reward, i) => rewardsChosen.includes(i)
                                    ? <Button variant="outlined" key={i} disabled>{reward.label}</Button>
                                    : <Button variant="outlined" key={i} onClick={() => {
                                        reward.fn();
                                        setRewardsChosen(rewardsChosen.concat(i));
                                    }}>{reward.label}</Button>
                                )
                            }
                        </>
                }
            </DialogActions>
        </Dialog>
    )
}

export default ScorePhaseModal;
