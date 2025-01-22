import { useEffect, useState } from "react";
import Tile, { TileType } from "../../map/Tile";
import { Vector3 } from "three";
import { TOWERS, TERRAFORMS, TERRAFORM_DIG, TERRAFORM_FILL } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { tileKey } from '/src/map/GameMap.js';
import { BUILD } from "../../Game";
import { isOccupied, isTop, isBottom } from "../../utils/game_utils";
import { SelectedTowerInfo } from "./SelectedTowerInfo";

const BUY = "Buy";
const SELECT = "Select";

export const BuySellMenu = ({game, selectedTower, setSelectedTower}) => {
    const {gameMap, mouseInput, undoManager} = game;

    const [purchasingItem, setPurchasingItem] = useState(null);

    useEffect(() => {
        // Handle game state changes
        deselectAll();

        if (!game.over && game.phase == BUILD) {
            mouseInput.addClickCallback(SELECT, (x, y, _z) => {
                if (!gameMap.getTower(x, y)) {
                    return;
                }

                const tower = game.towers[x][y];
                setSelectedTower(tower);
            })
        }

    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.phase, game.over])

    const deselectAll = () => {
        setPurchasingItem(null);
        setSelectedTower(null);
        mouseInput.removeHoverCallback(BUY);
        mouseInput.removeClickCallback(BUY);
        game.gameMapOverrides.clear();
    }

    const chargeCost = (price) => {
        game.gold -= price;
        if (game.gold < price) deselectAll();
    }

    useEffect(() => {
        // Handle purchasing item
        if (!purchasingItem) {
            return;
        }

        if (purchasingItem.name.endsWith("Tower")) {
            // Tower handling
            const towerType = TOWERS.get(purchasingItem.name);

            mouseInput.addHoverCallback(BUY, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!purchasingItem.targetPosition) {
                    purchasingItem.targetPosition = new Vector3();
                }
                purchasingItem.targetPosition.set(x, y, z);
                setSelectedTower(new towerType.create(x, y, z, TowerStatus.PLANNING));
            });

            mouseInput.addClickCallback(BUY, () => {
                if (game.gold < towerType.price) return;

                const {x, y, z} = purchasingItem.targetPosition;
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }
                chargeCost(towerType.price);

                const tower = new towerType.create(x, y, z, TowerStatus.PENDING);
                game.addTower(tower);
                game.setPath();
                mouseInput.addClickCallback(SELECT, (x, y, _z) => {
                    if (!gameMap.getTower(x, y)) {
                        return;
                    }

                    const tower = game.towers[x][y];
                    setSelectedTower(tower);
                })
            });
        } else if (purchasingItem.name.startsWith("terraform")) {
            const terraform = TERRAFORMS.get(purchasingItem.name);

            mouseInput.addHoverCallback(BUY, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!purchasingItem.targetPosition) {
                    purchasingItem.targetPosition = new Vector3();
                }

                if (purchasingItem.name === TERRAFORM_FILL) {
                    purchasingItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone));
                } else if (purchasingItem.name === TERRAFORM_DIG) {
                    if (isBottom(gameMap, x, y, z)) {
                        // Not allowed to excavate lowest tile level.
                        purchasingItem.targetPosition = null;
                        game.gameMapOverrides.clear();
                        return;
                    }

                    purchasingItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
                }
            });

            mouseInput.addClickCallback(BUY, () => {
                if (!purchasingItem.targetPosition) return;
                let {x, y, z} = purchasingItem.targetPosition;

                if (game.gold < terraform.price) return;

                purchasingItem.targetPosition = null;
                chargeCost(terraform.price);

                game.gameMapOverrides.clear();

                if (purchasingItem.name === TERRAFORM_FILL) {
                    z += 1;
                    game.addTile(new Tile(x, y, z, TileType.Stone));
                } else if (purchasingItem.name === TERRAFORM_DIG) {
                    game.removeTile(x, y, z);
                }
                game.setPath();
            });
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasingItem])

    const sellTower = () => {
        game.removeTower(selectedTower.x, selectedTower.y);

        const t = TOWERS.get(selectedTower.name);
        game.gold += 0.5 * t.price;
        game.setPath();
        deselectAll();
    }

    return <div className="h-100 overflow-auto border border-2 border-info">
        <h5>Buy/Sell Menu</h5>

        <ul className="list-unstyled">
            {Array.from(TOWERS.entries()).map(([towerKey, {_create, price}]) => {
                return <li key={towerKey} className="mb-2">
                    <label role='button'>
                    <input
                        type="checkbox"
                        checked={purchasingItem?.name == towerKey}
                        onChange={() => {
                            if (purchasingItem?.name == towerKey) {
                                deselectAll();
                            } else {
                                deselectAll();
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
            {Array.from(TERRAFORMS.entries()).map(([terraformKey, {label, price}]) => {
                return <li key={terraformKey} className="mb-2 cursor-pointer">
                    <label role='button'>
                        <input
                            type="checkbox"
                            checked={purchasingItem?.name == terraformKey}
                            onChange={() => {
                                if (purchasingItem?.name == terraformKey) {
                                    deselectAll();
                                } else {
                                    deselectAll();
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
        <div className="d-flex">
            <div className="d-flex w-50 justify-content-center">
                {undoManager.hasUndos() && <button onClick={undoManager.undo}>Undo</button>}
            </div>
            <div className="d-flex w-50 justify-content-center">
                {undoManager.hasRedos() && <button onClick={undoManager.redo}>Redo</button>}
            </div>
        </div>
        <SelectedTowerInfo selectedTower={selectedTower} setSelectedTower={setSelectedTower} purchasingItem={purchasingItem}/>
        <div className="d-flex justify-content-center">
            {selectedTower?.status === TowerStatus.BUILT && <button onClick={sellTower}>Sell Tower</button>}
            {selectedTower?.status === TowerStatus.PENDING && <button disabled>Can&apos;t Sell Pending Tower</button>}
        </div>
    </div>
}
