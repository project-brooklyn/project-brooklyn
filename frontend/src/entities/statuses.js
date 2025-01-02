export const BURNED = 'BURNED';
export const SLOWED = 'SLOWED';
export const FROZEN = 'FROZEN';

const FIRE_DAMAGE = 0.2;
const FREEZE_DURATION = 200;

export const statusFunctions = {
    BURNED: (enemy) => {
        enemy.hp = Math.max(0, enemy.hp - FIRE_DAMAGE);
    },
    SLOWED: (enemy) => { // slowed enemies move every other tick
        enemy.cantMove = !enemy.cantMove;
    },
    FROZEN: () => {},
}
