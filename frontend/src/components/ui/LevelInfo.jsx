import { useEffect, useState } from "react";

export const LevelInfo = ({game}) => {
    const { enemyInfo } = game;
    const { enemy, count, delay, remaining } = enemyInfo;

    // another hack to rerender the component
    const [ticks, setTicks] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setTicks(ticks + 1), 100);
        return () => clearInterval(interval);
    });

    return enemy && <div>
        <p>{`${count} total enemies, spawning every ${delay} ticks.`}</p>
        <p>{`${game.enemies.filter(e => !!e.hp).length} enemies still alive.`}</p>
        <p>{`${remaining} enemies yet to spawn.`}</p>
        <p>{`Enemy: ${enemy.name}, Health: ${enemy.MAX_HP}, Speed: ${enemy.SPEED}`}</p>
    </div>
}
