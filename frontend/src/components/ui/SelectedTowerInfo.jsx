import { TERRAFORMS } from "../../entities/buildables";
import { BUFFED } from "../../entities/towers/BuffTower";

export const SelectedTowerInfo = ({selectedTower, purchasingItem, setSelectedTower}) => {
    if (purchasingItem?.name.startsWith("terraform")) {
        const terraform = TERRAFORMS.get(purchasingItem.name);
        return <div>
            <h5>Selected Item</h5>
            <p>Type: {terraform.label} Terrain</p>
            <p>Price: {terraform.price}</p>
            {
                terraform.label === "Fill"
                ? <p>Increase the height of a terrain tile, forcing enemies to climb over or path around.</p>
                : <p>Remove a terrain tile (until bedrock), forcing enemies to climb down or path around.</p>
            }
        </div>
    }

    if (!selectedTower) {
        return <div>
            <h5>Selected Tower</h5>
            <p>No tower selected</p>
        </div>
    }

    const { name, price, damage, cooldown, minRange, maxRange, buffs } = selectedTower
    return <div onClick={() => setSelectedTower(null)}>
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
