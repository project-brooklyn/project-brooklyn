import { TERRAFORM_DIG, TERRAFORM_FILL, TOWERS, TowerType } from "../entities/buildables";
import { Status } from "../entities/towers/Tower";
import Game from "../Game";
import Tile, { TileType } from "../map/Tile";

export enum ActionType {
    BUILD = 'BUILD',
    SELL = 'SELL',
    FILL = TERRAFORM_FILL,
    DIG = TERRAFORM_DIG,
}

export class GameAction {
    x: number;
    y: number;
    z: number;
    actionType: ActionType;
    cost: number;
    towerType: TowerType | null;
    tileType: TileType | null;

    constructor (x: number, y: number, z: number, 
        actionType: ActionType, cost: number, 
        towerType: TowerType | null = null,
        tileType: TileType | null = null,
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.actionType = actionType;
        this.cost = cost;
        this.towerType = towerType;
        this.tileType = tileType;
    }
}

export default class UndoManager {
    game: Game;
    undoStack: GameAction[];
    redoStack: GameAction[];

    constructor (game) {
        this.game = game;
        this.undoStack = [];
        this.redoStack = [];
    }

    hasUndos = () => !!this.undoStack.length;
    hasRedos = () => !!this.redoStack.length;

    push = (gameAction: GameAction) => {
        this.undoStack.push(gameAction);
        this.redoStack = [];
    }

    undo = () => {
        if (!this.hasUndos()) return;
        const action = this.undoStack.pop();
        
        if (!action) return;
        this.handleUndo(action);
        this.redoStack.push(action);
    }

    redo = () => {
        if (!this.hasRedos()) return;
        const action = this.redoStack.pop();

        if (!action) return;
        this.handleRedo(action);
        this.undoStack.push(action);
    }

    clear = () => {
        this.undoStack = [];
        this.redoStack = [];
    }

    handleUndo = (action: GameAction) => {
        const { x, y, z, actionType, cost, towerType, tileType } = action;
        switch (actionType) {
            case ActionType.BUILD:
                this.game.removeTower(x, y, false);
                break;
            case ActionType.SELL:
                if (!towerType) throw new Error('No towerCreateFn');
                const towerData = TOWERS.get(towerType);
                if (towerData) {
                    const tower = new towerData.create(x, y, z, Status.BUILT);
                    this.game.addTower(tower, false);
                }
                break;
            case ActionType.FILL:
                this.game.removeTile(x, y, z, false);
                break;
            case ActionType.DIG:
                const tile = new Tile(x, y, z, tileType);
                this.game.addTile(tile, false);
                break;
        }
        this.game.gold += cost;
        this.game.setPath();
    }

    handleRedo = (action: GameAction) => {
        const { x, y, z, actionType, cost, towerType, tileType } = action;
        switch (actionType) {
            case ActionType.BUILD:
                if (!towerType) throw new Error('No towerCreateFn');
                const towerData = TOWERS.get(towerType);
                if (towerData) {
                    const tower = new towerData.create(x, y, z, Status.PENDING);
                    this.game.addTower(tower, false);
                }
                break;
            case ActionType.SELL:
                this.game.removeTower(x, y, false);
                break;
            case ActionType.FILL:
                const tile = new Tile(x, y, z, tileType);
                this.game.addTile(tile, false);
                break;
            case ActionType.DIG:
                this.game.removeTile(x, y, z, false);
                break;
        }
        this.game.gold -= cost;
        this.game.setPath();
    }
}

