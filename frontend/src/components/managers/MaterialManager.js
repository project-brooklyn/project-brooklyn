import * as THREE from "three";
import { TileType } from "../../map/Tile";
import textures from "./textures";
import { STATUSES } from "../../entities/statuses";
import { BUFFED } from "../../entities/towers/BuffTower";

function makeTileMaterial(tileType) {
    return new THREE.MeshLambertMaterial({
        color: tileType.material.color,
        map: textures[tileType.name] || null,
    });
}

function makeStatusMaterial(status) {
    return new THREE.SpriteMaterial({
        map: textures[status],
    })
}

class MaterialManager {
    materials = new Map();

    constructor() {
        // Load tile materials
        for (const type in TileType) {
            const tileType = TileType[type]
            this.materials.set(tileType.name, makeTileMaterial(tileType))
        }

        // Load enemy status icons
        for (const status of STATUSES) {
            this.materials.set(status, makeStatusMaterial(status))
        }

        // Load structure buff icon
        this.materials.set(BUFFED, makeStatusMaterial(BUFFED))
    }

    get(name) {
        return this.materials.get(name)
    }
}

export default MaterialManager;
