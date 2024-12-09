import { useEffect, useState } from "react";
import Tile, { TileType } from "../../map/Tile";
import { Vector3 } from "three";
import { TOWERS, TERRAFORMS, TERRAFORM_DIG, TERRAFORM_FILL } from "../../entities/buildables";
import { Status as TowerStatus } from "../../entities/towers/Tower";
import { tileKey } from '/src/map/GameMap.js';
import { BUILD } from "../../Game";

const BUY = "Buy";
const SELL = "Sell";

function isTop(gameMap, x, y, z) {
    return gameMap.getElevation(x, y) === z;
}

function isOccupied(game, x, y, z) {
    const tower = game.towers[x][y];
    return tower && (tower.z === z);
}

export const BuySellMenu = ({game, selectedTower, setSelectedTower}) => {
    const {gameMap, mouseInput} = game;

    const [selectedItem, setSelectedItem] = useState(null);
    const [undoStack, setUndoStack] = useState([]);

    useEffect(() => {
        // Handle game state changes
        deselectAll();
        setUndoStack([]);

        if (!game.over && game.phase == BUILD) {
            mouseInput.addClickCallback(SELL, (x, y, _z) => {
                if (!gameMap.getTower(x, y)) {
                    return;
                }

                const tower = game.towers[x][y];
                setSelectedTower(tower);
            })
        }
        else {
            mouseInput.removeClickCallback(SELL);
        }


    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.phase, game.over])

    const deselectAll = () => {
        setSelectedItem(null);
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
        // Handle selected item
        if (!selectedItem) {
            return;
        }

        if (selectedItem.name.endsWith("Tower")) {
            // Tower handling
            const towerType = TOWERS.get(selectedItem.name);

            mouseInput.addHoverCallback(BUY, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }
                selectedItem.targetPosition.set(x, y, z);
                setSelectedTower(new towerType.create(x, y, z, TowerStatus.PENDING));
            });

            mouseInput.addClickCallback(BUY, () => {
                if (game.gold < towerType.price) return;

                const {x, y, z} = selectedItem.targetPosition;
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }
                chargeCost(towerType.price);

                const tower = new towerType.create(x, y, z, TowerStatus.PENDING);
                game.addTower(tower);
                gameMap.addTower(x, y);
                setUndoStack(prevStack => [...prevStack, {x, y, z, label: 'BuildTower', price: towerType.price}]);
                game.setPath();
            });
        } else if (selectedItem.name.startsWith("terraform")) {
            const terraform = TERRAFORMS.get(selectedItem.name);

            mouseInput.addHoverCallback(BUY, (x, y, z) => {
                if (!isTop(gameMap, x, y, z) || isOccupied(game, x, y, z)) {
                    return;
                }

                if (!selectedItem.targetPosition) {
                    selectedItem.targetPosition = new Vector3();
                }

                if (selectedItem.name == TERRAFORM_FILL) {
                    selectedItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("SHOW", new Tile(x, y, z + 1, TileType.Stone));
                } else if (selectedItem.name == TERRAFORM_DIG) {
                    selectedItem.targetPosition.set(x, y, z);
                    game.gameMapOverrides.set("HIDE", tileKey(x, y, z));
                }
            });

            mouseInput.addClickCallback(BUY, () => {
                if (!selectedItem.targetPosition) return;
                let {x, y, z} = selectedItem.targetPosition;
                if (z < 1) {
                    // Not allowed to excavate lowest tile level.
                    return;
                }

                if (game.gold < terraform.price) return;

                selectedItem.targetPosition = null;
                chargeCost(terraform.price);

                game.gameMapOverrides.clear();

                let tileType;
                if (selectedItem.name == TERRAFORM_FILL) {
                    z += 1;
                    gameMap.addTile(new Tile(x, y, z, TileType.Stone));
                } else if (selectedItem.name == TERRAFORM_DIG) {
                    tileType = gameMap.getTile(x, y, z).type;
                    gameMap.removeTile(x, y, z);
                }
                setUndoStack(prevStack => [...prevStack, {x, y, z, ...terraform, tileType}]);
                game.setPath();
            });
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem])
    
    const undoBuild = () => {
        if (!undoStack.length) return;
        deselectAll();
        const {x, y, z, label, price, tileType} = undoStack.at(-1);
        
        switch (label) {
            case 'BuildTower':
                game.removeTower(x, y);
                gameMap.removeTower(x, y);
                break;
            case 'Fill':
                gameMap.removeTile(x, y, z);
                break;
            case 'Dig':
                gameMap.addTile(new Tile(x, y, z, tileType));
                break;
            default:
                console.error("Unknown undo label", label);
        }

        game.gold += price;
        setUndoStack((prevStack) => prevStack.slice(0, -1));
        game.setPath();
    }

    const sellTower = () => {
        game.towers[selectedTower.x][selectedTower.y] = undefined;
        gameMap.removeTower(selectedTower.x, selectedTower.y);

        const t = TOWERS.get(selectedTower.name);
        game.gold += 0.5 * t.price;
        game.setPath();
        deselectAll();
    }

    return <div>
        <h5>Buy/Sell Menu</h5>

        {Array.from(TOWERS.entries()).map(([towerKey, {_create, price}]) => {
            return <p key={towerKey}>
                <input
                    type="checkbox"
                    checked={selectedItem?.name == towerKey}
                    onChange={() => {
                        if (selectedItem?.name == towerKey) {
                            deselectAll();
                        } else {
                            deselectAll();
                            setSelectedItem({
                                name: towerKey,
                                targetPosition: null,
                            });
                        }
                    }}
                    className="mx-2"
                />
                {towerKey}: {price}
            </p>
        })}
        {Array.from(TERRAFORMS.entries()).map(([terraformKey, {label, price}]) => {
            return <p key={terraformKey}>
                <input
                    type="checkbox"
                    checked={selectedItem?.name == terraformKey}
                    onChange={() => {
                        if (selectedItem?.name == terraformKey) {
                            deselectAll();
                        } else {
                            deselectAll();
                            setSelectedItem({
                                name: terraformKey,
                                targetPosition: null,
                            });
                        }
                    }}
                    className="mx-2"
                />
                {label}: {price}
            </p>
        })}
        <div style={{display: "flex", flexDirection: "column"}}>
            {!!undoStack.length && <button onClick={undoBuild}>Undo</button>}
            {selectedTower && selectedTower.status === TowerStatus.BUILT && <button onClick={sellTower}>Sell Tower</button>}
        </div>
        <SelectedTowerInfo selectedTower={selectedTower} />
        
    </div>
}

const SelectedTowerInfo = ({selectedTower}) => {
    if (!selectedTower) {
        return <div>
            <h5>Selected Tower</h5>
            <p>No tower selected</p>
        </div>
    }
    console.log(selectedTower)

    const { name, price, damage, cooldown, minRange, maxRange } = selectedTower
    return <div>
        <h5>Selected Tower</h5>
        <p>Type: {name}</p>
        <p>Price: {price}</p>
        <p>Damage: {damage}</p>
        <p>Cooldown: {cooldown}</p>
        {/* <p>Range: {minRange} - {maxRange}</p> */}
    </div>
}
