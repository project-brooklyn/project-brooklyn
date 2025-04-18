import { useEffect, useState } from "react";
import Tile, { TileType } from "../../map/Tile";
import { Vector3 } from "three";
import { TOWERS, TERRAFORMS, TERRAFORM_DIG, TERRAFORM_FILL } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { tileKey } from '/src/map/GameMap.js';
import { isOccupied, isTop, isBottom } from "../../utils/game_utils";
import { ItemInfo } from "./ItemInfo";

const NAME = "Buy";

export const BuyMenu = ({ game, selectedTower, setSelectedTower }) => {
    const { gameMap, mouseInput } = game;

    const [purchasingItem, setPurchasingItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState();

    const clear = () => {
        mouseInput.removeHoverCallback(NAME);
        mouseInput.removeClickCallback(NAME);
        game.gameMapOverrides.clear();
        setSelectedTower(null);
        setPurchasingItem(null);
        setErrorMessage('');
    }

    const chargeCost = (price) => {
        game.gold -= price;
        if (game.gold < price) clear();
    }

    const showGhostPurchase = (x, y, z) => {
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
        const isTower = purchasingItem.name.endsWith("Tower");
        const purchaseType = isTower ? TOWERS.get(purchasingItem.name) : TERRAFORMS.get(purchasingItem.name);
        if (game.gold < purchaseType.price) {
            setErrorMessage("Not enough gold!");
            return;
        }

        if (!purchasingItem.targetPosition) return;
        const { x, y, z } = purchasingItem.targetPosition;
        if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
            setErrorMessage("Invalid location!");
            return;
        }

        if (isTower) {
            if (game.enableTowerLimits) {
                const currTowers = game.getTowerCount();
                if (currTowers >= game.towerLimit) {
                    setErrorMessage("Tower limit reached!");
                    return;
                }
            }
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
        return clear;
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // Handle purchasing item
        if (!purchasingItem) return;
        mouseInput.addHoverCallback(NAME, showGhostPurchase);
        mouseInput.addClickCallback(NAME, buyPurchasingItem);

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasingItem])

    return <div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div onMouseEnter={clear}>
            <ul className="list-unstyled">
                {Array.from(TOWERS.entries())
                    .filter(game.enableBlueprints ? ([key, _]) => game.blueprints.has(key) : () => true)
                    .map(([towerKey, { price }]) => {
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
        </div>
        {purchasingItem
            ? <ItemInfo item={purchasingItem} isPurchased={false} />
            : selectedTower && <ItemInfo item={selectedTower} />
        }
    </div>
}
