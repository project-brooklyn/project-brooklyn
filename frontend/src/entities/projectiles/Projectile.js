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
            if (
                this.instantEffect ||
                this.stepIndex >= this.path.length
            ) {
                if (this.effectFunction) this.effectFunction();
                this.effectFunction = null;
                this.hp = 0;
                return;
            }

            this.setPosition(...this.path[this.stepIndex]);
            this.stepIndex++;
        }
    }

    effectFunction = () => {
        if (this.damage && this.target) { // handle damage
            this.target.takeDamage(this.damage); // direct damage

            if (this.splashRange && this.enemies) {
                this.enemies.forEach(enemy => {
                    if (this.target === enemy) return;
                    const distance = pythagorean(this.target.position, enemy.position);
                    if (distance <= this.splashRange) {
                        enemy.takeDamage(this.damage); // splash damage
                    }
                });
            }
        }

        if (this.appliedStatus && this.target) { // handle status
            this.target.statuses.add(this.appliedStatus);

            if (this.splashRange && this.enemies) {
                this.enemies.forEach(enemy => {
                    if (this.target === enemy) return;
                    const distance = pythagorean(this.target.position, enemy.position);
                    if (distance <= this.splashRange) {
                        enemy.statuses.add(this.appliedStatus); // splash status
                    }
                });
            }
        }
    }
}
