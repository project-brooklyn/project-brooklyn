import { TERRAFORM_DIG, TERRAFORM_FILL, TOWERS } from "../entities/buildables";
import { Status } from "../entities/towers/Tower";
import Game from "../Game";
import GameMap from "../map/GameMap";
import Tile, { TileType } from "../map/Tile";

export enum ActionType {
    BUILD = 'BUILD',
    SELL = 'SELL',
    FILL = TERRAFORM_FILL,
    DIG = TERRAFORM_DIG,
}

// thanks chatgpt
type TowerMap = typeof TOWERS;
type TowerCreateFunctions = TowerMap extends Map<string, infer U>
    ? U extends { create: infer C }
        ? C
        : never
    : never;

export class GameAction {
    x: number;
    y: number;
    z: number;
    actionType: ActionType;
    cost: number;
    towerCreateFn: TowerCreateFunctions | null;
    tileType: TileType | null;

    constructor (x: number, y: number, z: number, 
        actionType: ActionType, cost: number, 
        towerCreateFn: TowerCreateFunctions | null = null,
        tileType: TileType | null = null,
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.actionType = actionType;
        this.cost = cost;
        this.towerCreateFn = towerCreateFn;
        this.tileType = tileType;
    }
}

export default class UndoManager {
    game: Game;
    gameMap: GameMap;
    undoStack: GameAction[];
    redoStack: GameAction[];

    constructor (game, gameMap) {
        this.game = game;
        this.gameMap = gameMap;
        game.undoManager = this;
        gameMap.undoManager = this;
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
        const { x, y, z, actionType, cost, towerCreateFn, tileType } = action;
        switch (actionType) {
            case ActionType.BUILD:
                this.game.removeTower(x, y, true);
                break;
            case ActionType.SELL:
                if (!towerCreateFn) return;
                const tower = new towerCreateFn(x, y, z, Status.BUILT);
                this.game.addTower(tower, true);
                break;
            case ActionType.FILL:
                this.gameMap.removeTile(x, y, z, true);
                break;
            case ActionType.DIG:
                const tile = new Tile(x, y, z, tileType);
                this.gameMap.addTile(tile, true);
                break;
        }
        this.game.gold += cost;
        this.game.setPath();
    }

    handleRedo = (action: GameAction) => {
        const { x, y, z, actionType, cost, towerCreateFn, tileType } = action;
        switch (actionType) {
            case ActionType.BUILD:
                if (!towerCreateFn) return;
                const tower = new towerCreateFn(x, y, z, Status.PENDING);
                this.game.addTower(tower, true);
                break;
            case ActionType.SELL:
                this.game.removeTower(x, y, true);
                break;
            case ActionType.FILL:
                const tile = new Tile(x, y, z, tileType);
                this.gameMap.addTile(tile, true);
                break;
            case ActionType.DIG:
                this.gameMap.removeTile(x, y, z, true);
                break;
        }
        this.game.gold -= cost;
        this.game.setPath();
    }
}

