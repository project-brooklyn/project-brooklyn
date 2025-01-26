import { TERRAFORMS, TERRAFORM_FILL } from "../../entities/buildables";
import { TOWERS } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { TowerInfo } from "./TowerInfo";

function isTerraformItem(item) {
    return item.name.startsWith("terraform")
}

export const ItemInfo = ({ item }) => {
    if (isTerraformItem(item)) {
        const terraform = TERRAFORMS.get(item.name);
        return <div>
            <h5>Selected Item</h5>
            <p>Type: {terraform.label} Terrain</p>
            <p>Price: {terraform.price}</p>
            {
                terraform === TERRAFORM_FILL
                    ? <p>Increase the height of a terrain tile, forcing enemies to climb over or path around.</p>
                    : <p>Remove a terrain tile (until bedrock), forcing enemies to climb down or path around.</p>
            }
        </div>
    }

    const t = TOWERS.get(item.name)
    const tower = new t.create(0, 0, 0, TowerStatus.PLANNING)
    return <TowerInfo tower={tower} />
}
