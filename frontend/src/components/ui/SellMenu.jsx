import { TOWERS } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";

export const SellMenu = ({ game, selectedTower, setSelectedTower }) => {
    const sellTower = () => {
        game.removeTower(selectedTower.x, selectedTower.y);

        const t = TOWERS.get(selectedTower.name);
        game.gold += 0.5 * t.price;
        game.setPath();
        setSelectedTower(null);
    }

    return <div className="d-flex justify-content-center">
        {selectedTower?.status === TowerStatus.BUILT && <button onClick={sellTower}>Sell Tower</button>}
        {selectedTower?.status === TowerStatus.PENDING && <button disabled>Can&apos;t Sell Pending Tower</button>}
    </div>
}
