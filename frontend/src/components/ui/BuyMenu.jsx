import { useEffect, useState } from "react";
import Tile, { TileType } from "../../map/Tile";
import { Vector3 } from "three";
import { BUILD } from "../../Game";
import { TOWERS, TERRAFORMS, TERRAFORM_DIG, TERRAFORM_FILL } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { tileKey } from '/src/map/GameMap.js';
import { isOccupied, isTop, isBottom } from "../../utils/game_utils";
import { ItemInfo } from "./ItemInfo";

const NAME = "Buy";

export const BuyMenu = ({ game, selectedTower, setSelectedTower }) => {
    const { gameMap, mouseInput } = game;

    const [purchasingItem, setPurchasingItem] = useState(null);

    const clear = () => {
        mouseInput.removeHoverCallback(NAME);
        mouseInput.removeClickCallback(NAME);
        game.gameMapOverrides.clear();
        setSelectedTower(null);
        setPurchasingItem(null);
    }

    const chargeCost = (price) => {
        game.gold -= price;
        if (game.gold < price) clear();
    }

    const isCallbackValid = () => {
        if (game.over || game.phase !== BUILD) {
            clear();
            return false;
        }
        return true;
    }

    const showGhostPurchase = (x, y, z) => {
        if (!isCallbackValid()) return;
        if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) return; 
        purchasingItem.targetPosition ||= new Vector3();
        purchasingItem.targetPosition.set(x, y, z);

        if (purchasingItem.name === TERRAFORM_FILL) {
            game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone));
        } else if (purchasingItem.name === TERRAFORM_DIG) {
            if (isBottom(gameMap, x, y, z)) {
                // Not allowed to excavate lowest tile level.
                purchasingItem.targetPosition = null;
                game.gameMapOverrides.clear();
                return;
            }

            game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
        } else {  // purchasingItem is a tower
            const towerType = TOWERS.get(purchasingItem.name);
            setSelectedTower(new towerType.create(x, y, z, TowerStatus.PLANNING));
        }
    }

    const buyPurchasingItem = () => {
        if (!isCallbackValid()) return;
        const isTower = purchasingItem.name.endsWith("Tower");
        const purchaseType = isTower ? TOWERS.get(purchasingItem.name) : TERRAFORMS.get(purchasingItem.name);
        if (game.gold < purchaseType.price) return;
        
        const { x, y, z } = purchasingItem.targetPosition;
        if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) return; 

        if (isTower) {
            const tower = new purchaseType.create(x, y, z, TowerStatus.PENDING);
            game.addTower(tower);
        } else {
            if (purchasingItem.name === TERRAFORM_FILL) {
                game.addTile(new Tile(x, y, z + 1, TileType.Stone));
            } else {
                console.assert(purchasingItem.name === TERRAFORM_DIG, `unexpected purchasing item name: ${purchasingItem.name}`);
                game.removeTile(x, y, z);
            }
        }

        chargeCost(purchaseType.price);
        purchasingItem.targetPosition = null;
        game.setPath();
        game.gameMapOverrides.clear();
    }

    useEffect(() => {
        // Handle purchasing item
        if (!purchasingItem) return;
        mouseInput.addHoverCallback(NAME, showGhostPurchase);
        mouseInput.addClickCallback(NAME, buyPurchasingItem);

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasingItem])

    return <div onMouseEnter={clear}> 
        <ul className="list-unstyled">
            {Array.from(TOWERS.entries()).map(([towerKey, { price }]) => {
                return <li key={towerKey} className="mb-2">
                    <label role='button'>
                        <input
                            type="checkbox"
                            checked={purchasingItem?.name === towerKey}
                            onChange={() => {
                                clear();
                                if (purchasingItem?.name !== towerKey) {
                                    setPurchasingItem({
                                        name: towerKey,
                                        targetPosition: null,
                                    });
                                }
                            }}
                            className="mx-2"
                        />
                        {towerKey}: {price}
                    </label>
                </li>
            })}
            {Array.from(TERRAFORMS.entries()).map(([terraformKey, { label, price }]) => {
                return <li key={terraformKey} className="mb-2 cursor-pointer">
                    <label role='button'>
                        <input
                            type="checkbox"
                            checked={purchasingItem?.name === terraformKey}
                            onChange={() => {
                                clear();
                                if (purchasingItem?.name !== terraformKey) {
                                    setPurchasingItem({
                                        name: terraformKey,
                                        targetPosition: null,
                                    });
                                }
                            }}
                            className="mx-2"
                        />
                        {label}: {price}
                    </label>
                </li>
            })}
        </ul>
        {(purchasingItem || selectedTower) && <ItemInfo item={purchasingItem || selectedTower} />}
    </div>
}
