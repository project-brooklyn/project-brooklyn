import { pythagorean } from "../../utils/math_utils";
import Entity from "../Entity";

export default class Projectile extends Entity {
    constructor(x, y, z, quaternion, path, scale) {
        super(x, y, z, quaternion, scale);
        this.path = path;
        this.hp = Infinity;
    }

    getMoveFunction = () => {
        this.stepIndex = 0;

        return () => {
            if (!this.hp) return;
            const reachedEnd = this.stepIndex >= this.path.length;
            if (this.instantEffect || reachedEnd) {
                if (this.effectFunction) { // projectile applies its effect
                    this.effectFunction();
                    this.effectFunction = null;
                }

                if (reachedEnd) { // projectile disappears
                    this.hp = 0;
                    return;
                }
            }

            // projectile moves to next position
            this.setPosition(...this.path[this.stepIndex]);
            this.stepIndex++;
        }
    }

    effectFunction = () => {
        if (this.damage) this.target.takeDamage(this.damage);
        if (this.appliedStatus) this.target.statuses.add(this.appliedStatus);

        if (!this.enemies) return;
        this.enemies.forEach(enemy => {
            if (this.target === enemy) return;
            const distance = pythagorean(this.target.position, enemy.position);
            if (distance <= this.splashRange) {
                if (this.damage) enemy.takeDamage(this.damage); // splash damage
                if (this.appliedStatus) enemy.statuses.add(this.appliedStatus); // splash status
            }
        });
    }
}
