export const BURNED = 'burned';
export const FROZEN = 'frozen';
export const SLOWED = 'slowed';

export const STATUSES = [BURNED, FROZEN, SLOWED];

const FIRE_DAMAGE = 0.2;
const FREEZE_DURATION = 100;

export const statusFunctions = {
    burned: (enemy) => {
        enemy.hp = Math.max(0, enemy.hp - FIRE_DAMAGE);
    },
    slowed: (enemy) => { // slowed enemies move every other tick
        enemy.cantMove = !enemy.cantMove;
    },
    frozen: (enemy) => {
        if (!enemy.frozenTime) {
            enemy.frozenTime = FREEZE_DURATION;
        } else {
            enemy.frozenTime--;
            if (!enemy.frozenTime) {
                enemy.statuses.delete(FROZEN)
            }
        }
    },
}
