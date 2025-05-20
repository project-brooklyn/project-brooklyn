import { TERRAFORM_FILL, TERRAFORMS, TOWERS } from "../../entities/buildables";
import { BUFFED } from "../../entities/towers/BuffTower";
import { Status as TowerStatus } from "../../entities/towers/Tower";

function isTerraformItem(item) {
    return item.name.startsWith("terraform")
}

export const ItemInfo = ({ item, isPurchased = true }) => {
    if (!item) return <NullInfo />
    if (isTerraformItem(item)) return <TerraformInfo name={item.name} />
    if (item.status === TowerStatus.PERMANENT) return <PermanentTowerInfo tower={item} />

    if (isPurchased) {
        return <TowerInfo tower={item} />
    } else {
        const t = TOWERS.get(item.name)
        const tower = new t.create(0, 0, 0, TowerStatus.PLANNING)
        return <TowerInfo tower={tower} />
    }
}

const NullInfo = () => {
    return <div>
        <p>No tower selected</p>
    </div>
}

const TerraformInfo = ({ name }) => {
    const terraform = TERRAFORMS.get(name);
    return <div>
        <p>Type: {terraform.label} Terrain</p>
        <p>Price: {terraform.price}</p>
        {
            terraform === TERRAFORM_FILL
                ? <p>Increase the height of a terrain tile, forcing enemies to climb over or path around.</p>
                : <p>Remove a terrain tile (until bedrock), forcing enemies to climb down or path around.</p>
        }
    </div>
}

const TowerInfo = ({ tower }) => {
    const { name, price, damage, cooldown, minRange, maxRange, description } = tower
    return <div>
        <ul>
            <li>Type: {name}</li>
            <li>Price: {price}</li>
            <li>Damage: {tower.hasBuff(BUFFED) ? damage * 2 : damage}</li>
            <li>Cooldown: {cooldown}</li>
            {minRange
                ? <li>Range: {minRange} - {maxRange}</li>
                : <li>Range: {maxRange}</li>}
            <li>Description: {description}</li>
        </ul>
    </div>
}

const PermanentTowerInfo = ({ tower }) => {
    const { name, hp, description } = tower;
    return <div>
        <ul>
            <li>Type: {name}</li>
            {hp < Infinity ? <li>HP: {hp}</li> : null}
            <li>Description: {description}</li>
        </ul>
    </div>
}
