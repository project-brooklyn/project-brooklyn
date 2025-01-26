import { BUFFED } from "../../entities/towers/BuffTower";

export const TowerInfo = ({ tower }) => {
    if (!tower) {
        return <div>
            <h5>Selected Tower</h5>
            <p>No tower selected</p>
        </div>
    }

    const { name, price, damage, cooldown, minRange, maxRange, buffs } = tower
    return <div>
        <h5>Selected Tower</h5>
        <ul>
            <li>Type: {name}</li>
            <li>Price: {price}</li>
            <li>Damage: {buffs[BUFFED] ? damage * 2 : damage}</li>
            <li>Cooldown: {cooldown}</li>
            {minRange
                ? <li>Range: {minRange} - {maxRange}</li>
                : <li>Range: {maxRange - 1}</li>}
        </ul>
    </div>
}
